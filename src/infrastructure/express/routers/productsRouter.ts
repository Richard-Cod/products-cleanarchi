import { IListProductsUseCase } from './../../../domain/interfaces/usecases/IListProductsUseCase';
import { IAddProductUseCase } from './../../../domain/interfaces/usecases/IAddProductUseCase';
import { Product } from './../../../domain/entities/Product';
import { Request, Response } from "express";

const express = require('express');
const router = express.Router();

export const getProductRouter = (addProductUseCase : IAddProductUseCase ,
     listProductsUseCase : IListProductsUseCase) => {

    router.get('/', async function(req : Request, res : Response) {
            const products = await listProductsUseCase.execute()
            res.send(products);
    });

    
    router.post('/', async function(req : Request, res : Response) {
            const product : Product = req.body
            const result = await addProductUseCase.execute(product)
            res.status(201).send({success: result , product});
    });

    return router
}


