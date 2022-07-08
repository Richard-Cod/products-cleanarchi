import { Product } from '../../domain/entities/Product';
import { IProductDataSource } from './../interfaces/ProductDataSource';

export class InMemoryProductDataSource implements IProductDataSource{

    products : Product[]

    public constructor(){
        this.products = []
    }

    create(product: Product): Promise<boolean> {
        this.products.push(product)
        return Promise.resolve(true)
    }
    getAll(): Promise<Product[]> {
        return Promise.resolve(this.products)
    }
    
}