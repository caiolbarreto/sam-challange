import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { FetchAllIngredientsController } from '../../controllers/ingredients/fetch-all-ingredients.controller'
import { FetchAllIngredientsUseCase } from '../../../../domain/use-cases/ingredients/fetch-all-ingredients'
import { PrismaIngredientsRepository } from '../../../database/repositories/prisma-ingredients-repository'

export class FetchAllIngredientsHandler {
  constructor(
    private fetchAllIngredientsController: FetchAllIngredientsController,
  ) {}

  public lambdaHandler = async (
    event: APIGatewayProxyEvent,
  ): Promise<APIGatewayProxyResult> => {
    const queryParams = JSON.stringify(event.queryStringParameters)
    const parsedParams = JSON.parse(queryParams)

    if (parsedParams) {
      parsedParams.page = Number(parsedParams.page)
      parsedParams.pageSize = Number(parsedParams.pageSize)
    }

    const ingredients = await this.fetchAllIngredientsController.handle(
      parsedParams ?? {},
    )

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify(ingredients),
    } as APIGatewayProxyResult
  }
}

const ingredientRepository = new PrismaIngredientsRepository()
const getAllIngredientsUseCase = new FetchAllIngredientsUseCase(
  ingredientRepository,
)
const getAllIngredientsController = new FetchAllIngredientsController(
  getAllIngredientsUseCase,
)

export const fetchAllIngredientsHandler = new FetchAllIngredientsHandler(
  getAllIngredientsController,
).lambdaHandler
