import { Product } from './../../entities/Product';

export interface IListProductsUseCase{
    execute() : Promise<Product[]>
}