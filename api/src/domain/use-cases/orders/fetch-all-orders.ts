import { Either, right } from '../../../core/either'
import { OrderDetails } from '../../entities/order-details'
import { OrdersRepository } from '../../repositories/orders-repository'

interface FetchAllOrdersUseCaseRequest {
  startDate?: Date
  endDate?: Date
}

type FetchAllOrdersUseCaseResponse = Either<
  null,
  {
    orders: OrderDetails[]
  }
>

export class FetchAllOrdersUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    startDate,
    endDate,
  }: FetchAllOrdersUseCaseRequest): Promise<FetchAllOrdersUseCaseResponse> {
    const orders = await this.ordersRepository.findAll(startDate, endDate)

    return right({
      orders,
    })
  }
}
