import { IProductDataSource } from './../../data/interfaces/ProductDataSource';
import { Product } from '../entities/Product';
import { IProductRepository } from '../interfaces/repositories/IProductRepository';


export class ProductRepositoryImpl implements IProductRepository {
    productDatasource : IProductDataSource

    public constructor(productDataSource : IProductDataSource){
        this.productDatasource = productDataSource
    }

    async list(): Promise<Product[]> {
      const result = await this.productDatasource.getAll()
      return result
    }
    async save(product: Product): Promise<boolean> {
      const result = await this.productDatasource.create(product)
      return result
    }

}