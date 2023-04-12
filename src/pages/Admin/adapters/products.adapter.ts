import { publicInstance } from '@/tools'

const collection = '/products'

export class ProductsService {
  static async findAll() {
    const response = await publicInstance.get(collection)
    if (!response) return undefined

    const products = response.data

    return products
  }
}
