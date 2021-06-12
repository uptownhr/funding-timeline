import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  @Cron('* * * * * *')
  getHello(): string {
    console.log('hello world', process.env.PH_TOKEN)
    return 'Hello World!';
  }
}
