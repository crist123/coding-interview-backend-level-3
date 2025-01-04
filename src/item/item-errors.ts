import { IRequestError } from '../helpers/applicationError';

const domain = 'Item';

export const ItemErrors = {
    ITEM_NOT_FOUND: (): IRequestError => ({
        code: '001',
        httpCode: 404,
        description: `The item desired not found in system`,
        domain,
        details: null,
    }),
};
