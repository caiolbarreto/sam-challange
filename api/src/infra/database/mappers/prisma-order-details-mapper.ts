import { OrderDetails } from '../../../domain/entities/order-details'
import { UniqueEntityID } from '../../../core/unique-entity-id'
import {
  Order as PrismaOrder,
  OrderSnacks as PrismaOrderSnacks,
  Snack as PrismaSnack,
} from '@prisma/client' // Import Snack from Prisma client
import { PrismaSnackMapper } from './prisma-snack-mapper'

type PrismaOrderSnackDetails = PrismaOrderSnacks & {
  snack: PrismaSnack
}

type PrismaOrderDetails = PrismaOrder & {
  orderSnacks: PrismaOrderSnackDetails[]
}

export class PrismaOrderDetailsMapper {
  static toDomain(raw: PrismaOrderDetails) {
    return OrderDetails.create({
      orderId: new UniqueEntityID(raw.id),
      date: raw.date,
      orderSnacks: raw.orderSnacks.map((orderSnack) => ({
        id: new UniqueEntityID(orderSnack.id),
        snackId: new UniqueEntityID(orderSnack.snackId),
        orderId: new UniqueEntityID(orderSnack.orderId),
        quantity: orderSnack.quantity,
        snack: PrismaSnackMapper.toDomain(orderSnack.snack),
      })),
    })
  }
}
