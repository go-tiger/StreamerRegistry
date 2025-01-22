import { Module } from '@nestjs/common';
import { MojangApiService } from './mojang-api.service';
import { MojangApiController } from './mojang-api.controller';

@Module({
  controllers: [MojangApiController],
  providers: [MojangApiService],
})
export class MojangApiModule {}
