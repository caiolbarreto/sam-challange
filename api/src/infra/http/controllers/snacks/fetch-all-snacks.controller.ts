import { FetchAllSnacksUseCase } from '../../../../domain/use-cases/snacks/fetch-all-snacks';
import { SnackDetailsPresenter } from '../../presenters/snack-details-presenter';
import { BadRequest } from 'http-responses-ts';

export class FetchAllSnacksController {
  constructor(private fetchAllSnacks: FetchAllSnacksUseCase) {}

  async handle() {
    const result = await this.fetchAllSnacks.execute();

    if (result.isLeft()) {
      throw new BadRequest();
    }

    const snacks = result.value.snacks;

    return snacks.map(SnackDetailsPresenter.toHTTP);
  }
}
