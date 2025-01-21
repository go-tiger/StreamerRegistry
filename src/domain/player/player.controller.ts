import { Body, Controller, Post } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from '../dtos';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async createPlayer(@Body() dto: CreatePlayerDto) {
    return await this.playerService.createPlayer(dto);
  }
}
