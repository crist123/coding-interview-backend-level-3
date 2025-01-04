import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { startServer } from './server';
import { EntityManager } from 'typeorm';

process.on('unhandledRejection', err => {
    console.error(err);
    process.exit(1);
});

startServer();

/** Overloads the state of a request, adding additional properties that will be available for the lifetime of the request. */
declare module '@hapi/hapi' {
    interface RequestApplicationState {
        manager: EntityManager;
    }
}
