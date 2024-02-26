import {
  Order as PrismaOrder,
  OrderSnacks as PrismaOrderSnacks,
} from '@prisma/client'
import { UniqueEntityID } from '../../../core/unique-entity-id'
import { OrderDetails } from '../../../domain/entities/order-details'
import { PrismaOrderSnacksMapper } from './prisma-order-snacks-mapper'

type PrismaOrderDetails = PrismaOrder & {
  orderSnacks: PrismaOrderSnacks[]
}

export class PrismaOrderDetailsMapper {
  static toDomain(raw: PrismaOrderDetails) {
    return OrderDetails.create({
      orderId: new UniqueEntityID(raw.id),
      date: raw.date,
      orderSnacks: raw.orderSnacks.map(PrismaOrderSnacksMapper.toDomain),
    })
  }
}
