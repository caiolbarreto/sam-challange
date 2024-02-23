import { Entity } from '../../core/entity';
import { UniqueEntityID } from '../../core/unique-entity-id';

export interface OrderSnacksProps {
  orderId: UniqueEntityID;
  snackId: UniqueEntityID;
  quantity: number;
}

export class OrderSnacks extends Entity<OrderSnacksProps> {
  get orderId() {
    return this.props.orderId;
  }

  get snackId() {
    return this.props.snackId;
  }

  get quantity() {
    return this.props.quantity;
  }

  static create(props: OrderSnacksProps, id?: UniqueEntityID) {
    const orderSnacks = new OrderSnacks(props, id);

    return orderSnacks;
  }
}
