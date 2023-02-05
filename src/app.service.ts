import {  BadRequestException, Injectable } from '@nestjs/common';
import { TRANSCODE_QUEUE } from './constant';
import {Queue } from 'bull'
import {InjectQueue} from '@nestjs/bull'

@Injectable()
export class AppService {

  constructor(@InjectQueue(TRANSCODE_QUEUE) private readonly transcodeQueue:Queue ,){}
  getHello(): string {
    return 'Hello World!';
  }

  async transcode() {
    const {data}=await this.transcodeQueue.add({username:"Mohammad",token:1})
    
    console.log(data)
    if(!data){
      throw new BadRequestException({
        success:false,
        message:"bad request"
      })
      
    }
    return await {
      success:true, 
      data
    }
  }


}
