import { APIGatewayProxyResult } from 'aws-lambda';
import { FetchAllOrdersController } from '../../controllers/orders/fetch-all-orders.controller';
import { FetchAllOrdersUseCase } from '../../../../domain/use-cases/orders/fetch-all-orders';
import { PrismaOrdersRepository } from '../../../database/repositories/prisma-orders-repository';
import { PrismaOrderSnacksRepository } from '../../../database/repositories/prisma-order-snacks-repository';

export class FetchAllOrdersHandler {
  constructor(private fetchAllOrdersController: FetchAllOrdersController) {}

  public lambdaHandler = async (): Promise<APIGatewayProxyResult> => {
    const orders = await this.fetchAllOrdersController.handle();

    return { statusCode: 200, body: JSON.stringify(orders) } as APIGatewayProxyResult;
  };
}

const orderSnacksRepository = new PrismaOrderSnacksRepository();
const orderRepository = new PrismaOrdersRepository(orderSnacksRepository);
const getAllOrdersUseCase = new FetchAllOrdersUseCase(orderRepository);
const getAllOrdersController = new FetchAllOrdersController(getAllOrdersUseCase);

export const fetchAllOrdersHandler = new FetchAllOrdersHandler(getAllOrdersController).lambdaHandler;
