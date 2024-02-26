import { z } from 'zod'
import { CreateIngredientUseCase } from '../../../../domain/use-cases/ingredients/create-ingredient'
import { BadRequest } from 'http-responses-ts'

const createIngredientBodySchema = z.object({
  name: z.string(),
  quantity: z.number(),
})

export type CreateIngredientBodySchema = z.infer<
  typeof createIngredientBodySchema
>

export class CreateIngredientController {
  constructor(private createIngredient: CreateIngredientUseCase) {}

  async handle({ name, quantity }: CreateIngredientBodySchema) {
    createIngredientBodySchema.parse({ name, quantity })

    const result = await this.createIngredient.execute({ name, quantity })

    if (result.isLeft()) {
      throw new BadRequest()
    }
  }
}
