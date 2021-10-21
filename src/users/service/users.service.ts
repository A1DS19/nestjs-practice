import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return await this.repo.save(user);
  }

  async find(email: string): Promise<User[]> {
    return await this.repo.find({ email });
  }

  async findOne(id: number): Promise<User> {
    if (!id) {
      throw new NotFoundException();
    }
    return await this.repo.findOne(id);
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.repo.findOne(id);

    if (!user) {
      throw new NotFoundException('El usuario no existe');
    }

    Object.assign(user, attrs);

    return await this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.repo.findOne(id);

    if (!user) {
      throw new NotFoundException('El usuario no existe');
    }

    return await this.repo.remove(user);
  }
}
