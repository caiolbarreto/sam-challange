import { Order } from '../entities/order';

export interface OrdersRepository {
  create(order: Order): Promise<void>;
  findById(orderId: string): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  deleteMany(orderId: string): Promise<void>;
}
