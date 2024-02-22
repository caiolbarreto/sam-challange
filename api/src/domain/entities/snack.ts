import { Entity } from '../../core/entity';
import { UniqueEntityID } from '../../core/unique-entity-id';

export interface SnackProps {
  name: string;
  description: string;
  price: number;
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

  static create(props: SnackProps, id?: UniqueEntityID) {
    const snack = new Snack(props, id);

    return snack;
  }
}
