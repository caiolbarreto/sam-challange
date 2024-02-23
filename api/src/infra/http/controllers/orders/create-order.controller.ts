import { z } from 'zod';
import { CreateOrderUseCase } from '../../../../domain/use-cases/orders/create-order';
import { BadRequest } from 'http-responses-ts';

const createOrderBodySchema = z.object({
  orderDetails: z.array(
    z.object({
      snackId: z.string().uuid(),
      quantity: z.number(),
    }),
  ),
});

export type CreateOrderBodySchema = z.infer<typeof createOrderBodySchema>;

export class CreateOrderController {
  constructor(private createOrder: CreateOrderUseCase) {}

  async handle({ orderDetails }: CreateOrderBodySchema) {
    createOrderBodySchema.parse({ orderDetails });

    const result = await this.createOrder.execute({ orderDetails });

    if (result.isLeft()) {
      throw new BadRequest();
    }
  }
}
