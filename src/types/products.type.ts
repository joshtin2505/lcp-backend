import type { Id } from './user.types'

export interface Product {
  name: string
  description: string
  category: Id
  price: number
  stock: number
  image: string
}
