import {
  Snack as PrismaSnack,
  SnackIngredients as PrismaSnackIngredients,
} from '@prisma/client'
import { UniqueEntityID } from '../../../core/unique-entity-id'
import { SnackDetails } from '../../../domain/entities/snack-details'
import { PrismaSnackIngredientsMapper } from './prisma-snack-ingredients-mapper'

type PrismaSnackDetails = PrismaSnack & {
  snackIngredients: PrismaSnackIngredients[]
}

export class PrismaSnackDetailsMapper {
  static toDomain(raw: PrismaSnackDetails) {
    return SnackDetails.create({
      snackId: new UniqueEntityID(raw.id),
      name: raw.name,
      description: raw.description,
      price: raw.price,
      snackIngredients: raw.snackIngredients.map(
        PrismaSnackIngredientsMapper.toDomain,
      ),
    })
  }
}
