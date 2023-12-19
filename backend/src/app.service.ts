import { Injectable } from '@nestjs/common';
import * as createHash from 'create-hash';
import { RedisService } from './services/redis.service';
import { Redis } from 'ioredis';

export type CreateUrlDto = {
  url: string;
};

export type GetUrlDto = {
  key: string;
};

@Injectable()
export class AppService {
  constructor(private readonly redisService: RedisService) {}

  private readonly redisClient: Redis = this.redisService.getClient();

  async getUrl(params: GetUrlDto): Promise<string> {
    const { key } = params;
    const url = await this.redisClient.get(key);
    return url;
  }

  createUrl(params: CreateUrlDto): string {
    const { url } = params;
    const hash = createHash('sha256')
      .update(url, 'utf8')
      .digest('hex')
      .slice(0, 6);
    this.redisClient.set(hash, url);
    return hash;
  }
}
