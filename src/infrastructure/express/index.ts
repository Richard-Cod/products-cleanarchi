import { InMemoryProductRepository } from './../../domain/repositories/InMemoryProductRepository';
import { AddProductUseCase } from './../../domain/usecases/AddProductUseCase';
import { getProductRouter } from './routers/productsRouter';
import { Request, Response } from "express"

const express = require('express')
const app = express()
const port = 3000


const repository = new InMemoryProductRepository()
const addProductUseCase = new AddProductUseCase(repository)
const productRouter = getProductRouter(addProductUseCase)

app.use('/api/products', productRouter );

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
  