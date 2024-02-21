import { Ingredient, UpdateIngredient } from '../entities/ingredient';

export interface IngredientsRepository {
  create(ingredient: Ingredient): Promise<void>;
  findAll(): Promise<Ingredient[]>;
  findById(id: string): Promise<Ingredient | null>;
  update(id: string, ingredient: UpdateIngredient): Promise<void>;
  delete(id: string): Promise<void>;
}
