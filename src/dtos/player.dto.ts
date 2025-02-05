import { ApiProperty, OmitType } from '@nestjs/swagger';
import { StreamerDto } from './streamer.dto';

export class PlayerDto {
  @ApiProperty({ example: 'gotiger' })
  minecraftId: string;

  @ApiProperty({ example: '901bff98-1f3f-4468-a294-7ff14fbbaa2d' })
  uuid: string;

  @ApiProperty({ example: '고랑' })
  nickname: string;

  @ApiProperty({ type: [StreamerDto] })
  streamers: StreamerDto[];
}

export class CreatePlayerDto {
  @ApiProperty({ example: 'gotiger' })
  id: string;

  @ApiProperty({ example: '901bff981f3f4468a2947ff14fbbaa2d' })
  uuid: string;

  @ApiProperty({ example: '고랑', required: false })
  nickname?: string;
}

export class SetPlayerIdNicknameDto extends OmitType(CreatePlayerDto, ['uuid'] as const) {}

export class SetPlayerUuidNicknameDto extends OmitType(CreatePlayerDto, ['id'] as const) {}
