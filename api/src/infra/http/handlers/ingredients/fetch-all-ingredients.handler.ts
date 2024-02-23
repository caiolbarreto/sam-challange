import { APIGatewayProxyResult } from 'aws-lambda';
import { FetchAllIngredientsController } from '../../controllers/ingredients/fetch-all-ingredients.controller';
import { FetchAllIngredientsUseCase } from '../../../../domain/use-cases/ingredients/fetch-all-ingredients';
import { PrismaIngredientsRepository } from '../../../database/repositories/prisma-ingredients-repository';

export class FetchAllIngredientsHandler {
  constructor(private fetchAllIngredientsController: FetchAllIngredientsController) {}

  public lambdaHandler = async (): Promise<APIGatewayProxyResult> => {
    const ingredients = await this.fetchAllIngredientsController.handle();

    return { statusCode: 200, body: JSON.stringify(ingredients) } as APIGatewayProxyResult;
  };
}

const ingredientRepository = new PrismaIngredientsRepository();
const getAllIngredientsUseCase = new FetchAllIngredientsUseCase(ingredientRepository);
const getAllIngredientsController = new FetchAllIngredientsController(getAllIngredientsUseCase);

export const fetchAllIngredientsHandler = new FetchAllIngredientsHandler(getAllIngredientsController).lambdaHandler;
