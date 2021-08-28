import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(
    filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder();
    query.where({ user });

    if (status) {
      query.andWhere('status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(title) LIKE LOWER(:search) OR LOWER(description) LIKE LOWER(:search))',
        {
          search: `%${search}%`,
        },
      );
    }

    const queryResult = await query.getMany();
    return queryResult;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const newTask = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    const savedTask = await this.save(newTask);
    return savedTask;
  }
}
