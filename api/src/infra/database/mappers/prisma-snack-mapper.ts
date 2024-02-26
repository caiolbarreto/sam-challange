import { UniqueEntityID } from '../../../core/unique-entity-id'
import { Snack } from '../../../domain/entities/snack'
import { Snack as PrismaSnack, Prisma } from '@prisma/client'

export class PrismaSnackMapper {
  static toDomain(raw: PrismaSnack): Snack {
    return Snack.create(
      {
        name: raw.name,
        description: raw.description,
        price: raw.price,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(snack: Snack): Prisma.SnackUncheckedCreateInput {
    return {
      id: snack.id.toString(),
      name: snack.name,
      description: snack.description,
      price: snack.price,
    }
  }
}
