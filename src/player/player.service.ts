import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto, PlayerDto, SetPlayerIdNicknameDto, SetPlayerUuidNicknameDto } from '../dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/entities/players';
import { Streamer } from 'src/entities/streamers';
import { Repository } from 'typeorm';
import { StreamerDto } from 'src/dtos/streamer.dto';

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

  async setPlayerIdNickname(dto: SetPlayerIdNicknameDto): Promise<string> {
    const checkPlayerId = await this.playersRepository.findOne({ where: { minecraftId: dto.id } });

    if (checkPlayerId == null) {
      throw new NotFoundException('해당 마인크래프트 ID가 존재하지 않습니다.');
    }

    const result = await this.playersRepository.update(
      { minecraftId: checkPlayerId.minecraftId },
      { nickname: dto.nickname },
    );

    if (result.affected === 1) {
      return '닉네임이 등록/수정 되었습니다.';
    } else {
      throw new ConflictException('닉네임 등록/수정 중 오류가 발생하였습니다.');
    }
  }

  async setPlayerUuidNickname(dto: SetPlayerUuidNicknameDto) {
    const checkPlayerUuid = await this.playersRepository.findOne({ where: { uuid: dto.uuid } });

    if (checkPlayerUuid == null) {
      throw new NotFoundException('해당 마인크래프트 UUID가 존재하지 않습니다.');
    }

    const result = await this.playersRepository.update({ uuid: checkPlayerUuid.uuid }, { nickname: dto.nickname });

    if (result.affected === 1) {
      return '닉네임이 등록/수정 되었습니다.';
    } else {
      throw new ConflictException('닉네임 등록/수정 중 오류가 발생하였습니다.');
    }
  }

  async findPlayerById(id: string): Promise<PlayerDto> {
    try {
      const player = await this.playersRepository.findOneOrFail({
        where: { minecraftId: id },
        relations: ['streamers'],
      });

      const fixStreamers = this.formatStreamers(player.streamers);
      return {
        minecraftId: player.minecraftId,
        uuid: player.uuid,
        nickname: player.nickname,
        streamers: fixStreamers,
      };
    } catch {
      throw new NotFoundException('해당 마인크래프트 ID가 존재하지 않습니다.');
    }
  }

  async findPlayerByUuid(uuid: string): Promise<PlayerDto> {
    try {
      const player = await this.playersRepository.findOneOrFail({
        where: { uuid },
        relations: ['streamers'],
      });

      const fixStreamers = this.formatStreamers(player.streamers);
      return {
        minecraftId: player.minecraftId,
        uuid: player.uuid,
        nickname: player.nickname,
        streamers: fixStreamers,
      };
    } catch {
      throw new NotFoundException('해당 마인크래프트 UUID가 존재하지 않습니다.');
    }
  }

  async removePlayerById(id: string) {
    try {
      const player = await this.playersRepository.findOneOrFail({ where: { minecraftId: id } });

      await this.playersRepository.remove(player);
    } catch {
      throw new NotFoundException('해당 마인크래프트 ID가 존재하지 않습니다.');
    }
  }

  async removePlayerByUuid(uuid: string) {
    try {
      const player = await this.playersRepository.findOneOrFail({ where: { uuid } });

      await this.playersRepository.remove(player);
    } catch {
      throw new NotFoundException('해당 마인크래프트 UUID가 존재하지 않습니다.');
    }
  }

  private formatStreamers(streamers: Streamer[]): StreamerDto[] {
    return streamers.map((streamer) => ({
      id: streamer.id,
      platform: streamer.platform,
      nickname: streamer.nickname,
      channel: streamer.channel,
      createdAt: streamer.createdAt,
    }));
  }
}
