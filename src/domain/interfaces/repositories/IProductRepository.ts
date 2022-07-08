import { Product } from './../../entities/Product';

export interface IProductRepository{
    list() : Promise<Product[]>
    save(product : Product) : Promise<boolean>
}