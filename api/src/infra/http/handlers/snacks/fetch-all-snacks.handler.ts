import { APIGatewayProxyResult } from 'aws-lambda';
import { FetchAllSnacksController } from '../../controllers/snacks/fetch-all-snacks.controller';
import { FetchAllSnacksUseCase } from '../../../../domain/use-cases/snacks/fetch-all-snacks';
import { PrismaSnacksRepository } from '../../../database/repositories/prisma-snacks-repository';
import { PrismaSnackIngredientsRepository } from '../../../database/repositories/prisma-snack-ingredients-repository';

export class FetchAllSnacksHandler {
  constructor(private fetchAllSnacksController: FetchAllSnacksController) {}

  public lambdaHandler = async (): Promise<APIGatewayProxyResult> => {
    const snacks = await this.fetchAllSnacksController.handle();

    return { statusCode: 200, body: JSON.stringify(snacks) } as APIGatewayProxyResult;
  };
}

const prismaSnackIngredientsRepository = new PrismaSnackIngredientsRepository();
const snackRepository = new PrismaSnacksRepository(prismaSnackIngredientsRepository);
const getAllSnacksUseCase = new FetchAllSnacksUseCase(snackRepository);
const getAllSnacksController = new FetchAllSnacksController(getAllSnacksUseCase);

export const fetchAllSnacksHandler = new FetchAllSnacksHandler(getAllSnacksController).lambdaHandler;
