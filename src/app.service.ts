import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const result = 'Hello World! 2';
    return result;
  }
}
