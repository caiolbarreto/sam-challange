import { Ingredient, UpdateIngredient } from '../entities/ingredient'

export interface IngredientsRepository {
  create(ingredient: Ingredient): Promise<void>
  findAll(): Promise<Ingredient[]>
  findById(ingredientId: string): Promise<Ingredient | null>
  update(ingredientId: string, ingredient: UpdateIngredient): Promise<void>
  delete(ingredientId: string): Promise<void>
}
