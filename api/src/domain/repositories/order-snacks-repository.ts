import { OrderSnacks } from '../entities/order-snacks'

export interface OrderSnacksRepository {
  createMany(orderSnacks: OrderSnacks[]): Promise<void>
  deleteMany(): Promise<void>
}
