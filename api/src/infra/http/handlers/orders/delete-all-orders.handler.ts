import { APIGatewayProxyResult } from 'aws-lambda';
import { DeleteOrderController } from '../../controllers/orders/delete-all-orders.controller';
import { DeleteOrderUseCase } from '../../../../domain/use-cases/orders/delete-all-orders';
import { PrismaOrdersRepository } from '../../../database/repositories/prisma-orders-repository';
import { PrismaOrderSnacksRepository } from '../../../database/repositories/prisma-order-snacks-repository';

export class DeleteOrderHandler {
  constructor(private deleteOrderController: DeleteOrderController) {}

  public lambdaHandler = async (): Promise<APIGatewayProxyResult> => {
    await this.deleteOrderController.handle();

    return { statusCode: 204 } as APIGatewayProxyResult;
  };
}

const prismaOrderSnacksRepository = new PrismaOrderSnacksRepository();
const orderRepository = new PrismaOrdersRepository(prismaOrderSnacksRepository);
const deleteOrderUseCase = new DeleteOrderUseCase(orderRepository);
const deleteOrderController = new DeleteOrderController(deleteOrderUseCase);

export const deleteOrderHandler = new DeleteOrderHandler(deleteOrderController).lambdaHandler;
