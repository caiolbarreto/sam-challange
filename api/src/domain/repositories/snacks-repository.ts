import { Snack } from '../entities/snack'
import { SnackDetails } from '../entities/snack-details'

export interface PaginatedSnacks {
  data: SnackDetails[]
  meta: {
    pageIndex: number
    totalCount: number
    perPage: number
  }
}

export interface SnacksRepository {
  create(snack: Snack): Promise<void>
  findById(snackId: string): Promise<SnackDetails | null>
  findAll(page?: number, pageSize?: number): Promise<PaginatedSnacks>
  delete(snackId: string): Promise<void>
}
