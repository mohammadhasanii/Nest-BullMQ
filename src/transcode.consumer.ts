import {Processor , Process} from '@nestjs/bull'
import { Logger } from '@nestjs/common';
import {Job} from 'bull'
import { TRANSCODE_QUEUE } from './constant';

@Processor(TRANSCODE_QUEUE)
export class TranscodeConsumer {
    private readonly logger=new Logger(TranscodeConsumer.name)
    @Process()
    async transCode(job:Job <unknown>){
         await new Promise<void>((resolve)=>setTimeout(()=>resolve(),10000))
         this.logger.log('transcode complete')
         await this.logger.log(job.timestamp)
         await this.logger.debug({Data:job.data})
    }
}