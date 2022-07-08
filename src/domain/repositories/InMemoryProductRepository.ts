import { Product } from '../entities/Product';
import { IProductRepository } from './../interfaces/repositories/IProductRepository';


class InMemoryProductRepository implements IProductRepository {
    products : Product[]

    public constructor(){
        this.products = []
    }
    save(product: Product): Promise<boolean> {

        this.products.push(product)

        const myPromise = new Promise<boolean>((resolve, reject) => {
            setTimeout(() => {
              resolve(true);
            }, 300);
          });

          return myPromise
    }

}