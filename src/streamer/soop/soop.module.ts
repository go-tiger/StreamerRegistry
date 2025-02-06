import { Module } from '@nestjs/common';
import { SoopController } from './soop.controller';
import { SoopService } from './soop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Streamer } from 'src/entities/streamers';
import { Player } from 'src/entities/players';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Streamer, Player]), HttpModule],
  controllers: [SoopController],
  providers: [SoopService],
})
export class SoopModule {}
