import { PrismaClient } from '@prisma/client';
import { OrderSnacks } from '../../../domain/entities/order-snacks';
import { OrderSnacksRepository } from '../../../domain/repositories/order-snacks-repository';
import { PrismaOrderSnacksMapper } from '../mappers/prisma-order-snacks-mapper';

export class PrismaOrderSnacksRepository implements OrderSnacksRepository {
  private prisma = new PrismaClient();

  async createMany(orderSnacks: OrderSnacks[]): Promise<void> {
    const data = orderSnacks.map(PrismaOrderSnacksMapper.toPrisma);

    await this.prisma.orderSnacks.createMany({
      data,
    });
  }

  async findManyByOrderId(orderId: string): Promise<OrderSnacks[]> {
    const orderSnacks = await this.prisma.orderSnacks.findMany({
      where: {
        orderId,
      },
    });

    return orderSnacks.map(PrismaOrderSnacksMapper.toDomain);
  }

  async deleteManyByOrderId(orderId: string): Promise<void> {
    await this.prisma.orderSnacks.deleteMany({
      where: {
        orderId,
      },
    });
  }
}
