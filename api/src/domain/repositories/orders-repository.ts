import { Order } from '../entities/order'
import { OrderDetails } from '../entities/order-details'

export interface PaginatedOrders {
  data: OrderDetails[]
  meta: {
    pageIndex: number
    totalCount: number
    perPage: number
  }
}

export interface OrdersRepository {
  create(order: Order): Promise<void | null>
  findById(orderId: string): Promise<Order | null>
  findAll(
    startDate?: Date,
    endDate?: Date,
    page?: number,
    pageSize?: number,
  ): Promise<PaginatedOrders>
  deleteMany(): Promise<void>
}
