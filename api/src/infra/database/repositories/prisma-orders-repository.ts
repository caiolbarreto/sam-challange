import { PrismaClient } from '@prisma/client'
import { Order } from '../../../domain/entities/order'
import {
  OrdersRepository,
  PaginatedOrders,
} from '../../../domain/repositories/orders-repository'
import { PrismaOrderMapper } from '../mappers/prisma-order-mapper'
import { OrderSnacksRepository } from '../../../domain/repositories/order-snacks-repository'
import { PrismaOrderDetailsMapper } from '../mappers/prisma-order-details-mapper'

export class PrismaOrdersRepository implements OrdersRepository {
  private prisma = new PrismaClient()

  constructor(private orderSnacksRepository: OrderSnacksRepository) {}

  async create(order: Order): Promise<void> {
    const data = PrismaOrderMapper.toPrisma(order)

    await this.prisma.order.create({
      data,
    })

    await this.orderSnacksRepository.createMany(order.orderSnacks.getItems())
  }

  async findById(orderId: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
    })

    if (!order) {
      return null
    }

    return PrismaOrderMapper.toDomain(order)
  }

  async findAll(
    startDate?: Date,
    endDate?: Date,
    page = 1,
    pageSize = 10,
  ): Promise<PaginatedOrders> {
    let whereCondition = {}

    if (startDate && endDate) {
      whereCondition = {
        date: {
          gte: startDate,
          lt: endDate,
        },
      }
    }

    const skip = (page - 1) * pageSize
    const totalCount = await this.prisma.order.count({ where: whereCondition })
    const orders = await this.prisma.order.findMany({
      where: whereCondition,
      include: {
        orderSnacks: true,
      },
      skip,
      take: pageSize,
    })

    return {
      data: orders.map(PrismaOrderDetailsMapper.toDomain),
      meta: {
        pageIndex: page,
        totalCount,
        perPage: pageSize,
      },
    }
  }

  async deleteMany(): Promise<void> {
    await this.orderSnacksRepository.deleteMany()

    await this.prisma.order.deleteMany()
  }
}
