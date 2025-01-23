import { ApiProperty } from '@nestjs/swagger';

export class GetUUIDsDto {
  @ApiProperty({ type: [String] })
  names: string[];
}
