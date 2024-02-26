import { OrderDetails } from '../../../domain/entities/order-details'
import { OrderSnacksPresenter } from './order-snacks-presenter'

export class OrderDetailsPresenter {
  static toHTTP(orderDetails: OrderDetails) {
    return {
      orderId: orderDetails.orderId.toString(),
      date: orderDetails.date,
      orderSnacks: orderDetails.orderSnacks.map(OrderSnacksPresenter.toHTTP),
    }
  }
}
