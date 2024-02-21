import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { CreateIngredientController } from '../../controllers/ingredients/create-ingredient.controller';
import { CreateIngredientUseCase } from '../../../../domain/use-cases/ingredients/create-ingredient';
import { PrismaIngredientsRepository } from '../../../database/repositories/prisma-ingredients-repository';

export class CreateIngredientHandler {
  constructor(private createIngredientController: CreateIngredientController) {}

  public lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const parsedBody = JSON.parse(event.body ?? '');

    await this.createIngredientController.handle(parsedBody);

    return { statusCode: 201 } as APIGatewayProxyResult;
  };
}

const ingredientRepository = new PrismaIngredientsRepository();
const createIngredientUseCase = new CreateIngredientUseCase(ingredientRepository);
const createIngredientController = new CreateIngredientController(createIngredientUseCase);

export const createIngredientHandler = new CreateIngredientHandler(createIngredientController).lambdaHandler;
