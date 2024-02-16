import { UniqueEntityID } from '../../../core/unique-entity-id';
import { Ingredient } from '../../../domain/entities/ingredient';
import { Ingredient as PrismaIngredient, Prisma } from '@prisma/client';

export class PrismaIngredientMapper {
  static toDomain(raw: PrismaIngredient): Ingredient {
    return Ingredient.create(
      {
        name: raw.name,
        quantity: raw.quantity,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(ingredient: Ingredient): Prisma.IngredientUncheckedCreateInput {
    return {
      id: ingredient.id.toString(),
      name: ingredient.name,
      quantity: ingredient.quantity,
    };
  }
}
