import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     tasks = tasks.filter((item) => item.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter(
  //       (item) =>
  //         item.title.includes(search) || item.description.includes(search),
  //     );
  //   }

  //   return tasks;
  // }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const foundTask = await this.tasksRepository.findOne(id);
    if (!foundTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return foundTask;
  }

  async deleteTask(id: string): Promise<void> {
    const queryResult = await this.tasksRepository.delete(id);

    if (queryResult.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  // updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto) {
  //   const { status } = updateTaskStatusDto;
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
