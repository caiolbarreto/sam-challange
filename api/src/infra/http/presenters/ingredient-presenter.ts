import { Ingredient } from '../../../domain/entities/ingredient';

export class IngredientPresenter {
  static toHTTP(ingredient: Ingredient) {
    return {
      id: ingredient.id.toString(),
      name: ingredient.name,
      quantity: ingredient.quantity,
    };
  }
}
