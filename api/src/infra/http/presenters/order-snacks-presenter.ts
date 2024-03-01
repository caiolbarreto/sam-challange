import { OrderSnacksDetails } from '../../../domain/entities/order-details'
import { SnackPresenter } from './snack-presenter'

export class OrderSnacksPresenter {
  static toHTTP(order: OrderSnacksDetails) {
    return {
      id: order.id.toString(),
      orderId: order.orderId.toString(),
      snackId: order.snackId.toString(),
      quantity: order.quantity,
      snack: SnackPresenter.toHTTP(order.snack),
    }
  }
}
