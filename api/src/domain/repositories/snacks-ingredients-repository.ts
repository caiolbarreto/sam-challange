import { SnackIngredients } from '../entities/snack-ingredients';

export interface SnackIngredientsRepository {
  createMany(snackIngredients: SnackIngredients[]): Promise<void>;
  deleteManyBySnackId(snackId: string): Promise<void>;
}
