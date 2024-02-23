import { OrderSnacks } from '../entities/order-snacks';

export interface OrderSnacksRepository {
  createMany(orderSnacks: OrderSnacks[]): Promise<void>;
  deleteManyBySnackId(snackId: string): Promise<void>;
}
