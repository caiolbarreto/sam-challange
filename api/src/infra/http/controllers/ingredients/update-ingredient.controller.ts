import { z } from 'zod';
import { BadRequest, NotFound } from 'http-responses-ts';
import { UpdateIngredientUseCase } from '../../../../domain/use-cases/ingredients/update-ingredient';

const updateIngredientBodySchema = z.object({
  ingredientId: z.string(),
  content: z.object({
    name: z.string().optional(),
    quantity: z.number().optional(),
  }),
});

export type UpdateIngredientBodySchema = z.infer<typeof updateIngredientBodySchema>;

export class UpdateIngredientController {
  constructor(private updateIngredient: UpdateIngredientUseCase) {}

  async handle(ingredient: UpdateIngredientBodySchema) {
    updateIngredientBodySchema.parse(ingredient);

    const result = await this.updateIngredient.execute(ingredient);

    if (result.isLeft()) {
      const error = result.value;
      switch (error.statusCode) {
        case 404:
          throw new NotFound(error.message);
        default:
          throw new BadRequest(error.message);
      }
    }
  }
}
