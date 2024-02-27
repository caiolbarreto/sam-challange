import { z } from 'zod'
import { FetchAllOrdersUseCase } from '../../../../domain/use-cases/orders/fetch-all-orders'
import { OrderDetailsPresenter } from '../../presenters/order-details-presenter'
import { BadRequest } from 'http-responses-ts'

const fetchAllOrdersSchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  page: z.number().optional(),
  pageSize: z.number().optional(),
})

export type FetchAllOrdersSchema = z.infer<typeof fetchAllOrdersSchema>

export class FetchAllOrdersController {
  constructor(private fetchAllOrders: FetchAllOrdersUseCase) {}

  async handle({ startDate, endDate, page, pageSize }: FetchAllOrdersSchema) {
    const result = await this.fetchAllOrders.execute({
      startDate,
      endDate,
      page,
      pageSize,
    })

    if (result.isLeft()) {
      throw new BadRequest()
    }

    const orders = result.value.orders

    const httpOrders = {
      ...orders,
      data: orders.data.map(OrderDetailsPresenter.toHTTP),
    }

    return httpOrders
  }
}
