import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { DeleteSnackController } from '../../controllers/snacks/delete-snack.controller'
import { DeleteSnackUseCase } from '../../../../domain/use-cases/snacks/delete-snack'
import { PrismaSnacksRepository } from '../../../database/repositories/prisma-snacks-repository'
import { PrismaSnackIngredientsRepository } from '../../../database/repositories/prisma-snack-ingredients-repository'

export class DeleteSnackHandler {
  constructor(private deleteSnackController: DeleteSnackController) {}

  public lambdaHandler = async (
    event: APIGatewayProxyEvent,
  ): Promise<APIGatewayProxyResult> => {
    const snackId = event.pathParameters?.id ?? ''

    await this.deleteSnackController.handle({ snackId })

    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        'Access-Control-Allow-Methods': 'DELETE',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: '',
    } as APIGatewayProxyResult
  }
}

const snackIngredientsRepository = new PrismaSnackIngredientsRepository()
const snackRepository = new PrismaSnacksRepository(snackIngredientsRepository)
const deleteSnackUseCase = new DeleteSnackUseCase(snackRepository)
const deleteSnackController = new DeleteSnackController(deleteSnackUseCase)

export const deleteSnackHandler = new DeleteSnackHandler(deleteSnackController)
  .lambdaHandler
