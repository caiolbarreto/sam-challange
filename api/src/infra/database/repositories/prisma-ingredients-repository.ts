import { PrismaClient } from '@prisma/client';
import { Ingredient } from '../../../domain/entities/ingredient';
import { IngredientsRepository } from '../../../domain/repositories/ingredients-repository';
import { PrismaIngredientMapper } from '../mappers/prisma-ingredient-mapper';

export class PrismaIngredientsRepository implements IngredientsRepository {
  constructor(private prisma = new PrismaClient()) {}

  async create(ingredient: Ingredient): Promise<void> {
    const data = PrismaIngredientMapper.toPrisma(ingredient);

    await this.prisma.ingredient.create({
      data,
    });
  }

  async getAll(): Promise<Ingredient[]> {
    const ingredients = await this.prisma.ingredient.findMany();

    return ingredients.map(PrismaIngredientMapper.toDomain);
  }
}
