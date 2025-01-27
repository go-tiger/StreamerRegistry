import { ApiProperty, OmitType } from '@nestjs/swagger';

export class StreamerDto {
  @ApiProperty({ example: '901bff981f3f4468a2947ff14fbbaa2d' })
  uuid: string;

  @ApiProperty({ example: 'fa5488558a1b991641f3fd521c11e22e' })
  uid: string;

  @ApiProperty({ example: 'gotiger' })
  id: string;
}

export class CreateChzzkDto extends OmitType(StreamerDto, ['id'] as const) {}

export class CreateSoopDto extends OmitType(StreamerDto, ['uid'] as const) {}
