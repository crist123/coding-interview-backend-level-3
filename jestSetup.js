const dotenv = require('dotenv');
dotenv.config({ path: '.test.env' });

const { Connection } = require('./dist/src/db/connection');

jest.retryTimes(0, { logErrorsBeforeRetry: true });

global.beforeAll(async () => {
    process.env.ENV = 'test';
    // Init test database
    await Connection.getInstance().connectToDatabase();
    // Clean all data for test
    await Connection.getInstance().restoreDBForTest();
});

global.beforeEach(() => {});

global.afterEach(async () => {
    jest.clearAllMocks();
});

global.afterAll(async () => {
    // Close connection
    await Connection.getInstance().closeConnection();
});
