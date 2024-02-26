import { PrismaClient } from '@prisma/client'
import { Snack } from '../../../domain/entities/snack'
import { SnacksRepository } from '../../../domain/repositories/snacks-repository'
import { PrismaSnackMapper } from '../mappers/prisma-snack-mapper'
import { SnackIngredientsRepository } from '../../../domain/repositories/snacks-ingredients-repository'
import { PrismaSnackDetailsMapper } from '../mappers/prisma-snack-details-mapper'
import { SnackDetails } from '../../../domain/entities/snack-details'

export class PrismaSnacksRepository implements SnacksRepository {
  private prisma = new PrismaClient()

  constructor(private snackIngredientsRepository: SnackIngredientsRepository) {}

  async create(snack: Snack): Promise<void> {
    const data = PrismaSnackMapper.toPrisma(snack)

    await this.prisma.snack.create({
      data,
    })

    await this.snackIngredientsRepository.createMany(
      snack.snackIngredients.getItems(),
    )
  }

  async findAll(): Promise<SnackDetails[]> {
    const snacks = await this.prisma.snack.findMany({
      include: {
        snackIngredients: true,
      },
    })

    return snacks.map(PrismaSnackDetailsMapper.toDomain)
  }

  async findById(snackId: string): Promise<SnackDetails | null> {
    const snack = await this.prisma.snack.findUnique({
      where: {
        id: snackId,
      },
      include: {
        snackIngredients: true,
      },
    })

    if (!snack) {
      return null
    }

    return PrismaSnackDetailsMapper.toDomain(snack)
  }

  async delete(snackId: string): Promise<void> {
    await this.snackIngredientsRepository.deleteManyBySnackId(snackId)

    await this.prisma.snack.delete({
      where: {
        id: snackId,
      },
    })
  }
}
