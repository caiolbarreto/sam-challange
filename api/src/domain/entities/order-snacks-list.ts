import { WatchedList } from '../../core/watched-list';
import { OrderSnacks } from './order-snacks';

export class OrderSnacksList extends WatchedList<OrderSnacks> {
  compareItems(a: OrderSnacks, b: OrderSnacks): boolean {
    return a.snackId.equals(b.snackId);
  }
}
