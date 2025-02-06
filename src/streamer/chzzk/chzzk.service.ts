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
import { CreateChzzkDto, UpdateChzzkStreamerDto } from 'src/dtos';
import { Player } from 'src/entities/players';
import { Platform, Streamer } from 'src/entities/streamers';
import { QueryFailedError, Repository } from 'typeorm';
import { DEFAULT_BASE_URLS, DEFAULT_USER_AGENT } from '../streamer.constants';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ChzzkService {
  private readonly chzzkApiUrl: string = DEFAULT_BASE_URLS.chzzkBaseUrl;
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Streamer) private readonly streamerRepository: Repository<Streamer>,
    @InjectRepository(Player) private readonly playerRepository: Repository<Player>,
  ) {}

  async chzzkStatus(uid: string): Promise<any> {
    const url = `${this.chzzkApiUrl}/service/v1/channels/${uid}`;
    try {
      const headers = {
        'User-Agent': DEFAULT_USER_AGENT,
      };

      const response = await firstValueFrom(this.httpService.get(url, { headers }));
      return response.data.content.channelName;
    } catch (e) {
      console.error(e);
      throw new Error(`Failed: ${e.message}`);
    }
  }

  async registerPlayer(dto: CreateChzzkDto) {
    try {
      const player = await this.playerRepository.findOneOrFail({ where: { uuid: dto.uuid } });
      if (!player) throw new NotFoundException('먼저 플레이어로 등록해주세요.');

      const status = await this.chzzkStatus(dto.uid);

      return await this.streamerRepository.save({
        platform: Platform.CHZZK,
        nickname: status,
        channel: dto.uid,
        player,
      });
    } catch (e) {
      if (e instanceof QueryFailedError) {
        const errorDetail = e.driverError.detail ?? '';

        if (errorDetail.includes('Key (platform, player_id)')) {
          throw new ConflictException('이미 등록된 치지직 스트리머입니다.');
        }
        if (errorDetail.includes('Key (channel)')) {
          throw new BadRequestException('해당 플랫폼과 스트리머가 이미 등록되었습니다.');
        }
        throw new InternalServerErrorException('플레이어 등록 중 오류가 발생했습니다.');
      }
      throw new InternalServerErrorException('플레이어 등록 중 오류가 발생했습니다.');
    }
  }

  async findChzzkSteamerByUid(uid: string) {
    try {
      return await this.streamerRepository.findOneOrFail({ where: { channel: uid }, relations: ['player'] });
    } catch (error) {
      throw new NotFoundException('해당 스트리머를 찾을 수 없습니다.');
    }
  }

  async findChzzkSteamerByNickname(nickname: string) {
    try {
      return await this.streamerRepository
        .createQueryBuilder('streamer')
        .leftJoinAndSelect('streamer.player', 'player')
        .where("REPLACE(streamer.nickname, ' ', '') ILIKE '%' || REPLACE(:nickname, ' ', '') || '%'", { nickname })
        .andWhere("streamer.platform = 'CHZZK'")
        .getMany();
    } catch (error) {
      throw new NotFoundException('해당 스트리머를 찾을 수 없습니다.');
    }
  }

  async updateChzzkStreamerById(id: number, dto: UpdateChzzkStreamerDto) {
    const { platform, nickname, channel } = dto;
    try {
      const streamer = await this.streamerRepository.findOneOrFail({ where: { id }, relations: ['player'] });

      if (platform !== streamer.platform) throw new MisdirectedException('치지직 스트리머 정보가 아닙니다.');
      if (nickname) streamer.nickname = nickname;
      if (channel) streamer.channel = channel;

      return await this.streamerRepository.save(streamer);
    } catch (error) {
      throw new NotFoundException('해당 스트리머를 찾을 수 없습니다.');
    }
  }

  async deleteChzzkStreamerById(id: number) {
    try {
      const streamer = await this.streamerRepository.findOneOrFail({ where: { id }, relations: ['player'] });
      return await this.streamerRepository.remove(streamer);
    } catch (error) {
      throw new NotFoundException('해당 스트리머를 찾을 수 없습니다.');
    }
  }
}
