import { Controller, Get, Param, Query } from '@nestjs/common';
import { MojangApiService } from './mojang-api.service';
import { GetUUIDsDto } from '../dtos';

@Controller('mojang-api')
export class MojangApiController {
  constructor(private readonly mojangApiService: MojangApiService) {}

  @Get('uuid/:uuid')
  async status(@Param('uuid') uuid: string) {
    const getProfile = await this.mojangApiService.getProfile(uuid);
    const getSkinData = await this.mojangApiService.getSkinData(uuid);
    const getSkinURL = await this.mojangApiService.getSkinURL(uuid);
    const getPlayerHead = await this.mojangApiService.getPlayerHead(uuid);
    return { getProfile, getSkinData, getSkinURL, getPlayerHead };
  }

  @Get('id/:id')
  async id(@Param('id') id: string) {
    const getUUID = await this.mojangApiService.getUUID(id);
    const getProfileByName = await this.mojangApiService.getProfileByName(id);
    const getSkinDataByName = await this.mojangApiService.getSkinDataByName(id);
    const getSkinURLByName = await this.mojangApiService.getSkinURLByName(id);
    const getPlayerHeadByName = await this.mojangApiService.getPlayerHeadByName(id);
    return { getUUID, getProfileByName, getSkinDataByName, getSkinURLByName, getPlayerHeadByName };
  }

  @Get('ids')
  async ids(@Query() query: GetUUIDsDto) {
    return await this.mojangApiService.getUUIDs(query.names);
  }
}
