import { PrismaClient } from '@prisma/client';
import { Snack } from '../../../domain/entities/snack';
import { SnacksRepository } from '../../../domain/repositories/snacks-repository';
import { PrismaSnackMapper } from '../mappers/prisma-snack-mapper';

export class PrismaSnacksRepository implements SnacksRepository {
  constructor(private prisma = new PrismaClient()) {}

  async create(snack: Snack): Promise<void> {
    const data = PrismaSnackMapper.toPrisma(snack);

    await this.prisma.snack.create({
      data,
    });
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
