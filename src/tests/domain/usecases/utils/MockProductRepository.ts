import { Product } from "../../../../domain/entities/Product";
import { IProductRepository } from "../../../../domain/interfaces/repositories/IProductRepository";

export class MockProductRepository implements IProductRepository {
    list(): Promise<Product[]> {
        throw new Error('Method not implemented.');
    }
    save(product: Product): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
  
}