import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {

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

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;

  //   const newTask = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(newTask);
  //   return newTask;
  // }

  // getTaskById(id: string): Task {
  //   const foundTask = this.tasks.find((item) => item.id === id);
  //   if (!foundTask) {
  //     throw new NotFoundException(`Task with ID ${id} not found`);
  //   }
  //   return foundTask;
  // }

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
