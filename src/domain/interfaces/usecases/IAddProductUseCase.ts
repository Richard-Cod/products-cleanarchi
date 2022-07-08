import { Product } from './../../entities/Product';

export interface IAddProductUseCase{
    execute(product:Product) : Promise<boolean>
}