import { Either, right } from '../../../core/either'
import {
  IngredientsRepository,
  PaginatedIngredients,
} from '../../repositories/ingredients-repository'

interface FetchAllIngredientsUseCaseRequest {
  page?: number
  pageSize?: number
}

type FetchAllIngredientsUseCaseResponse = Either<
  null,
  {
    ingredients: PaginatedIngredients
  }
>

export class FetchAllIngredientsUseCase {
  constructor(private ingredientsRepository: IngredientsRepository) {}

  async execute({
    page,
    pageSize,
  }: FetchAllIngredientsUseCaseRequest): Promise<FetchAllIngredientsUseCaseResponse> {
    const ingredients = await this.ingredientsRepository.findAll(page, pageSize)

    return right({
      ingredients,
    })
  }
}
