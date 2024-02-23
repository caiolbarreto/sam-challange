import { Either, left, right } from '../../../core/either';
import { SnacksRepository } from '../../repositories/snacks-repository';
import { NotFound } from 'http-responses-ts';

interface DeleteSnackUseCaseRequest {
  snackId: string;
}

type DeleteSnackUseCaseResponse = Either<NotFound, null>;

export class DeleteSnackUseCase {
  constructor(private snacksRepository: SnacksRepository) {}

  async execute({ snackId }: DeleteSnackUseCaseRequest): Promise<DeleteSnackUseCaseResponse> {
    const snackOnDataBase = await this.snacksRepository.findById(snackId);

    if (!snackOnDataBase) {
      return left(new NotFound('Snack not found'));
    }

    await this.snacksRepository.delete(snackId);

    return right(null);
  }
}
