import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { TRANSCODE_QUEUE } from './constants';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectQueue(TRANSCODE_QUEUE) private readonly trancodeQueue: Queue,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async transcode() {
    this.logger.log('Received request ');
    await this.trancodeQueue.add({
      fileName: 'sample-file-or-message',
      time: new Date(),
    });
  }
}
