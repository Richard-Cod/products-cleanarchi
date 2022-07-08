import { getProductRouter } from './../../infrastructure/express/routers/productsRouter';
import { IAddProductUseCase } from './../../domain/interfaces/usecases/IAddProductUseCase';
import { IListProductsUseCase } from './../../domain/interfaces/usecases/IListProductsUseCase';
import request from "supertest";
import server from "../../infrastructure/express/server";
import { Product } from '../../domain/entities/Product';

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
        server.use("/contact", getProductRouter(mockAddProductsUseCase, mockListProductsUseCase))
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe("GET /contact", () => {

        test("should return 200 with data", async () => {
            const ExpectedData = [{
                "price": 2,
                "name": "name",
                "description": "description"
            }];

            jest.spyOn(mockListProductsUseCase, "execute").mockImplementation(() => Promise.resolve(ExpectedData))

            const response = await request(server).get("/contact")

            expect(response.status).toBe(200)
            expect(mockListProductsUseCase.execute).toBeCalledTimes(1)
            expect(response.body).toStrictEqual(ExpectedData)

        });

        // test("GET /contact returns 500 on use case error", async () => {
        //     jest.spyOn(mockGetAllContactsUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
        //     const response = await request(server).get("/contact")
        //     expect(response.status).toBe(500)
        //     expect(response.body).toStrictEqual({ message: "Error fetching data" })
        // });
    })

    describe("POST /contact", () => {

        test("POST /contact", async () => {
            const InputData = {
                "price": 2,
                "name": "name",
                "description": "description"
            }
            jest.spyOn(mockAddProductsUseCase, "execute").mockImplementation(() => Promise.resolve(true))
            const response = await request(server).post("/contact").send(InputData)
            expect(response.status).toBe(201)
            expect(response.body.success).toBe(true)
        });

        // test("POST /contact returns 500 on use case error", async () => {
        //     const InputData = { id: "1", surname: "Smith", firstName: "John", email: "john@gmail.com" }
        //     jest.spyOn(mockCreateContactUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
        //     const response = await request(server).post("/contact").send(InputData)
        //     expect(response.status).toBe(500)
        // });
    })

})