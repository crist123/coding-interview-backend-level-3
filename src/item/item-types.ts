import J from 'joi';

/** Interface used for create a new item */
export interface ItemCreationPayload {
    name: string;
    price: number;
}

/** Interface used for update a item */
export interface ItemUpdatePayload {
    id: number;
    name: string;
    price: number;
}

/** Interface used to map the response related to an item */
export interface ItemResponse {
    id: number;
    name: string;
    price: number;
}

/** Joi schema to valid item payload */
export const JoiPayloadItemSchema = J.object({
    name: J.string().required(),
    price: J.number()
        .custom((value, helper) => {
            if (value < 0) return helper.message({ custom: '"price" cannot be negative' });
            return value;
        })
        .required(),
});
