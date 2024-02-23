import { Entity } from '../../core/entity';
import { UniqueEntityID } from '../../core/unique-entity-id';
import { OrderSnacksList } from './order-snacks-list';
import { Optional } from '../../core/types/optional';

export interface OrderProps {
  date: Date;
  orderSnacks: OrderSnacksList;
}

export class Order extends Entity<OrderProps> {
  get date() {
    return this.props.date;
  }

  get orderSnacks() {
    return this.props.orderSnacks;
  }

  set orderSnacks(orderSnacks: OrderSnacksList) {
    this.props.orderSnacks = orderSnacks;
  }

  static create(props: Optional<OrderProps, 'orderSnacks'>, id?: UniqueEntityID) {
    const order = new Order(
      {
        ...props,
        orderSnacks: props.orderSnacks ?? new OrderSnacksList(),
      },
      id,
    );

    return order;
  }
}
