import { z } from 'zod'
import { BadRequest, NotFound } from 'http-responses-ts'
import { DeleteIngredientUseCase } from '../../../../domain/use-cases/ingredients/delete-ingredient'

const deleteIngredientBodySchema = z.object({
  ingredientId: z.string(),
})

export type DeleteIngredientBodySchema = z.infer<
  typeof deleteIngredientBodySchema
>

export class DeleteIngredientController {
  constructor(private deleteIngredient: DeleteIngredientUseCase) {}

  async handle(ingredient: DeleteIngredientBodySchema) {
    deleteIngredientBodySchema.parse(ingredient)

    const result = await this.deleteIngredient.execute(ingredient)

    if (result.isLeft()) {
      const error = result.value
      switch (error.statusCode) {
        case 404:
          throw new NotFound(error.message)
        default:
          throw new BadRequest(error.message)
      }
    }
  }
}
