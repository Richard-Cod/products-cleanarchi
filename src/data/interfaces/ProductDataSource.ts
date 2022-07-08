import { Product } from './../../domain/entities/Product';
export interface IProductDataSource {
    create(product: Product): Promise<boolean>;
    getAll(): Promise<Product[]>;
}