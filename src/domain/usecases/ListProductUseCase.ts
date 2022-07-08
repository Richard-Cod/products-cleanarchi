import { IListProductsUseCase } from './../interfaces/usecases/IListProductsUseCase';
import { Product } from '../entities/Product';
import { IProductRepository } from './../interfaces/repositories/IProductRepository';

export class ListProductUseCase implements IListProductsUseCase{
    productRepository : IProductRepository

    constructor(repository : IProductRepository){
        this.productRepository = repository
    }
    async execute(): Promise<Product[]> {
        const result = this.productRepository.list()
        return result
    }
}
