import { Entity } from '../../core/entity';
import { UniqueEntityID } from '../../core/unique-entity-id';
import { SnackIngredientsList } from './snack-ingredients-list';
import { Optional } from '../../core/types/optional';

export interface SnackProps {
  name: string;
  description: string;
  price: number;
  snackIngredients: SnackIngredientsList;
}

export class Snack extends Entity<SnackProps> {
  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get price() {
    return this.props.price;
  }

  get snackIngredients() {
    return this.props.snackIngredients;
  }

  set snackIngredients(snackIngredients: SnackIngredientsList) {
    this.props.snackIngredients = snackIngredients;
  }

  static create(props: Optional<SnackProps, 'snackIngredients'>, id?: UniqueEntityID) {
    const snack = new Snack(
      {
        ...props,
        snackIngredients: props.snackIngredients ?? new SnackIngredientsList(),
      },
      id,
    );

    return snack;
  }
}
