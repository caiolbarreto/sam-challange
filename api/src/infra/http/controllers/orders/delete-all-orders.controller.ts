import { BadRequest } from 'http-responses-ts'
import { DeleteOrderUseCase } from '../../../../domain/use-cases/orders/delete-all-orders'

export class DeleteOrderController {
  constructor(private deleteOrder: DeleteOrderUseCase) {}

  async handle() {
    const result = await this.deleteOrder.execute()

    if (result.isLeft()) {
      throw new BadRequest()
    }
  }
}
