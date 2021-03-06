import { ProductRepositoryImpl } from './../../../domain/repositories/ProductRepositoryImpl';
import { Product } from '../../../domain/entities/Product';
import { IProductDataSource } from './../../../data/interfaces/ProductDataSource';

class MockProductDataSource implements IProductDataSource {
    create(product: Product): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    getAll(): Promise<Product[]> {
        throw new Error('Method not implemented.');
    }
}

describe("Product Repository", () => {
    let mockProductDataSource: IProductDataSource;
    let productRepository: ProductRepositoryImpl

    beforeEach(() => {
        jest.clearAllMocks();
        mockProductDataSource = new MockProductDataSource()
        productRepository = new ProductRepositoryImpl(mockProductDataSource)
    })

    describe("getAllProducts", () => {
        test("should return data", async () => {
            const expectedData = [{
            "price": 2,
            "name": "name",
            "description": "description"
        }]
            jest.spyOn(mockProductDataSource, "getAll").mockImplementation(() => Promise.resolve(expectedData))

            const result = await productRepository.list();
            expect(result).toBe(expectedData)
        });
    })

    describe("createProdut", () => {
        test("should return true", async () => {
            const inputData : Product = {
            "price": 2,
            "name": "name",
            "description": "description"
        }
            jest.spyOn(mockProductDataSource, "create").mockImplementation((product:Product) => Promise.resolve(true))
            
            const result = await productRepository.save(inputData);
            expect(result).toBe(true)
        });
    })

})