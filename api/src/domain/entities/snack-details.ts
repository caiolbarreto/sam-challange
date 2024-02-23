import { UniqueEntityID } from '../../core/unique-entity-id';
import { ValueObject } from '../../core/value-object';
import { SnackIngredients } from './snack-ingredients';

export interface SnackDetailsProps {
  snackId: UniqueEntityID;
  name: string;
  description: string;
  price: number;
  snackIngredients: SnackIngredients[];
}

export class SnackDetails extends ValueObject<SnackDetailsProps> {
  get snackId() {
    return this.props.snackId;
  }

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

  static create(props: SnackDetailsProps) {
    return new SnackDetails(props);
  }
}
