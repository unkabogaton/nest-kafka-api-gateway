import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  throwForbidden(): string {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
