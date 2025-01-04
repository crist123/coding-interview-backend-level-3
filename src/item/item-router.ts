import { Server } from '@hapi/hapi';
import J from 'joi';
import { ValidationHandlerMiddleware } from '../helpers/routerMiddleware';
import { addNewItem, deleteItem, getAllItems, getOneItem, updateItem } from './item-service';
import { ItemCreationPayload, ItemUpdatePayload, JoiPayloadItemSchema } from './item-types';

export const defineItemRoutes = (server: Server) => {
    server.route({
        method: 'GET',
        path: '/ping',
        handler: async (request, h) => {
            return {
                ok: true,
            };
        },
    });
    server.route({
        method: 'GET',
        path: '/items',
        handler: async (request, h) => {
            const { manager } = request.app;
            return await getAllItems(manager);
        },
    });
    server.route({
        method: 'GET',
        path: '/items/{id}',
        options: {
            validate: {
                params: J.object({ id: J.required() }),
                failAction: ValidationHandlerMiddleware,
            },
        },
        handler: async (request, h) => {
            const { manager } = request.app;
            return await getOneItem(request.params.id, manager);
        },
    });
    server.route({
        method: 'POST',
        path: '/items',
        options: {
            validate: {
                payload: JoiPayloadItemSchema,
                failAction: ValidationHandlerMiddleware,
            },
        },
        handler: async (request, h) => {
            const { manager } = request.app;
            const payload = request.payload as ItemCreationPayload;
            const response = await addNewItem(payload, manager);
            return h.response(response).code(201);
        },
    });
    server.route({
        method: 'PUT',
        path: '/items/{id}',
        options: {
            validate: {
                params: J.object({ id: J.required() }),
                payload: JoiPayloadItemSchema,
                failAction: ValidationHandlerMiddleware,
            },
        },
        handler: async (request, h) => {
            const { manager } = request.app;
            const payload = request.payload as ItemUpdatePayload;
            return await updateItem({ ...payload, id: request.params.id }, manager);
        },
    });
    server.route({
        method: 'DELETE',
        path: '/items/{id}',
        options: {
            validate: {
                params: J.object({ id: J.required() }),
                failAction: ValidationHandlerMiddleware,
            },
        },
        handler: async (request, h) => {
            const { manager } = request.app;
            await deleteItem(request.params.id, manager);
            return h.response().code(204);
        },
    });
};
