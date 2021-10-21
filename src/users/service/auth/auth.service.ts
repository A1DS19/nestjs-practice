import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash, verify } from 'argon2';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from '../users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(email: string, password: string): Promise<User> {
    const users = await this.usersService.find(email);

    if (users.length) {
      throw new BadRequestException('Email ya existe');
    }

    const hashedPassword = await hash(password, {
      saltLength: 10,
      hashLength: 32,
    });

    const user = await this.usersService.create(email, hashedPassword);

    return user;
  }

  async signin(email: string, password: string): Promise<User> {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('Datos invalidos');
    }

    const result = await verify(user.password, password);

    if (!result) {
      throw new BadRequestException('Datos invalidos');
    }

    return user;
  }
}
