import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  MisdirectedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSoopDto, UpdateSoopStreamerDto } from 'src/dtos';
import { Player } from 'src/entities/players';
import { Platform, Streamer } from 'src/entities/streamers';
import { QueryFailedError, Repository } from 'typeorm';
import { DEFAULT_BASE_URLS, DEFAULT_USER_AGENT } from '../streamer.constants';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SoopService {
  private readonly soopApiUrl: string = DEFAULT_BASE_URLS.soopBaseUrl;
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Streamer) private readonly streamerRepository: Repository<Streamer>,
    @InjectRepository(Player) private readonly playerRepository: Repository<Player>,
  ) {}

  private async soopStatus(id: string) {
    const url = `${this.soopApiUrl}/${id}/station`;
    try {
      const headers = {
        'User-Agent': DEFAULT_USER_AGENT,
      };

      const response = await firstValueFrom(this.httpService.get(url, { headers }));
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error(`Failed: ${e.message}`);
    }
  }

  async registerPlayer(dto: CreateSoopDto) {
    try {
      const player = await this.playerRepository.findOneOrFail({ where: { uuid: dto.uuid } });
      if (!player) throw new NotFoundException('먼저 플레이어로 등록해주세요.');

      const status = await this.soopStatus(dto.id);

      return await this.streamerRepository.save({
        platform: Platform.SOOP,
        nickname: status.station.user_nick,
        channel: dto.id,
        player,
      });
    } catch (e) {
      if (e instanceof QueryFailedError) {
        const errorDetail = e.driverError.detail ?? '';

        if (errorDetail.includes('Key (platform, player_id)')) {
          throw new ConflictException('이미 등록된 Soop 스트리머입니다.');
        }
        if (errorDetail.includes('Key (channel)')) {
          throw new BadRequestException('해당 플랫폼과 스트리머가 이미 등록되었습니다.');
        }
        throw new InternalServerErrorException('플레이어 등록 중 오류가 발생했습니다.');
      }
      throw new InternalServerErrorException('플레이어 등록 중 오류가 발생했습니다.');
    }
  }

  async findSoopSteamerById(id: string) {
    try {
      return await this.streamerRepository.findOneOrFail({
        where: { channel: id, platform: Platform.SOOP },
        relations: ['player'],
      });
    } catch (error) {
      throw new NotFoundException('해당 스트리머를 찾을 수 없습니다.');
    }
  }

  async findSoopSteamerByNickname(nickname: string) {
    try {
      return await this.streamerRepository
        .createQueryBuilder('streamer')
        .leftJoinAndSelect('streamer.player', 'player')
        .where("REPLACE(streamer.nickname, ' ', '') ILIKE '%' || REPLACE(:nickname, ' ', '') || '%'", { nickname })
        .andWhere("streamer.platform = 'SOOP'")
        .getMany();
    } catch (error) {
      throw new NotFoundException('해당 스트리머를 찾을 수 없습니다.');
    }
  }

  async updateSoopStreamerById(id: number, dto: UpdateSoopStreamerDto) {
    const { platform, nickname, channel } = dto;
    try {
      const streamer = await this.streamerRepository.findOneOrFail({ where: { id }, relations: ['player'] });

      if (platform !== streamer.platform) throw new MisdirectedException('Soop 스트리머 정보가 아닙니다.');
      if (nickname) streamer.nickname = nickname;
      if (channel) streamer.channel = channel;

      return await this.streamerRepository.save(streamer);
    } catch (error) {
      throw new NotFoundException('해당 스트리머를 찾을 수 없습니다.');
    }
  }
}
