import { APIGatewayProxyResult } from 'aws-lambda';
import { GetAllIngredientsController } from '../../controllers/ingredients/get-all-ingredients.controller';
import { GetAllIngredientsUseCase } from '../../../../domain/use-cases/ingredients/get-all-ingredients';
import { PrismaIngredientsRepository } from '../../../database/repositories/prisma-ingredients-repository';

export class GetAllIngredientsHandler {
  constructor(private getAllIngredientsController: GetAllIngredientsController) {}

  public lambdaHandler = async (): Promise<APIGatewayProxyResult> => {
    const ingredients = await this.getAllIngredientsController.handle();

    return { statusCode: 200, body: JSON.stringify(ingredients) } as APIGatewayProxyResult;
  };
}

const ingredientRepository = new PrismaIngredientsRepository();
const getAllIngredientsUseCase = new GetAllIngredientsUseCase(ingredientRepository);
const getAllIngredientsController = new GetAllIngredientsController(getAllIngredientsUseCase);

export const getAllIngredientsHandler = new GetAllIngredientsHandler(getAllIngredientsController).lambdaHandler;
