import { z } from 'zod';
import { CreateIngredientUseCase } from '../../../domain/use-cases/create-ingredient';

const createIngredientBodySchema = z.object({
  data: z.object({
    type: z.string(),
    attributes: z.object({
      name: z.string(),
      quantity: z.number(),
    }),
  }),
});

export type CreateIngredientBodySchema = z.infer<typeof createIngredientBodySchema>;

export class CreateIngredientController {
  constructor(private createIngredient: CreateIngredientUseCase) {}

  async handle(body: CreateIngredientBodySchema) {
    const {
      data: { attributes },
    } = body;

    createIngredientBodySchema.parse(body);

    const result = await this.createIngredient.execute(attributes);

    if (result.isLeft()) {
      throw new Error();
    }
  }
}
