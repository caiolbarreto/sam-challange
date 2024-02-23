import { Either, right } from '../../../core/either';
import { UniqueEntityID } from '../../../core/unique-entity-id';
import { Order } from '../../entities/order';
import { OrderSnacks } from '../../entities/order-snacks';
import { OrderSnacksList } from '../../entities/order-snacks-list';
import { OrdersRepository } from '../../repositories/orders-repository';

interface OrderDetails {
  id: string;
  quantity: number;
}

interface CreateOrderUseCaseRequest {
  date: Date;
  orderDetails: OrderDetails[];
}

type CreateOrderUseCaseResponse = Either<
  null,
  {
    order: Order;
  }
>;

export class CreateOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({ date, orderDetails }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = Order.create({
      date,
    });

    const snacks = orderDetails.map((snack) => {
      return OrderSnacks.create({
        orderId: order.id,
        snackId: new UniqueEntityID(snack.id),
        quantity: snack.quantity,
      });
    });

    order.orderSnacks = new OrderSnacksList(snacks);

    await this.ordersRepository.create(order);

    return right({
      order,
    });
  }
}
