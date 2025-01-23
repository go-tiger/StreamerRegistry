import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto, PlayerDto, SetPlayerIdNicknameDto, SetPlayerUuidNicknameDto } from '../dtos';
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async createPlayer(@Body() dto: CreatePlayerDto) {
    return await this.playerService.createPlayer(dto);
  }

  @Post('nickname/id')
  @ApiCreatedResponse({ description: '닉네임이 등록/수정 되었습니다.' })
  @ApiNotFoundResponse({ description: '해당 마인크래프트 ID가 존재하지 않습니다.' })
  @ApiConflictResponse({ description: '닉네임 등록/수정 중 오류가 발생하였습니다.' })
  async setPlayerIdNickname(@Body() dto: SetPlayerIdNicknameDto): Promise<string> {
    return await this.playerService.setPlayerIdNickname(dto);
  }

  @Post('nickname/uuid')
  @ApiCreatedResponse({ description: '닉네임이 등록/수정 되었습니다.' })
  @ApiNotFoundResponse({ description: '해당 마인크래프트 UUID가 존재하지 않습니다.' })
  @ApiConflictResponse({ description: '닉네임 등록/수정 중 오류가 발생하였습니다.' })
  async setPlayerUuidNickname(@Body() dto: SetPlayerUuidNicknameDto) {
    return await this.playerService.setPlayerUuidNickname(dto);
  }

  @Get('id/:id')
  @ApiOkResponse({ type: PlayerDto })
  @ApiNotFoundResponse({ description: '해당 마인크래프트 ID가 존재하지 않습니다.' })
  async findPlayerById(@Param('id') id: string): Promise<PlayerDto> {
    return await this.playerService.findPlayerById(id);
  }

  @Get('uuid/:uuid')
  @ApiOkResponse({ type: PlayerDto })
  @ApiNotFoundResponse({ description: '해당 마인크래프트 UUID가 존재하지 않습니다.' })
  async findPlayerByUuid(@Param('uuid') uuid: string): Promise<PlayerDto> {
    return await this.playerService.findPlayerByUuid(uuid);
  }

  @Delete('id/:id')
  async removePlayerById(@Param('id') id: string) {
    return await this.playerService.removePlayerById(id);
  }

  @Delete('uuid/:uuid')
  async removePlayerByUuid(@Param('uuid') uuid: string) {
    return await this.playerService.removePlayerByUuid(uuid);
  }
}
