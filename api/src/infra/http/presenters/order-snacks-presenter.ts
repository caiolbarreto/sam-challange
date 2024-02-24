import { OrderSnacks } from '../../../domain/entities/order-snacks';

export class OrderSnacksPresenter {
  static toHTTP(order: OrderSnacks) {
    return {
      id: order.id.toString(),
      orderId: order.orderId.toString(),
      snackId: order.snackId.toString(),
      quantity: order.quantity
    };
  }
}
