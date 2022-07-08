import { Product } from '../entities/Product';
import { IProductRepository } from './../interfaces/repositories/IProductRepository';
import { IAddProductUseCase } from './../interfaces/usecases/IAddProductUseCase';

class AddProductUseCase implements IAddProductUseCase{
    productRepository : IProductRepository

    constructor(repository : IProductRepository){
        this.productRepository = repository
    }
    async execute(product: Product): Promise<boolean> {
        const result = await this.productRepository.save(product)
        return result
    }
}