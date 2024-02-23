import { Order } from '../entities/order';

export interface OrdersRepository {
  create(order: Order): Promise<void | null>;
  findById(orderId: string): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  deleteMany(): Promise<void>;
}
