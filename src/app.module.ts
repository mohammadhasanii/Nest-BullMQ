import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TRANSCODE_QUEUE } from './constant';
import { TranscodeConsumer } from './transcode.consumer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    
    BullModule.forRootAsync({
      imports:[ConfigModule],
    useFactory:async (configService:ConfigService)=>({
      redis:{
        host:configService.get('REDIS_HOST'),
        port:configService.get('REDIS_PORT'),
  
      },
    }),
    inject:[ConfigService]
  }),BullModule.registerQueueAsync({
    name:TRANSCODE_QUEUE
    })],
  controllers: [AppController],
  providers: [AppService , TranscodeConsumer],
})
export class AppModule {}
