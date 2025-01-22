import { ApiProperty, OmitType } from '@nestjs/swagger';

export class CreatePlayerDto {
  @ApiProperty({ example: 'gotiger' })
  id: string;

  @ApiProperty({ example: '901bff981f3f4468a2947ff14fbbaa2d' })
  uuid: string;

  @ApiProperty({ example: '고랑' })
  nickname?: string;
}

export class SetPlayerIdNicknameDto extends OmitType(CreatePlayerDto, ['uuid'] as const) {}
