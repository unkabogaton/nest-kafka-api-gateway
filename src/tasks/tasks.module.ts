import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [TasksController],
  imports: [
    ClientsModule.register([
      {
        name: 'TASKS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'tasks',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'tasks_consumer',
          },
        },
      },
    ]),
  ],
})
export class TasksModule {}
