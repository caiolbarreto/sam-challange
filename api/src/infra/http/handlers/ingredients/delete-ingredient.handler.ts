import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DeleteIngredientController } from '../../controllers/ingredients/delete-ingredient.controller';
import { DeleteIngredientUseCase } from '../../../../domain/use-cases/ingredients/delete-ingredient';
import { PrismaIngredientsRepository } from '../../../database/repositories/prisma-ingredients-repository';

export class DeleteIngredientHandler {
  constructor(private deleteIngredientController: DeleteIngredientController) {}

  public lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const ingredientId = event.pathParameters?.id ?? '';

    await this.deleteIngredientController.handle({ ingredientId });

    return { statusCode: 204 } as APIGatewayProxyResult;
  };
}

const ingredientRepository = new PrismaIngredientsRepository();
const deleteIngredientUseCase = new DeleteIngredientUseCase(ingredientRepository);
const deleteIngredientController = new DeleteIngredientController(deleteIngredientUseCase);

export const deleteIngredientHandler = new DeleteIngredientHandler(deleteIngredientController).lambdaHandler;
