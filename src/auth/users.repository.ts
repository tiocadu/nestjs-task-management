import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const newUser = this.create({
      username,
      password,
    });

    try {
      await this.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException(error.detail);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
