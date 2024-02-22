import { WatchedList } from '../../core/watched-list';
import { SnackIngredients } from './snack-ingredients';

export class SnackIngredientsList extends WatchedList<SnackIngredients> {
  compareItems(a: SnackIngredients, b: SnackIngredients): boolean {
    return a.ingredientId.equals(b.ingredientId);
  }
}
