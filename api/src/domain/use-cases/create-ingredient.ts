import { Either, right } from '../core/either';
import { Ingredient } from '../entities/ingredient';
import { IngredientRepository } from '../repositories/ingredients-repository';

interface CreateIngredientUseCaseRequest {
  name: string;
  quantity: number;
}

type CreateIngredientUseCaseResponse = Either<
  null,
  {
    ingredient: Ingredient;
  }
>;

export class CreateIngredientUseCase {
  constructor(private ingredientsRepository: IngredientRepository) {}

  async execute({ name, quantity }: CreateIngredientUseCaseRequest): Promise<CreateIngredientUseCaseResponse> {
    const ingredient = Ingredient.create({
      name,
      quantity,
    });

    await this.ingredientsRepository.create(ingredient);

    return right({
      ingredient,
    });
  }
}
