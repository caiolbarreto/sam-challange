import { Either, right } from '../../../core/either';
import { SnackDetails } from '../../entities/snack-details';
import { SnacksRepository } from '../../repositories/snacks-repository';

type FetchAllSnacksUseCaseResponse = Either<
  null,
  {
    snacks: SnackDetails[];
  }
>;

export class FetchAllSnacksUseCase {
  constructor(private snacksRepository: SnacksRepository) {}

  async execute(): Promise<FetchAllSnacksUseCaseResponse> {
    const snacks = await this.snacksRepository.findAll();

    return right({
      snacks,
    });
  }
}
