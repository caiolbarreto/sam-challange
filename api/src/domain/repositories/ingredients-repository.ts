import { Ingredient, UpdateIngredient } from '../entities/ingredient'

export interface PaginatedIngredients {
  data: Ingredient[]
  meta: {
    pageIndex: number
    totalCount: number
    perPage: number
  }
}

export interface IngredientsRepository {
  create(ingredient: Ingredient): Promise<void>
  findAll(page?: number, pageSize?: number): Promise<PaginatedIngredients>
  findById(ingredientId: string): Promise<Ingredient | null>
  update(ingredientId: string, ingredient: UpdateIngredient): Promise<void>
  delete(ingredientId: string): Promise<void>
}
