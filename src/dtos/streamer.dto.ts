import { ApiProperty } from '@nestjs/swagger';
import { Platform } from '../entities/streamers';

export class StreamerDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'CHZZK', enum: Platform })
  platform: Platform;

  @ApiProperty({ example: '고 랑' })
  nickname: string;

  @ApiProperty({ example: 'fa5488558a1b991641f3fd521c11e22e' })
  channel: string;
}
