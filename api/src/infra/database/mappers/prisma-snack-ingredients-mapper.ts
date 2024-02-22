import { UniqueEntityID } from '../../../core/unique-entity-id';
import { SnackIngredients } from '../../../domain/entities/snack-ingredients';
import { SnackIngredients as PrismaSnackIngredients, Prisma } from '@prisma/client';

export class PrismaSnackIngredientsMapper {
  static toDomain(raw: PrismaSnackIngredients): SnackIngredients {
    return SnackIngredients.create(
      {
        snackId: new UniqueEntityID(raw.snackId),
        ingredientId: new UniqueEntityID(raw.ingredientId),
        quantity: raw.quantity,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(snackIngredients: SnackIngredients): Prisma.SnackIngredientsUncheckedCreateInput {
    return {
      id: snackIngredients.id.toString(),
      snackId: snackIngredients.snackId.toString(),
      ingredientId: snackIngredients.ingredientId.toString(),
      quantity: snackIngredients.quantity,
    };
  }
}
