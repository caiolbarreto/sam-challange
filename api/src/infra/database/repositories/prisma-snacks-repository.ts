import { PrismaClient } from '@prisma/client';
import { Snack } from '../../../domain/entities/snack';
import { SnacksRepository } from '../../../domain/repositories/snacks-repository';
import { PrismaSnackMapper } from '../mappers/prisma-snack-mapper';
import { SnackIngredientsRepository } from '../../../domain/repositories/snacks-ingredients-repository';

export class PrismaSnacksRepository implements SnacksRepository {
  private prisma = new PrismaClient();

  constructor(private snackIngredientsRepository: SnackIngredientsRepository) {}

  async create(snack: Snack): Promise<void> {
    const data = PrismaSnackMapper.toPrisma(snack);

    await this.prisma.snack.create({
      data,
    });

    await this.snackIngredientsRepository.createMany(snack.snackIngredients.getItems());
  }

  async findAll(): Promise<Snack[]> {
    const snacks = await this.prisma.snack.findMany();

    return snacks.map(PrismaSnackMapper.toDomain);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.snack.delete({
      where: {
        id,
      },
    });
  }
}
