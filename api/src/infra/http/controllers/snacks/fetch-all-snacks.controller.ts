import { z } from 'zod'
import { FetchAllSnacksUseCase } from '../../../../domain/use-cases/snacks/fetch-all-snacks'
import { SnackDetailsPresenter } from '../../presenters/snack-details-presenter'
import { BadRequest } from 'http-responses-ts'

const fetchAllSnacksSchema = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
})

export type FetchAllSnacksSchema = z.infer<typeof fetchAllSnacksSchema>

export class FetchAllSnacksController {
  constructor(private fetchAllSnacks: FetchAllSnacksUseCase) {}

  async handle({ page, pageSize }: FetchAllSnacksSchema) {
    const result = await this.fetchAllSnacks.execute({ page, pageSize })

    if (result.isLeft()) {
      throw new BadRequest()
    }

    const snacks = result.value.snacks

    const httpSnacks = {
      ...snacks,
      data: snacks.data.map(SnackDetailsPresenter.toHTTP),
    }

    return httpSnacks
  }
}
