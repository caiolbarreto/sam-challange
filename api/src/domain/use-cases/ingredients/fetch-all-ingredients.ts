import { Either, right } from '../../../core/either'
import { Ingredient } from '../../entities/ingredient'
import { IngredientsRepository } from '../../repositories/ingredients-repository'

type FetchAllIngredientsUseCaseResponse = Either<
  null,
  {
    ingredients: Ingredient[]
  }
>

export class FetchAllIngredientsUseCase {
  constructor(private ingredientsRepository: IngredientsRepository) {}

  async execute(): Promise<FetchAllIngredientsUseCaseResponse> {
    const ingredients = await this.ingredientsRepository.findAll()

    return right({
      ingredients,
    })
  }
}
