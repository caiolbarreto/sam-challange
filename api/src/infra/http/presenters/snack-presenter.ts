import { Snack } from '../../../domain/entities/snack'

export class SnackPresenter {
  static toHTTP(snack: Snack) {
    return {
      id: snack.id.toString(),
      name: snack.name,
      description: snack.description,
      price: snack.price,
    }
  }
}
