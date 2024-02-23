import { Either, right } from '../../../core/either';
import { UniqueEntityID } from '../../../core/unique-entity-id';
import { Snack } from '../../entities/snack';
import { SnackIngredients } from '../../entities/snack-ingredients';
import { SnackIngredientsList } from '../../entities/snack-ingredients-list';
import { SnacksRepository } from '../../repositories/snacks-repository';

interface IngredientDetails {
  id: string;
  quantity: number;
}

interface CreateSnackUseCaseRequest {
  name: string;
  description: string;
  price: number;
  ingredientsDetails: IngredientDetails[];
}

type CreateSnackUseCaseResponse = Either<
  null,
  {
    snack: Snack;
  }
>;

export class CreateSnackUseCase {
  constructor(private snacksRepository: SnacksRepository) {}

  async execute({
    name,
    description,
    price,
    ingredientsDetails,
  }: CreateSnackUseCaseRequest): Promise<CreateSnackUseCaseResponse> {
    const snack = Snack.create({
      name,
      description,
      price,
    });

    const ingredients = ingredientsDetails.map((ingredient) => {
      return SnackIngredients.create({
        snackId: snack.id,
        ingredientId: new UniqueEntityID(ingredient.id),
        quantity: ingredient.quantity,
      });
    });

    snack.snackIngredients = new SnackIngredientsList(ingredients);

    await this.snacksRepository.create(snack);

    return right({
      snack,
    });
  }
}
