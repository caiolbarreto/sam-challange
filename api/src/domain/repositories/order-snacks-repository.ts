import { OrderSnacks } from '../entities/order-snacks';

export interface OrderSnacksRepository {
  createMany(orderSnacks: OrderSnacks[]): Promise<void>;
  deleteManyByOrderId(orderId: string): Promise<void>;
}
