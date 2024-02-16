import { Ingredient } from '../entities/ingredient';

export interface IngredientsRepository {
  create(ingredient: Ingredient): Promise<void>;
  getAll(): Promise<Ingredient[]>;
}
