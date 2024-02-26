import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { CreateOrderController } from '../../controllers/orders/create-order.controller'
import { CreateOrderUseCase } from '../../../../domain/use-cases/orders/create-order'
import { PrismaOrdersRepository } from '../../../database/repositories/prisma-orders-repository'
import { PrismaOrderSnacksRepository } from '../../../database/repositories/prisma-order-snacks-repository'
import { PrismaIngredientsRepository } from '../../../database/repositories/prisma-ingredients-repository'
import { PrismaSnacksRepository } from '../../../database/repositories/prisma-snacks-repository'
import { PrismaSnackIngredientsRepository } from '../../../database/repositories/prisma-snack-ingredients-repository'

export class CreateOrderHandler {
  constructor(private createOrderController: CreateOrderController) {}

  public lambdaHandler = async (
    event: APIGatewayProxyEvent,
  ): Promise<APIGatewayProxyResult> => {
    const parsedBody = JSON.parse(event.body ?? '')

    await this.createOrderController.handle(parsedBody)

    return { statusCode: 201 } as APIGatewayProxyResult
  }
}

const orderSnacksRepository = new PrismaOrderSnacksRepository()
const ingredientsRepository = new PrismaIngredientsRepository()
const snackIngredientsRepository = new PrismaSnackIngredientsRepository()
const snacksRepository = new PrismaSnacksRepository(snackIngredientsRepository)
const orderRepository = new PrismaOrdersRepository(orderSnacksRepository)
const createOrderUseCase = new CreateOrderUseCase(
  ingredientsRepository,
  snacksRepository,
  orderRepository,
)
const createOrderController = new CreateOrderController(createOrderUseCase)

export const createOrderHandler = new CreateOrderHandler(createOrderController)
  .lambdaHandler
