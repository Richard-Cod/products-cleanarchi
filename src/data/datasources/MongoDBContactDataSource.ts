import { NoSQLDatabaseWrapper } from './../interfaces/NoSQLDatabaseWrapper';
import { Product } from '../../domain/entities/Product';
import { IProductDataSource } from './../interfaces/ProductDataSource';

export class MongoDBProductDataSource implements IProductDataSource{
    private database: NoSQLDatabaseWrapper

    constructor(database : NoSQLDatabaseWrapper){
        this.database = database
    }
    
    async create(product: Product): Promise<boolean> {
        const result = await this.database.insertOne(product)
        return result !== null
    }
    async getAll(): Promise<Product[]> {
        const result = await this.database.find({})
        return result
    }
    
}