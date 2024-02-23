import { SnackIngredients } from '../../../domain/entities/snack-ingredients';

export class SnackIngredientsPresenter {
  static toHTTP(snackIngredients: SnackIngredients) {
    return {
      id: snackIngredients.id.toString(),
      snackId: snackIngredients.snackId.toString(),
      ingredientId: snackIngredients.ingredientId.toString(),
      quantity: snackIngredients.quantity,
    };
  }
}
