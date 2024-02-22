import { z } from 'zod';
import { CreateSnackUseCase } from '../../../../domain/use-cases/snacks/create-snack';
import { BadRequest } from 'http-responses-ts';

const createSnackBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
});

export type CreateSnackBodySchema = z.infer<typeof createSnackBodySchema>;

export class CreateSnackController {
  constructor(private createSnack: CreateSnackUseCase) {}

  async handle({ name, description, price }: CreateSnackBodySchema) {
    createSnackBodySchema.parse({ name, description, price });

    const result = await this.createSnack.execute({ name, description, price });

    if (result.isLeft()) {
      throw new BadRequest();
    }
  }
}
