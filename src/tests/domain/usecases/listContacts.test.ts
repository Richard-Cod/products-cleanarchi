import { ListProductUseCase } from './../../../domain/usecases/ListProductUseCase';
import { Product } from '../../../domain/entities/Product';
import { IProductRepository } from './../../../domain/interfaces/repositories/IProductRepository';

describe("Get All Contacts Use Case", () => {
    class MockProductRepository implements IProductRepository {
        list(): Promise<Product[]> {
            throw new Error('Method not implemented.');
        }
        save(product: Product): Promise<boolean> {
            throw new Error('Method not implemented.');
        }
      
    }

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
        const getAllContactsUseCase = new ListProductUseCase(mockProductRepository)

        const result = await getAllContactsUseCase.execute();
        expect(result).toStrictEqual(ExpectedResult)

    });

})