import { Test } from '@nestjs/testing';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';
import { User } from '../auth/user.entity';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser: User = {
  username: 'jon doe',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      tasksRepository.getTasks.mockResolvedValue('someValue');
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toBe('someValue');
    });
  });

  describe('getTaskById', () => {
    it('calls TasksRepository.findOne and returns the result', async () => {
      const mockTask: Task = {
        id: 'someId',
        title: 'test task',
        description: 'test desciption',
        status: TaskStatus.OPEN,
        user: mockUser,
      };

      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('1', mockUser);
      expect(result).toBe(mockTask);
    });

    it('calls TasksRepository.findOne and handles an error', () => {
      tasksRepository.findOne.mockResolvedValue(null);
      const result = tasksService.getTaskById('1', mockUser);
      expect(result).rejects.toThrow(NotFoundException);
    });
  });
});
