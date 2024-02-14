import { Entity } from '../core/entity';
import { UniqueEntityID } from '../core/unique-entity-id';

export interface IngredientProps {
  name: string;
  quantity: number;
}

export class Ingredient extends Entity<IngredientProps> {
  get name() {
    return this.props.name;
  }

  get quantity() {
    return this.props.quantity;
  }

  static create(props: IngredientProps, id?: UniqueEntityID) {
    const ingredient = new Ingredient(props, id);

    return ingredient;
  }
}
