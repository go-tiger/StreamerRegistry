import { Body, Controller, Post } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto, SetPlayerIdNicknameDto, SetPlayerUuidNicknameDto } from '../dtos';
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';

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
}
