import { UniqueEntityID } from '../../core/unique-entity-id'
import { ValueObject } from '../../core/value-object'
import { OrderSnacks } from './order-snacks'

export interface OrderDetailsProps {
  orderId: UniqueEntityID
  date: Date
  orderSnacks: OrderSnacks[]
}

export class OrderDetails extends ValueObject<OrderDetailsProps> {
  get orderId() {
    return this.props.orderId
  }

  get date() {
    return this.props.date
  }

  get orderSnacks() {
    return this.props.orderSnacks
  }

  static create(props: OrderDetailsProps) {
    return new OrderDetails(props)
  }
}
