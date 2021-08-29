import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async getTasks(
    filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const foundTask = await this.tasksRepository.findOne({
      where: { id, user },
    });
    if (!foundTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return foundTask;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const queryResult = await this.tasksRepository.delete({ id, user });

    if (queryResult.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async updateTaskStatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
    user: User,
  ): Promise<void> {
    const { status } = updateTaskStatusDto;
    const queryResult = await this.tasksRepository.update(
      { id, user },
      { status },
    );

    if (queryResult.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
