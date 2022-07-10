import { MongoDBProductDataSource } from './../../../data/datasources/MongoDBContactDataSource';
import { NoSQLDatabaseWrapper } from './../../../data/interfaces/NoSQLDatabaseWrapper';

describe("MongoDB DataSource", () => {
    let mockDatabase: NoSQLDatabaseWrapper
    beforeAll(async () => {
        mockDatabase = {
            find: jest.fn(),
            insertOne: jest.fn()
        }
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("getAll", async () => {
        const ds = new MongoDBProductDataSource(mockDatabase);
        const p = {
            "price": 2,
            "name": "name",
            "description": "description"
        }

        jest.spyOn(mockDatabase, "find").mockImplementation(() => Promise.resolve([p]))

        const result = await ds.getAll();

        expect(mockDatabase.find).toHaveBeenCalledWith({})
        expect(result).toStrictEqual([p])
    })


    test("create", async () => {
        const p = {
            "price": 2,
            "name": "name",
            "description": "description"
        }

        const ds = new MongoDBProductDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "insertOne").mockImplementation(() => Promise.resolve({ }))


        const result = await ds.create(p);
        expect(mockDatabase.insertOne).toHaveBeenCalledWith(p)
        expect(result).toStrictEqual(true)
    })

})