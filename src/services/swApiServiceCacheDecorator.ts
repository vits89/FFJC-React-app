import { swApiServiceTransformer } from './swApiServiceTransformer';

const CACHE_KEY_PREFIX = 'SW_';

export async function swApiServiceCacheDecorator<T>(
  endpoint: string,
  Class: { new (): T },
  number?: number
): Promise<T[]> {
  const cacheKey = CACHE_KEY_PREFIX + endpoint;

  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    return Promise.resolve<T[]>(JSON.parse(cachedData));
  }

  const data = await swApiServiceTransformer<T>(endpoint, Class, number);

  localStorage.setItem(cacheKey, JSON.stringify(data));

  return data;
}
