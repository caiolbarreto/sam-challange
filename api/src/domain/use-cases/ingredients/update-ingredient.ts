import { Either, left, right } from '../../../core/either'
import { UpdateIngredient } from '../../entities/ingredient'
import { IngredientsRepository } from '../../repositories/ingredients-repository'
import { NotFound } from 'http-responses-ts'

interface UpdateIngredientUseCaseRequest {
  ingredientId: string
  content: {
    name?: string
    quantity?: number
  }
}

type UpdateIngredientUseCaseResponse = Either<
  NotFound,
  {
    content: UpdateIngredient
  }
>

export class UpdateIngredientUseCase {
  constructor(private ingredientsRepository: IngredientsRepository) {}

  async execute(
    ingredient: UpdateIngredientUseCaseRequest,
  ): Promise<UpdateIngredientUseCaseResponse> {
    const ingredientOnDataBase = await this.ingredientsRepository.findById(
      ingredient.ingredientId,
    )

    if (!ingredientOnDataBase) {
      return left(new NotFound('Ingredient not found'))
    }

    await this.ingredientsRepository.update(
      ingredient.ingredientId,
      ingredient.content,
    )

    return right({
      content: ingredient.content,
    })
  }
}
