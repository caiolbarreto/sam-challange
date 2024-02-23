import { UniqueEntityID } from '../../../core/unique-entity-id';
import { OrderSnacks } from '../../../domain/entities/order-snacks';
import { OrderSnacks as PrismaOrderSnacks, Prisma } from '@prisma/client';

export class PrismaOrderSnacksMapper {
  static toDomain(raw: PrismaOrderSnacks): OrderSnacks {
    return OrderSnacks.create(
      {
        orderId: new UniqueEntityID(raw.orderId),
        snackId: new UniqueEntityID(raw.snackId),
        quantity: raw.quantity,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(orderSnacks: OrderSnacks): Prisma.OrderSnacksUncheckedCreateInput {
    return {
      id: orderSnacks.id.toString(),
      orderId: orderSnacks.orderId.toString(),
      snackId: orderSnacks.snackId.toString(),
      quantity: orderSnacks.quantity,
    };
  }
}
