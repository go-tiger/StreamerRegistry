import { ApiProperty } from '@nestjs/swagger';

export class PlayerDto {
  @ApiProperty({ example: 'gotiger' })
  minecraftId: string;

  @ApiProperty({ example: '901bff98-1f3f-4468-a294-7ff14fbbaa2d' })
  uuid: string;

  @ApiProperty({ example: '고랑' })
  nickname: string;

  @ApiProperty({
    type: 'object',
    additionalProperties: { type: 'object', properties: { nickname: { type: 'string' }, channel: { type: 'string' } } },
  })
  streamers: Record<string, { nickname: string; channel: string }>;
}
