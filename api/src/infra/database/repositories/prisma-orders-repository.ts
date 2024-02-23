import { PrismaClient } from '@prisma/client';
import { Order } from '../../../domain/entities/order';
import { OrdersRepository } from '../../../domain/repositories/orders-repository';
import { PrismaOrderMapper } from '../mappers/prisma-order-mapper';
import { OrderSnacksRepository } from '../../../domain/repositories/order-snacks-repository';

export class PrismaOrdersRepository implements OrdersRepository {
  private prisma = new PrismaClient();

  constructor(private orderSnacksRepository: OrderSnacksRepository) {}

  async create(order: Order): Promise<void> {
    const data = PrismaOrderMapper.toPrisma(order);

    await this.prisma.order.create({
      data,
    });

    await this.orderSnacksRepository.createMany(order.orderSnacks.getItems());
  }

  async findById(orderId: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      return null;
    }

    return PrismaOrderMapper.toDomain(order);
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany();

    return orders.map(PrismaOrderMapper.toDomain);
  }

  async deleteMany(): Promise<void> {
    await this.orderSnacksRepository.deleteMany();

    await this.prisma.order.deleteMany();
  }
}
