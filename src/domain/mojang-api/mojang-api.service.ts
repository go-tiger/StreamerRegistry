import { Injectable } from '@nestjs/common';
import { getPlayerHead, getProfile, getSkinData, getSkinURL, getUUID, getUUIDs } from 'mojang-minecraft-api';
import { getPlayerHeadByName, getProfileByName, getSkinDataByName, getSkinURLByName } from 'mojang-minecraft-api';

@Injectable()
export class MojangApiService {
  async getUUID(id: string) {
    try {
      return await getUUID(id);
    } catch (e) {
      console.log('🚀  e:', e);
    }
  }

  async getUUIDs(names: Array<string>) {
    try {
      return await getUUIDs(names);
    } catch (e) {
      console.log('🚀  e:', e);
    }
  }

  async getProfile(uuid: string) {
    try {
      return await getProfile(uuid);
    } catch (e) {
      console.log('🚀  e:', e);
    }
  }

  async getProfileByName(id: string) {
    try {
      return await getProfileByName(id);
    } catch (e) {
      console.log('🚀  e:', e);
    }
  }

  async getSkinData(uuid: string) {
    try {
      return await getSkinData(uuid);
    } catch (e) {
      console.log('🚀  e:', e);
    }
  }

  async getSkinDataByName(id: string) {
    try {
      return await getSkinDataByName(id);
    } catch (e) {
      console.log('🚀  e:', e);
    }
  }

  async getSkinURL(uuid: string) {
    try {
      return await getSkinURL(uuid);
    } catch (e) {
      console.log('🚀  e:', e);
    }
  }

  async getSkinURLByName(id: string) {
    try {
      return await getSkinURLByName(id);
    } catch (e) {
      console.log('🚀  e:', e);
    }
  }

  async getPlayerHead(uuid: string) {
    try {
      return await getPlayerHead(uuid);
    } catch (e) {
      console.log('🚀  e:', e);
    }
  }

  async getPlayerHeadByName(id: string) {
    try {
      return await getPlayerHeadByName(id);
    } catch (e) {
      console.log('🚀  e:', e);
    }
  }
}
