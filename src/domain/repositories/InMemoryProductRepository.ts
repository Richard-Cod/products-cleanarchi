import { Product } from '../entities/Product';
import { IProductRepository } from './../interfaces/repositories/IProductRepository';


export class InMemoryProductRepository implements IProductRepository {
    products : Product[]

    public constructor(){
        this.products = []
    }

    list(): Promise<Product[]> {
      console.log(this.products)

      const myPromise = new Promise<Product[]>((resolve, reject) => {
        setTimeout(() => {
          resolve(this.products);
        }, 300);
      });

      return myPromise
      
    }
    save(product: Product): Promise<boolean> {

        this.products.push(product)
        console.log(this.products)

        const myPromise = new Promise<boolean>((resolve, reject) => {
            setTimeout(() => {
              resolve(true);
            }, 300);
          });

          return myPromise
    }

}