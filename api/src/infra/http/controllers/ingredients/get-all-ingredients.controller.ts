import { GetAllIngredientsUseCase } from '../../../../domain/use-cases/ingredients/get-all-ingredients';
import { IngredientPresenter } from '../../presenters/ingredient-presenter';
import { BadRequest } from 'http-responses-ts';

export class GetAllIngredientsController {
  constructor(private createIngredient: GetAllIngredientsUseCase) {}

  async handle() {
    const result = await this.createIngredient.execute();

    if (result.isLeft()) {
      throw new BadRequest();
    }

    const ingredients = result.value.ingredients;

    return ingredients.map(IngredientPresenter.toHTTP);
  }
}
