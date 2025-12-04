import type { Character } from './Character';
import type { ApiInfo } from './ApiInfo';

export interface CharacterResponse {
  info: ApiInfo;
  results: Character[];
}
