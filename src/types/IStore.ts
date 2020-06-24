import { IPerson, IPlanet, IStarship } from '.';

export interface IStore {
  people: IPerson[];
  planets: IPlanet[];
  starships: IStarship[];
}
