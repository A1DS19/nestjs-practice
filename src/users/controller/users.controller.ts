import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CreateUserDto } from '../dto/create-user.dto';
import { SigninUserDto } from '../dto/signin-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { User } from '../entity/user.entity';
import { AuthService } from '../service/auth/auth.service';
import { UsersService } from '../service/users.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  async signup(
    @Body() body: CreateUserDto,
    @Session() session: any,
  ): Promise<User> {
    const { email, password } = body;
    const user = await this.authService.signup(email, password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(
    @Body() body: SigninUserDto,
    @Session() session: any,
  ): Promise<User> {
    const { email, password } = body;
    const user = await this.authService.signin(email, password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  signout(@Session() session: any): boolean {
    session.userId = null;
    return true;
  }

  @Get('/me')
  me(@CurrentUser() user: User): User {
    return user;
  }

  //Practica
  @Get()
  async findUsers(@Query('email') email: string): Promise<User[]> {
    return await this.usersService.find(email);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findOne(parseInt(id));

    if (!user) {
      throw new NotFoundException('Usuario no existe');
    }

    return user;
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.remove(parseInt(id));
  }
}
