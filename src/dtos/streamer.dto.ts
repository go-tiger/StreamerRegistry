import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
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

export class CreateStreamerDto {
  @ApiProperty({ example: '901bff981f3f4468a2947ff14fbbaa2d' })
  uuid: string;

  @ApiProperty({ example: 'fa5488558a1b991641f3fd521c11e22e' })
  uid: string;

  @ApiProperty({ example: 'gotiger' })
  id: string;
}

export class CreateChzzkDto extends OmitType(CreateStreamerDto, ['id'] as const) {}

export class CreateSoopDto extends OmitType(CreateStreamerDto, ['uid'] as const) {}

export class UpdateChzzkStreamerDto extends OmitType(PartialType(StreamerDto), ['id'] as const) {}

export class UpdateSoopStreamerDto extends OmitType(PartialType(StreamerDto), ['id'] as const) {}
