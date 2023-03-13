import { publicInstance } from './instances'

const collection = '/products'

export class ProductsService {
  static async findAll() {
    const products = (await publicInstance.get(collection)).data

    return products
  }
}
