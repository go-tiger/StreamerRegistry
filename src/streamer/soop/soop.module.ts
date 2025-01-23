import { Module } from '@nestjs/common';
import { SoopController } from './soop.controller';
import { SoopService } from './soop.service';

@Module({
  controllers: [SoopController],
  providers: [SoopService]
})
export class SoopModule {}
