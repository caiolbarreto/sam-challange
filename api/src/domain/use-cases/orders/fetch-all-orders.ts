import { Either, right } from '../../../core/either';
import { Order } from '../../entities/order';
import { OrdersRepository } from '../../repositories/orders-repository';

type FetchAllOrdersUseCaseResponse = Either<
  null,
  {
    orders: Order[];
  }
>;

export class FetchAllOrdersUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute(): Promise<FetchAllOrdersUseCaseResponse> {
    const orders = await this.ordersRepository.findAll();

    return right({
      orders,
    });
  }
}
