import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.usersClient.subscribeToResponseOf('users.getAll');
    this.usersClient.subscribeToResponseOf('users.create');
  }

  @Get()
  findAll() {
    return this.usersClient.send('users.getAll', {});
  }

  @Post()
  createTask(@Body(ValidationPipe) createTaskDto: CreateUserDto) {
    return this.usersClient.send('users.create', createTaskDto);
  }
}
