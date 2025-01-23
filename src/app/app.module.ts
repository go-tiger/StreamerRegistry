import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmConfig } from 'src/configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from 'src/player/player.module';
import { MojangApiModule } from 'src/mojang-api/mojang-api.module';
import { StreamerModule } from 'src/streamer/streamer.module';
import { RouterModule } from '@nestjs/core';
import { ChzzkModule } from 'src/streamer/chzzk/chzzk.module';
import { SoopModule } from 'src/streamer/soop/soop.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: TypeOrmConfig,
    }),
    PlayerModule,
    MojangApiModule,
    StreamerModule,
    RouterModule.register([
      {
        path: 'streamers',
        module: StreamerModule,
        children: [
          {
            path: 'chzzk',
            module: ChzzkModule,
          },
          {
            path: 'soop',
            module: SoopModule,
          },
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
