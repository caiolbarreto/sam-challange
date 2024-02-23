import { Either, right } from '../../../core/either';
import { Snack } from '../../entities/snack';
import { SnacksRepository } from '../../repositories/snacks-repository';

type FetchAllSnacksUseCaseResponse = Either<
  null,
  {
    snacks: Snack[];
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
