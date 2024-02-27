import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { FetchAllOrdersController } from '../../controllers/orders/fetch-all-orders.controller'
import { FetchAllOrdersUseCase } from '../../../../domain/use-cases/orders/fetch-all-orders'
import { PrismaOrdersRepository } from '../../../database/repositories/prisma-orders-repository'
import { PrismaOrderSnacksRepository } from '../../../database/repositories/prisma-order-snacks-repository'

export class FetchAllOrdersHandler {
  constructor(private fetchAllOrdersController: FetchAllOrdersController) {}

  public lambdaHandler = async (
    event: APIGatewayProxyEvent,
  ): Promise<APIGatewayProxyResult> => {
    const queryParams = JSON.stringify(event.queryStringParameters)
    const parsedParams = JSON.parse(queryParams)

    if (parsedParams) {
      const { startDate, endDate, page, pageSize } = parsedParams

      if (startDate && endDate) {
        parsedParams.startDate = new Date(startDate)
        parsedParams.endDate = new Date(endDate)
      }

      if (page && pageSize) {
        parsedParams.page = Number(page)
        parsedParams.pageSize = Number(pageSize)
      }
    }

    const orders = await this.fetchAllOrdersController.handle(
      parsedParams ?? {},
    )

    return {
      statusCode: 200,
      body: JSON.stringify(orders),
    } as APIGatewayProxyResult
  }
}

const orderSnacksRepository = new PrismaOrderSnacksRepository()
const orderRepository = new PrismaOrdersRepository(orderSnacksRepository)
const getAllOrdersUseCase = new FetchAllOrdersUseCase(orderRepository)
const getAllOrdersController = new FetchAllOrdersController(getAllOrdersUseCase)

export const fetchAllOrdersHandler = new FetchAllOrdersHandler(
  getAllOrdersController,
).lambdaHandler
