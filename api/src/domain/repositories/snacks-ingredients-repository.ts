import { SnackIngredients } from '../entities/snack-ingredients';

export interface SnackIngredientsRepository {
  createMany(snackIngredients: SnackIngredients[]): Promise<void>;
  findManyBySnackId(snackId: string): Promise<SnackIngredients[]>;
  deleteManyBySnackId(snackId: string): Promise<void>;
}
