import { Injectable } from '@nestjs/common';
import redis from './services/redis.service';
import * as createHash from 'create-hash';

export type CreateUrlDto = {
  url: string;
};

export type GetUrlDto = {
  key: string;
};

@Injectable()
export class AppService {
  async getUrl(params: GetUrlDto): Promise<string> {
    const { key } = params;
    console.log(key);
    const url = await redis.get(key);
    return url;
  }

  createUrl(params: CreateUrlDto): string {
    const { url } = params;
    const hash = createHash('sha256')
      .update(url, 'utf8')
      .digest('hex')
      .slice(0, 6);
    redis.set(hash, url);
    return hash;
  }
}
