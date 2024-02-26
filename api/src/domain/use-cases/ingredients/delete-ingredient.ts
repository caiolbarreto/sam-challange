import { Either, left, right } from '../../../core/either'
import { IngredientsRepository } from '../../repositories/ingredients-repository'
import { NotFound } from 'http-responses-ts'

interface DeleteIngredientUseCaseRequest {
  ingredientId: string
}

type DeleteIngredientUseCaseResponse = Either<NotFound, null>

export class DeleteIngredientUseCase {
  constructor(private ingredientsRepository: IngredientsRepository) {}

  async execute({
    ingredientId,
  }: DeleteIngredientUseCaseRequest): Promise<DeleteIngredientUseCaseResponse> {
    const ingredientOnDataBase = await this.ingredientsRepository.findById(
      ingredientId,
    )

    if (!ingredientOnDataBase) {
      return left(new NotFound('Ingredient not found'))
    }

    await this.ingredientsRepository.delete(ingredientId)

    return right(null)
  }
}
