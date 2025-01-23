import { Module } from '@nestjs/common';
import { ChzzkController } from './chzzk.controller';
import { ChzzkService } from './chzzk.service';

@Module({
  controllers: [ChzzkController],
  providers: [ChzzkService]
})
export class ChzzkModule {}
