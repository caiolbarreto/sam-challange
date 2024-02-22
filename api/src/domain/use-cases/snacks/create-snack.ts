import { Either, right } from '../../../core/either';
import { Snack } from '../../entities/snack';
import { SnacksRepository } from '../../repositories/snacks-repository';

interface CreateSnackUseCaseRequest {
  name: string;
  description: string;
  price: number;
}

type CreateSnackUseCaseResponse = Either<
  null,
  {
    snack: Snack;
  }
>;

export class CreateSnackUseCase {
  constructor(private snacksRepository: SnacksRepository) {}

  async execute({ name, description, price }: CreateSnackUseCaseRequest): Promise<CreateSnackUseCaseResponse> {
    const snack = Snack.create({
      name,
      description,
      price,
    });

    await this.snacksRepository.create(snack);

    return right({
      snack,
    });
  }
}
