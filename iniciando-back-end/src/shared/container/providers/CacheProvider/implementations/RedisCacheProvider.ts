import Redis, { Redis as RedisClient } from 'ioredis';

import cacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';


class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: T | T[]): Promise<void> {
    this.client.set(key, JSON.stringify(value));
  }

  public async recover(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parseData = JSON.parse(data)

    return parseData;
  }

  public async invalidate(key: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`);

    const pipeline = this.client.pipeline();

    keys.forEach(key =>{
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}
export default RedisCacheProvider;
