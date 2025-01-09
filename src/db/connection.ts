import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { isTestEnv } from '../utils';
import * as entities from './entities';
import * as migrations from './migrations';

export class Connection {
    private static instance: Connection;
    /** Database connection instance */
    public db!: DataSource;

    constructor() {}

    public static getInstance(): Connection {
        if (!Connection.instance) {
            Connection.instance = new Connection();
            Connection.instance.db = new DataSource({
                type: 'mysql',
                host: process.env.HOST_DB_CONTAINER ?? process.env.HOST_DB,
                port: Number(process.env.PORT_DB ?? '3306'),
                username: process.env.USER_DB,
                password: process.env.PASS_DB,
                database: process.env.DB,
                entities,
                migrations,
                synchronize: isTestEnv(),
                logging: false,
                namingStrategy: new SnakeNamingStrategy(),
                poolSize: 3
            });
        }

        return Connection.instance;
    }

    /** Init the databse connection */
    public connectToDatabase = async () => {
        try {
            await this.db.initialize();
            console.info('Database connected');
        } catch (error) {
            console.error('Database not connected, failed', error);
        }
    };

    /** Close the databse connection */
    public closeConnection = async () => {
        try {
            await this.db.destroy();
            console.info('Database closed');
        } catch (error) {
            console.error('Database not connected, failed', error);
        }
    };

    /** Restore DB for test */
    public restoreDBForTest = async () => {
        if (!isTestEnv()) throw new Error('Only available in test ENV');
        const entities = this.db.entityMetadatas;

        // Delete each entity's table rows
        for (const entity of entities) {
            const repository = this.db.getRepository(entity.name);
            try {
                await repository.query(`DELETE FROM ${entity.tableNameWithoutPrefix};`);
            } catch (e) {
                console.error(`Error while clearing the table ${entity.tableNameWithoutPrefix}`, e);
                throw e;
            }
        }
    };
}

export default Connection.getInstance().db;
