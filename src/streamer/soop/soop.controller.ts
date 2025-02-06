import { Body, Controller, Post } from '@nestjs/common';
import { SoopService } from './soop.service';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateSoopDto } from 'src/dtos';

@Controller()
export class SoopController {
  constructor(private readonly soopService: SoopService) {}

  @Post()
  @ApiOperation({ description: 'Soop 스트리머 등록' })
  @ApiNotFoundResponse({ description: '먼저 플레이어로 등록해주세요.' })
  @ApiConflictResponse({ description: '이미 등록된 Soop 스트리머입니다.' })
  @ApiBadRequestResponse({ description: '해당 플랫폼과 스트리머가 이미 등록되었습니다.' })
  @ApiInternalServerErrorResponse({ description: '플레이어 등록 중 오류가 발생했습니다.' })
  async registerPlayer(@Body() dto: CreateSoopDto) {
    return await this.soopService.registerPlayer(dto);
  }
}
