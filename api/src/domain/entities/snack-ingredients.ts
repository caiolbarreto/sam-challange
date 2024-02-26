import { Entity } from '../../core/entity'
import { UniqueEntityID } from '../../core/unique-entity-id'

export interface SnackIngredientsProps {
  snackId: UniqueEntityID
  ingredientId: UniqueEntityID
  quantity: number
}

export class SnackIngredients extends Entity<SnackIngredientsProps> {
  get snackId() {
    return this.props.snackId
  }

  get ingredientId() {
    return this.props.ingredientId
  }

  get quantity() {
    return this.props.quantity
  }

  static create(props: SnackIngredientsProps, id?: UniqueEntityID) {
    const snackIngredients = new SnackIngredients(props, id)

    return snackIngredients
  }
}
