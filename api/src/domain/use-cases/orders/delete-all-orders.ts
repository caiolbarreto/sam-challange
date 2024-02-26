import { Either, right } from '../../../core/either'
import { OrdersRepository } from '../../repositories/orders-repository'
import { NotFound } from 'http-responses-ts'

type DeleteOrderUseCaseResponse = Either<NotFound, null>

export class DeleteOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute(): Promise<DeleteOrderUseCaseResponse> {
    await this.ordersRepository.deleteMany()

    return right(null)
  }
}
