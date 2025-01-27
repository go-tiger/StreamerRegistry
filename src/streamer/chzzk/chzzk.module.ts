import { Module } from '@nestjs/common';
import { ChzzkController } from './chzzk.controller';
import { ChzzkService } from './chzzk.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Streamer } from 'src/entities/streamers';
import { Player } from 'src/entities/players';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Streamer, Player]), HttpModule],
  controllers: [ChzzkController],
  providers: [ChzzkService],
})
export class ChzzkModule {}
