import { Either, right } from '../../../core/either'
import {
  PaginatedSnacks,
  SnacksRepository,
} from '../../repositories/snacks-repository'

interface FetchAllSnacksUseCaseRequest {
  page?: number
  pageSize?: number
}

type FetchAllSnacksUseCaseResponse = Either<
  null,
  {
    snacks: PaginatedSnacks
  }
>

export class FetchAllSnacksUseCase {
  constructor(private snacksRepository: SnacksRepository) {}

  async execute({
    page,
    pageSize,
  }: FetchAllSnacksUseCaseRequest): Promise<FetchAllSnacksUseCaseResponse> {
    const snacks = await this.snacksRepository.findAll(page, pageSize)

    return right({
      snacks,
    })
  }
}
