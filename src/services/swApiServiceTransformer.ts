import { v4 as uuidv4 } from 'uuid';

import { swApiService } from './swApiService';

export async function swApiServiceTransformer<T>(endpoint: string, classType: { new(): T }, number?: number):
  Promise<T[]> {
  const data = await swApiService(endpoint, number);

  return data.map(datum => {
    const entity = new classType();

    (entity as unknown as { id: string }).id = uuidv4();

    for (const prop in entity) {
      if (datum[prop]) {
        entity[prop] = datum[prop];
      }
    }

    return entity;
  });
}
