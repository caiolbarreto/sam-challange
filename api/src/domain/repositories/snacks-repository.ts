import { Snack } from '../entities/snack'
import { SnackDetails } from '../entities/snack-details'

export interface SnacksRepository {
  create(snack: Snack): Promise<void>
  findById(snackId: string): Promise<SnackDetails | null>
  findAll(): Promise<SnackDetails[]>
  delete(snackId: string): Promise<void>
}
