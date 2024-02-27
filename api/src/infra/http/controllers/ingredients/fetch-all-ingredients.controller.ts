import { z } from 'zod'
import { FetchAllIngredientsUseCase } from '../../../../domain/use-cases/ingredients/fetch-all-ingredients'
import { IngredientPresenter } from '../../presenters/ingredient-presenter'
import { BadRequest } from 'http-responses-ts'

const fetchAllIngredientsSchema = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
})

export type FetchAllIngredientsSchema = z.infer<
  typeof fetchAllIngredientsSchema
>

export class FetchAllIngredientsController {
  constructor(private createIngredient: FetchAllIngredientsUseCase) {}

  async handle({ page, pageSize }: FetchAllIngredientsSchema) {
    const result = await this.createIngredient.execute({ page, pageSize })

    if (result.isLeft()) {
      throw new BadRequest()
    }

    const ingredients = result.value.ingredients

    const httpIngredients = {
      ...ingredients,
      data: ingredients.data.map(IngredientPresenter.toHTTP),
    }

    return httpIngredients
  }
}
