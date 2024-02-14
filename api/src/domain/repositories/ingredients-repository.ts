import { Ingredient } from "../entities/ingredient";

export interface IngredientRepository {
  create(ingredient: Ingredient): Promise<void>
  getAll(): Promise<Ingredient>;
}
