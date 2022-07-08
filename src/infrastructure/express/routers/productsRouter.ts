import { AddProductUseCase } from './../../../domain/usecases/AddProductUseCase';
import { IAddProductUseCase } from './../../../domain/interfaces/usecases/IAddProductUseCase';
import { Product } from './../../../domain/entities/Product';
import { Request, Response } from "express";

const express = require('express');
const router = express.Router();

// UseCase

export const getProductRouter = (addProductUseCase : IAddProductUseCase) => {

    // define the home page route
    router.get('/', function(req : Request, res : Response) {
    
        res.send('products');
    });

    
    router.post('/', async function(req : Request, res : Response) {
        try {
            const product : Product = {price: 2,name:"name",description:"description"}
        
            const result = await addProductUseCase.execute(product)

            res.status(200).send({success: result , product});
            
        } catch (error) {
            
        }
    });

    return router
}


