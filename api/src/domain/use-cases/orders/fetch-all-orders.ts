import { Either, right } from '../../../core/either';
import { OrderDetails } from '../../entities/order-details';
import { OrdersRepository } from '../../repositories/orders-repository';

type FetchAllOrdersUseCaseResponse = Either<
  null,
  {
    orders: OrderDetails[];
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
