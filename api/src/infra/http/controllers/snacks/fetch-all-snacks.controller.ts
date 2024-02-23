import { FetchAllSnacksUseCase } from '../../../../domain/use-cases/snacks/fetch-all-snacks';
import { SnackPresenter } from '../../presenters/snack-presenter';
import { BadRequest } from 'http-responses-ts';

export class FetchAllSnacksController {
  constructor(private createSnack: FetchAllSnacksUseCase) {}

  async handle() {
    const result = await this.createSnack.execute();

    if (result.isLeft()) {
      throw new BadRequest();
    }

    const snacks = result.value.snacks;

    return snacks.map(SnackPresenter.toHTTP);
  }
}
