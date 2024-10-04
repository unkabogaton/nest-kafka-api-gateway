import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Body,
  ValidationPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    @Inject('TASKS_SERVICE') private readonly tasksClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.tasksClient.subscribeToResponseOf('tasks.getAll');
    this.tasksClient.subscribeToResponseOf('tasks.getPerUser');
    this.tasksClient.subscribeToResponseOf('tasks.getOne');
    this.tasksClient.subscribeToResponseOf('tasks.create');
    this.tasksClient.subscribeToResponseOf('tasks.update');
    this.tasksClient.subscribeToResponseOf('tasks.delete');
  }

  @Get()
  findAll() {
    return this.tasksClient.send('tasks.getAll', {});
  }

  @Get('/user/:userId')
  findPerUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.tasksClient.send('tasks.getPerUser', +userId);
  }

  @Get(':id')
  findOneTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksClient.send('tasks.getOne', +id);
  }

  @Post()
  createTask(@Body(ValidationPipe) createTaskDto: CreateTaskDto) {
    return this.tasksClient.send('tasks.create', createTaskDto);
  }

  @Patch(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksClient.send('tasks.update', { id, updateTaskDto });
  }

  @Delete(':id')
  removeTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksClient.send('tasks.delete', id);
  }
}
