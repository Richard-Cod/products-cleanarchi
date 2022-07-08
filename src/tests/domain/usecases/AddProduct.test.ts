import { AddProductUseCase } from './../../../domain/usecases/AddProductUseCase';
import { ListProductUseCase } from '../../../domain/usecases/ListProductUseCase';
import { Product } from '../../../domain/entities/Product';
import { IProductRepository } from '../../../domain/interfaces/repositories/IProductRepository';
import { MockProductRepository } from './utils/MockProductRepository';

describe("Add one Product Use Case", () => {
    let mockProductRepository: IProductRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockProductRepository = new MockProductRepository()
    })

    test("should add product to datasource", async () => {
        const data = {
            "price": 2,
            "name": "name",
            "description": "description"
        }

        jest.spyOn(mockProductRepository, "save").mockImplementation(() => Promise.resolve(true))
        const addProductsUseCase = new AddProductUseCase(mockProductRepository)

        const result = await addProductsUseCase.execute(data);

        expect(result).toStrictEqual(true)

    });

})