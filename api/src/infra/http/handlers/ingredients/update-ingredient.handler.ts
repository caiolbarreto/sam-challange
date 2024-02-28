import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateIngredientController } from '../../controllers/ingredients/update-ingredient.controller'
import { UpdateIngredientUseCase } from '../../../../domain/use-cases/ingredients/update-ingredient'
import { PrismaIngredientsRepository } from '../../../database/repositories/prisma-ingredients-repository'

export class UpdateIngredientHandler {
  constructor(private updateIngredientController: UpdateIngredientController) {}

  public lambdaHandler = async (
    event: APIGatewayProxyEvent,
  ): Promise<APIGatewayProxyResult> => {
    const ingredientId = event.pathParameters?.id ?? ''
    const parsedBody = JSON.parse(event.body ?? '')

    await this.updateIngredientController.handle({
      ingredientId,
      content: parsedBody,
    })

    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        'Access-Control-Allow-Methods': 'PATCH',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: '',
    } as APIGatewayProxyResult
  }
}

const ingredientRepository = new PrismaIngredientsRepository()
const updateIngredientUseCase = new UpdateIngredientUseCase(
  ingredientRepository,
)
const updateIngredientController = new UpdateIngredientController(
  updateIngredientUseCase,
)

export const updateIngredientHandler = new UpdateIngredientHandler(
  updateIngredientController,
).lambdaHandler
