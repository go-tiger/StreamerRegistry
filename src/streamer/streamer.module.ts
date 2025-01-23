import { Module } from '@nestjs/common';
import { ChzzkModule } from './chzzk/chzzk.module';
import { SoopModule } from './soop/soop.module';

@Module({
  imports: [ChzzkModule, SoopModule],
})
export class StreamerModule {}
