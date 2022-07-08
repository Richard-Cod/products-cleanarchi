import { InMemoryProductDataSource } from './../../../data/datasources/InMemoryProductDataSource';


describe("InMemory DataSource", () => {
    beforeAll(async () => {
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("get ", async () => {
        const ds = new InMemoryProductDataSource();

        const p = {
            "price": 2,
            "name": "name",
            "description": "description"
        }
        ds.products.push(p)

        const result = await ds.getAll();
        expect(result).toStrictEqual([p])
    })


    test("create", async () => {
        const ds = new InMemoryProductDataSource();

        const p = {
            "price": 2,
            "name": "name",
            "description": "description"
        }

        const result = await ds.create(p);

        expect(result).toStrictEqual(true)
    })

})