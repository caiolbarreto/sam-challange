import { z } from 'zod';
import { CreateSnackUseCase } from '../../../../domain/use-cases/snacks/create-snack';
import { BadRequest } from 'http-responses-ts';

const createSnackBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  ingredientsDetails: z.array(
    z.object({
      ingredientId: z.string().uuid(),
      quantity: z.number(),
    }),
  ),
});

export type CreateSnackBodySchema = z.infer<typeof createSnackBodySchema>;

export class CreateSnackController {
  constructor(private createSnack: CreateSnackUseCase) {}

  async handle({ name, description, price, ingredientsDetails }: CreateSnackBodySchema) {
    createSnackBodySchema.parse({ name, description, price, ingredientsDetails });

    const result = await this.createSnack.execute({ name, description, price, ingredientsDetails });

    if (result.isLeft()) {
      throw new BadRequest();
    }
  }
}
