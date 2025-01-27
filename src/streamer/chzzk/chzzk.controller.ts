import { Body, Controller, Post } from '@nestjs/common';
import { ChzzkService } from './chzzk.service';
import { CreateChzzkDto } from 'src/dtos';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller()
export class ChzzkController {
  constructor(private readonly chzzkService: ChzzkService) {}

  @Post()
  @ApiOperation({ description: '치지직 스트리머 등록' })
  @ApiNotFoundResponse({ description: '먼저 플레이어로 등록해주세요.' })
  @ApiConflictResponse({ description: '이미 등록된 치지직 플레이어입니다.' })
  @ApiBadRequestResponse({ description: '해당 플랫폼과 스트리머가 이미 등록되었습니다.' })
  @ApiInternalServerErrorResponse({ description: '플레이어 등록 중 오류가 발생했습니다.' })
  async registerPlayer(@Body() dto: CreateChzzkDto) {
    return await this.chzzkService.registerPlayer(dto);
  }
}
