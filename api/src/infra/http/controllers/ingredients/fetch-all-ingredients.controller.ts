import { FetchAllIngredientsUseCase } from '../../../../domain/use-cases/ingredients/fetch-all-ingredients';
import { IngredientPresenter } from '../../presenters/ingredient-presenter';
import { BadRequest } from 'http-responses-ts';

export class FetchAllIngredientsController {
  constructor(private createIngredient: FetchAllIngredientsUseCase) {}

  async handle() {
    const result = await this.createIngredient.execute();

    if (result.isLeft()) {
      throw new BadRequest();
    }

    const ingredients = result.value.ingredients;

    return ingredients.map(IngredientPresenter.toHTTP);
  }
}
