import { z } from 'zod';
import { CreateOrderUseCase } from '../../../../domain/use-cases/orders/create-order';
import { BadRequest } from 'http-responses-ts';

const createOrderBodySchema = z.object({
  date: z.date(),
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

  async handle({ date, orderDetails }: CreateOrderBodySchema) {
    createOrderBodySchema.parse({ date, orderDetails });

    const result = await this.createOrder.execute({ date, orderDetails });

    if (result.isLeft()) {
      throw new BadRequest();
    }
  }
}
