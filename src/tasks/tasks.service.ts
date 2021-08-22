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

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const newTask = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    const savedTask = await this.tasksRepository.save(newTask);
    return savedTask;
  }

  async getTaskById(id: string): Promise<Task> {
    const foundTask = await this.tasksRepository.findOne(id);
    if (!foundTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return foundTask;
  }

  // deleteTask(id: string): void {
  //   const foundTask = this.getTaskById(id);
  //   const arrayWithoutDeletedTask = this.tasks.filter(
  //     (item) => item.id !== foundTask.id,
  //   );
  //   this.tasks = arrayWithoutDeletedTask;
  // }

  // updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto) {
  //   const { status } = updateTaskStatusDto;
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
