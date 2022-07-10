import { NoSQLDatabaseWrapper } from './../../data/interfaces/NoSQLDatabaseWrapper';
import { MongoDBProductDataSource } from './../../data/datasources/MongoDBContactDataSource';
import { ProductRepositoryImpl } from '../../domain/repositories/ProductRepositoryImpl';
import { AddProductUseCase } from './../../domain/usecases/AddProductUseCase';
import { getProductRouter } from './routers/productsRouter';
import { Request, Response } from "express"
import { ListProductUseCase } from '../../domain/usecases/ListProductUseCase';
import server from './server';
import { InMemoryProductDataSource } from '../../data/datasources/InMemoryProductDataSource';

import { MongoClient } from 'mongodb'

// const productDataSource = new InMemoryProductDataSource()

(async () => {
    const uri = `mongodb+srv://richard:TvzmkE0GJER9BxA0@cluster0.plhk7.mongodb.net/?retryWrites=true&w=majority`;

    const client: MongoClient = new MongoClient(uri)
    await client.connect()
    const db = client.db("PRODUCTS_DB");

 
    const productDatabase: NoSQLDatabaseWrapper = {
        find: (query) => db.collection("products").find(query).toArray(),
        insertOne: (doc) => db.collection("products").insertOne(doc)
    }
    
    const productDataSource = new MongoDBProductDataSource(productDatabase)

    const productRepository = new ProductRepositoryImpl(productDataSource)

    const addProductUseCase = new AddProductUseCase(productRepository)
    const listProductUseCase = new ListProductUseCase(productRepository)

    const productRouter = getProductRouter(addProductUseCase , listProductUseCase)

    server.use('/api/products', productRouter );

    const port = 3000

    server.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })


})()




  