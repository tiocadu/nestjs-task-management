import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    { id: '1', title: 'A', description: 'do this', status: TaskStatus.OPEN },
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const newTask = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((item) => item.id === id);
  }

  deleteTaskById(id: string): Task {
    const deletedTask = this.getTaskById(id);
    const arrayWithoutDeletedTask = this.tasks.filter((item) => item.id !== id);
    this.tasks = arrayWithoutDeletedTask;
    return deletedTask;
  }
}
