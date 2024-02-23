import { SnackDetails } from '../../../domain/entities/snack-details';
import { SnackIngredientsPresenter } from './snack-ingredients-presenter';

export class SnackDetailsPresenter {
  static toHTTP(snackDetails: SnackDetails) {
    return {
      snackId: snackDetails.snackId.toString(),
      name: snackDetails.name,
      description: snackDetails.description,
      price: snackDetails.price,
      snackIngredients: snackDetails.snackIngredients.map(SnackIngredientsPresenter.toHTTP),
    };
  }
}
