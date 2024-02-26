import { PrismaClient } from '@prisma/client'
import { SnackIngredients } from '../../../domain/entities/snack-ingredients'
import { SnackIngredientsRepository } from '../../../domain/repositories/snacks-ingredients-repository'
import { PrismaSnackIngredientsMapper } from '../mappers/prisma-snack-ingredients-mapper'

export class PrismaSnackIngredientsRepository
  implements SnackIngredientsRepository
{
  private prisma = new PrismaClient()

  async createMany(snackIngredients: SnackIngredients[]): Promise<void> {
    const data = snackIngredients.map(PrismaSnackIngredientsMapper.toPrisma)

    await this.prisma.snackIngredients.createMany({
      data,
    })
  }

  async deleteManyBySnackId(snackId: string): Promise<void> {
    await this.prisma.snackIngredients.deleteMany({
      where: {
        snackId,
      },
    })
  }
}
