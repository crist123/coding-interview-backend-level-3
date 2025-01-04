import Hapi from '@hapi/hapi';
import _ from 'lodash';
import { Connection } from './db/connection';
import { ApplicationError, ApplicationValidationError } from './helpers/applicationError';
import { defineItemRoutes } from './item/item-router';
import { isTestEnv } from './utils';

const getServer = () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 3000,
    });

    // Pre request
    server.ext({
        type: 'onRequest',
        method: function (request, h) {
            request.app.manager = Connection.getInstance().db.manager;
            return h.continue;
        },
    });

    // Post request
    server.ext({
        type: 'onPreResponse',
        method: function (request, h) {
            const response = (request.response as any).data;
            // If error is application error
            if (response instanceof ApplicationError) {
                console.error('Application error controled', response.description);
                return h.response(_.omit(response, ['httpCode'])).code(response.httpCode);
            }
            // If error is for validations
            if (response instanceof ApplicationValidationError) return h.response(response).code(400);
            return h.continue;
        },
    });

    defineItemRoutes(server);

    return server;
};

/** Initialize the server for test case */
export const initializeServer = async (): Promise<Hapi.Server> => {
    if (!isTestEnv()) throw new Error('Only available in test ENV');
    const server = getServer();
    await server.initialize();
    return server;
};

/** Start server with all configuration */
export const startServer = async (): Promise<Hapi.Server> => {
    // Init database
    await Connection.getInstance().connectToDatabase();

    // Init server
    const server = getServer();
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
    return server;
};
