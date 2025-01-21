import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from '../dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/entities/players';
import { Repository } from 'typeorm';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
  ) {}

  async createPlayer(dto: CreatePlayerDto) {
    await this.playersRepository.save({
      minecraftId: dto.id,
      uuid: dto.uuid,
      nickname: dto.nickname,
    });
  }
}
