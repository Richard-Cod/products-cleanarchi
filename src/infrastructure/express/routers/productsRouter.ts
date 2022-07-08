import { IListProductsUseCase } from './../../../domain/interfaces/usecases/IListProductsUseCase';
import { IAddProductUseCase } from './../../../domain/interfaces/usecases/IAddProductUseCase';
import { Product } from './../../../domain/entities/Product';
import { Request, Response } from "express";

const express = require('express');
const router = express.Router();

export const getProductRouter = (addProductUseCase : IAddProductUseCase ,
     listProductsUseCase : IListProductsUseCase) => {

    router.get('/', async function(req : Request, res : Response) {
    
        try {
            const products = await listProductsUseCase.execute()
            res.send(products);
        } catch (error) {
            res.status(500).send("something went wrong")
            
        }
    });

    
    router.post('/', async function(req : Request, res : Response) {
        try {
            const product : Product = {price: 2,name:"name",description:"description"}
        
            const result = await addProductUseCase.execute(product)

            res.status(200).send({success: result , product});
            
        } catch (error) {
            res.status(500).send("something went wrong")
        }
    });

    return router
}


