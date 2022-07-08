import { ListProductUseCase } from './../../../domain/usecases/ListProductUseCase';
import { Product } from '../../../domain/entities/Product';
import { IProductRepository } from './../../../domain/interfaces/repositories/IProductRepository';
import { MockProductRepository } from './utils/MockProductRepository';

describe("Get All Products Use Case", () => {

    let mockProductRepository: IProductRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockProductRepository = new MockProductRepository()
    })

    test("should return data", async () => {
        const ExpectedResult = [{
            "price": 2,
            "name": "name",
            "description": "description"
        }]

        jest.spyOn(mockProductRepository, "list").mockImplementation(() => Promise.resolve(ExpectedResult))
        const listProductsUseCase = new ListProductUseCase(mockProductRepository)

        const result = await listProductsUseCase.execute();
        expect(result).toStrictEqual(ExpectedResult)

    });

})