import { Snack } from '../entities/snack';

export interface SnacksRepository {
  create(snack: Snack): Promise<void>;
  findById(snackId: string): Promise<Snack | null>;
  findAll(): Promise<Snack[]>;
  delete(snackId: string): Promise<void>;
}
