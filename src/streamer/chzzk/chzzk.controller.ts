import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ChzzkService } from './chzzk.service';
import { CreateChzzkDto, UpdateChzzkStreamerDto } from 'src/dtos';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiMisdirectedResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller()
export class ChzzkController {
  constructor(private readonly chzzkService: ChzzkService) {}

  @Post()
  @ApiOperation({ description: '치지직 스트리머 등록' })
  @ApiNotFoundResponse({ description: '먼저 플레이어로 등록해주세요.' })
  @ApiConflictResponse({ description: '이미 등록된 치지직 스트리머입니다.' })
  @ApiBadRequestResponse({ description: '해당 플랫폼과 스트리머가 이미 등록되었습니다.' })
  @ApiInternalServerErrorResponse({ description: '플레이어 등록 중 오류가 발생했습니다.' })
  async registerPlayer(@Body() dto: CreateChzzkDto) {
    return await this.chzzkService.registerPlayer(dto);
  }

  @Get(':uid/uid')
  @ApiOperation({ description: '치지직 UID로 조회' })
  @ApiNotFoundResponse({ description: '해당 스트리머를 찾을 수 없습니다.' })
  async findChzzkSteamerByUid(@Param('uid') uid: string) {
    return await this.chzzkService.findChzzkSteamerByUid(uid);
  }

  @Get(':name/name')
  @ApiOperation({ description: '치지직 닉네임으로 조회' })
  @ApiNotFoundResponse({ description: '해당 스트리머를 찾을 수 없습니다.' })
  async findChzzkSteamerByNickname(@Param('name') name: string) {
    return await this.chzzkService.findChzzkSteamerByNickname(name);
  }

  @Patch(':id')
  @ApiOperation({ description: '치지직 정보 수정' })
  @ApiNotFoundResponse({ description: '해당 스트리머를 찾을 수 없습니다.' })
  @ApiMisdirectedResponse({ description: '치지직 스트리머 정보가 아닙니다.' })
  async updateChzzkStreamerById(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateChzzkStreamerDto) {
    return await this.chzzkService.updateChzzkStreamerById(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ description: '치지직 정보 삭제' })
  @ApiNotFoundResponse({ description: '해당 스트리머를 찾을 수 없습니다.' })
  async deleteChzzkStreamerById(@Param('id', ParseIntPipe) id: number) {
    return await this.chzzkService.deleteChzzkStreamerById(id);
  }
}
