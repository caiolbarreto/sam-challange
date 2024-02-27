import { Either, right } from '../../../core/either'
import {
  OrdersRepository,
  PaginatedOrders,
} from '../../repositories/orders-repository'

interface FetchAllOrdersUseCaseRequest {
  startDate?: Date
  endDate?: Date
  page?: number
  pageSize?: number
}

type FetchAllOrdersUseCaseResponse = Either<
  null,
  {
    orders: PaginatedOrders
  }
>

export class FetchAllOrdersUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    startDate,
    endDate,
    page,
    pageSize,
  }: FetchAllOrdersUseCaseRequest): Promise<FetchAllOrdersUseCaseResponse> {
    const orders = await this.ordersRepository.findAll(
      startDate,
      endDate,
      page,
      pageSize,
    )

    return right({
      orders,
    })
  }
}
