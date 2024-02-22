import { Snack } from '../entities/snack';

export interface SnacksRepository {
  create(snack: Snack): Promise<void>;
  findAll(): Promise<Snack[]>;
  delete(id: string): Promise<void>;
}
