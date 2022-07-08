import { InMemoryProductRepository } from './../../domain/repositories/InMemoryProductRepository';
import { AddProductUseCase } from './../../domain/usecases/AddProductUseCase';
import { getProductRouter } from './routers/productsRouter';
import { Request, Response } from "express"
import { ListProductUseCase } from '../../domain/usecases/ListProductUseCase';
import server from './server';


const port = 3000

const productRepository = new InMemoryProductRepository()
const addProductUseCase = new AddProductUseCase(productRepository)
const listProductUseCase = new ListProductUseCase(productRepository)

const productRouter = getProductRouter(addProductUseCase , listProductUseCase)

server.use('/api/products', productRouter );

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
  