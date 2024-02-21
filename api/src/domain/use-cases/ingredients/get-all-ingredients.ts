import { Either, right } from '../../../core/either';
import { Ingredient } from '../../entities/ingredient';
import { IngredientsRepository } from '../../repositories/ingredients-repository';

type GetAllIngredientsUseCaseResponse = Either<
  null,
  {
    ingredients: Ingredient[];
  }
>;

export class GetAllIngredientsUseCase {
  constructor(private ingredientsRepository: IngredientsRepository) {}

  async execute(): Promise<GetAllIngredientsUseCaseResponse> {
    const ingredients = await this.ingredientsRepository.findAll();

    return right({
      ingredients,
    });
  }
}
