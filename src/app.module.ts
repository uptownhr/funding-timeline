import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { ProductHuntClient } from './phClient';
import { TypegooseModule } from 'nestjs-typegoose';
import { ProductHuntPost } from './ph.model';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    TypegooseModule.forRoot(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    TypegooseModule.forFeature([ProductHuntPost]),
  ],
  controllers: [AppController],
  providers: [AppService, ProductHuntClient],
})
export class AppModule {}
