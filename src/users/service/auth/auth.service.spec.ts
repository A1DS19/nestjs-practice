import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from '../users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: Partial<UsersService>;
  const users: User[] = [];

  beforeEach(async () => {
    //Crear copia de UsersService de metodos usados en AuthService
    usersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(({ email, password } = user));
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: usersService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('creates a new user with a hashed password', async () => {
    const user = await authService.signup('test@test.com', 'test123');
    expect(user.password).not.toEqual('test123');
    const pass = user.password;
    expect(pass).toBeDefined();
    expect(pass).toContain('argon2');
  });

  it('throws an error if user signs in with email already in use', async (done) => {
    await authService.signup('test@test.com', 'test123');
    try {
      await authService.signup('test@test.com', 'test123');
    } catch (err) {
      done();
    }
  });

  it('throws if signin is called with unused email', async (done) => {
    try {
      await authService.signin('test@test.com', 'test123');
    } catch (err) {
      done();
    }
  });

  it('throws if invalid password is provided', async (done) => {
    await authService.signup('test@test.com', 'test123');
    try {
      await authService.signin('test@test.com', 'falsePassword');
    } catch (error) {
      done();
    }
  });

  it('returns user if correct password is provided', async () => {
    await authService.signup('test@test.com', 'test123');
    const user = await authService.signin('test@test.com', 'test123');
    expect(user).toBeDefined();
  });
});
