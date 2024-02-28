import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { CreateSnackController } from '../../controllers/snacks/create-snack.controller'
import { CreateSnackUseCase } from '../../../../domain/use-cases/snacks/create-snack'
import { PrismaSnacksRepository } from '../../../database/repositories/prisma-snacks-repository'
import { PrismaSnackIngredientsRepository } from '../../../database/repositories/prisma-snack-ingredients-repository'

export class CreateSnackHandler {
  constructor(private createSnackController: CreateSnackController) {}

  public lambdaHandler = async (
    event: APIGatewayProxyEvent,
  ): Promise<APIGatewayProxyResult> => {
    const parsedBody = JSON.parse(event.body ?? '')

    await this.createSnackController.handle(parsedBody)

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: '',
    } as APIGatewayProxyResult
  }
}

const snackIngredientsRepository = new PrismaSnackIngredientsRepository()
const snackRepository = new PrismaSnacksRepository(snackIngredientsRepository)
const createSnackUseCase = new CreateSnackUseCase(snackRepository)
const createSnackController = new CreateSnackController(createSnackUseCase)

export const createSnackHandler = new CreateSnackHandler(createSnackController)
  .lambdaHandler
