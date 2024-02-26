import { z } from 'zod'
import { BadRequest, NotFound } from 'http-responses-ts'
import { DeleteSnackUseCase } from '../../../../domain/use-cases/snacks/delete-snack'

const deleteSnackBodySchema = z.object({
  snackId: z.string(),
})

export type DeleteSnackBodySchema = z.infer<typeof deleteSnackBodySchema>

export class DeleteSnackController {
  constructor(private deleteSnack: DeleteSnackUseCase) {}

  async handle(snack: DeleteSnackBodySchema) {
    deleteSnackBodySchema.parse(snack)

    const result = await this.deleteSnack.execute(snack)

    if (result.isLeft()) {
      const error = result.value
      switch (error.statusCode) {
        case 404:
          throw new NotFound(error.message)
        default:
          throw new BadRequest(error.message)
      }
    }
  }
}
