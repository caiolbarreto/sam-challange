import { Order } from '../entities/order';
import { OrderDetails } from '../entities/order-details';

export interface OrdersRepository {
  create(order: Order): Promise<void | null>;
  findById(orderId: string): Promise<Order | null>;
  findAll(): Promise<OrderDetails[]>;
  deleteMany(): Promise<void>;
}
