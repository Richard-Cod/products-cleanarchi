import { Product } from './../../entities/Product';

export interface IProductRepository{
    save(product : Product) : Promise<boolean>
}