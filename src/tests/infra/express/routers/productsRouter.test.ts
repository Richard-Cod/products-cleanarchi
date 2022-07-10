import { getProductRouter } from '../../../../infrastructure/express/routers/productsRouter';
import { IAddProductUseCase } from '../../../../domain/interfaces/usecases/IAddProductUseCase';
import { IListProductsUseCase } from '../../../../domain/interfaces/usecases/IListProductsUseCase';
import request from "supertest";
import server from "../../../../infrastructure/express/server";
import { Product } from '../../../../domain/entities/Product';

class MockListProductsUseCase implements IListProductsUseCase {
    execute(): Promise<Product[]> {
        throw new Error('Method not implemented.');
    }
}
class MockAddProductsUseCase implements IAddProductUseCase {
    execute(product: Product): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}

describe("Products Router", () => {
    let mockListProductsUseCase: IListProductsUseCase;
    let mockAddProductsUseCase: IAddProductUseCase;

    beforeAll(() => {
        mockListProductsUseCase = new MockListProductsUseCase()
        mockAddProductsUseCase = new MockAddProductsUseCase()
        server.use("/api/products", getProductRouter(mockAddProductsUseCase, mockListProductsUseCase))
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe("GET /api/products", () => {

        test("should return 200 with data", async () => {
            const ExpectedData = [{
                "price": 2,
                "name": "name",
                "description": "description"
            }];

            jest.spyOn(mockListProductsUseCase, "execute").mockImplementation(() => Promise.resolve(ExpectedData))

            const response = await request(server).get("/api/products")

            expect(response.status).toBe(200)
            expect(mockListProductsUseCase.execute).toBeCalledTimes(1)
            expect(response.body).toStrictEqual(ExpectedData)

        });
    })

    describe("POST /api/products", () => {

        test("POST /api/products", async () => {
            const InputData = {
                "price": 2,
                "name": "namess",
                "description": "description"
            }
            jest.spyOn(mockAddProductsUseCase, "execute").mockImplementation(() => Promise.resolve(true))
            const response = await request(server).post("/api/products").send(InputData)
            expect(response.status).toBe(201)
            expect(response.body.success).toBe(true)
            expect(response.body.product).toStrictEqual(InputData)

        });

        
    })

})