import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { SoopService } from './soop.service';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiMisdirectedResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateSoopDto, UpdateSoopStreamerDto } from 'src/dtos';

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

  @Get(':id/id')
  @ApiOperation({ description: 'Soop ID로 조회' })
  @ApiNotFoundResponse({ description: '해당 스트리머를 찾을 수 없습니다.' })
  async findSoopSteamerById(@Param('id') id: string) {
    return await this.soopService.findSoopSteamerById(id);
  }

  @Get(':name/name')
  @ApiOperation({ description: 'Soop 닉네임으로 조회' })
  @ApiNotFoundResponse({ description: '해당 스트리머를 찾을 수 없습니다.' })
  async findSoopSteamerByNickname(@Param('name') name: string) {
    return await this.soopService.findSoopSteamerByNickname(name);
  }

  @Patch(':id')
  @ApiOperation({ description: 'Soop 정보 수정' })
  @ApiNotFoundResponse({ description: '해당 스트리머를 찾을 수 없습니다.' })
  @ApiMisdirectedResponse({ description: 'Soop 스트리머 정보가 아닙니다.' })
  async updateSoopStreamerById(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSoopStreamerDto) {
    return await this.soopService.updateSoopStreamerById(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Soop 정보 삭제' })
  @ApiNotFoundResponse({ description: '해당 스트리머를 찾을 수 없습니다.' })
  async deleteSoopStreamerById(@Param('id', ParseIntPipe) id: number) {
    return await this.soopService.deleteSoopStreamerById(id);
  }
}
