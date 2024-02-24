import { Order } from '../../../domain/entities/order';

export class OrderPresenter {
  static toHTTP(order: Order) {
    return {
      id: order.id.toString(),
      date: order.date,
    };
  }
}
