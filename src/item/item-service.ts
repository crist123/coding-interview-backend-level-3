import { EntityManager } from 'typeorm';
import { Item } from '../entities/Item';
import { ApplicationError } from '../helpers/applicationError';
import { ItemErrors } from './item-errors';
import { ItemCreationPayload, ItemResponse, ItemUpdatePayload } from './item-types';

/**
 * Mapper the stored item into the appropriate format for the response
 * @param {Item} itemData Database item information
 * @returns {ItemResponse} correct response EP
 */
const mapItemResponse = (itemData: Item): ItemResponse => {
    return {
        id: Number(itemData.id),
        name: itemData.name,
        price: itemData.price,
    };
};

/**
 * Get all items from database
 * @param {EntityManager} manager Database manager
 * @returns {ItemResponse[]} List of items
 */
export const getAllItems = async (manager: EntityManager): Promise<ItemResponse[]> => {
    const items = await manager.find(Item);
    return items.map(item => mapItemResponse(item));
};

/**
 * Get one item from database that corresponds to the id you want to query
 * @param {number} itemId Item identification
 * @param {EntityManager} manager Database manager
 * @returns {ItemResponse} Item desired
 */
export const getOneItem = async (itemId: number, manager: EntityManager): Promise<ItemResponse> => {
    const item = await manager.findOne(Item, { where: { id: itemId } });

    // If item not found
    if (!item) throw new ApplicationError(ItemErrors.ITEM_NOT_FOUND());

    return mapItemResponse(item);
};

/**
 * Create a new item with the information provided in the EP
 * @param {ItemCreationPayload} payload Information for create the item
 * @param {EntityManager} manager Database manager
 * @returns {ItemResponse} Item created
 */
export const addNewItem = async (payload: ItemCreationPayload, manager: EntityManager): Promise<ItemResponse> => {
    const itemToSave = new Item({
        name: payload.name,
        price: payload.price,
    });

    const infoSaved = await manager.save(itemToSave);
    return mapItemResponse(infoSaved);
};

/**
 * Update a item with the information provided in the EP
 * @param {ItemUpdatePayload} payload Data to update
 * @param {EntityManager} manager Database manager
 * @returns {ItemResponse} Item with update information
 */
export const updateItem = async (payload: ItemUpdatePayload, manager: EntityManager): Promise<ItemResponse> => {
    const item = await manager.findOne(Item, { where: { id: payload.id } });

    // If item not found
    if (!item) throw new ApplicationError(ItemErrors.ITEM_NOT_FOUND());

    await manager.update(Item, { id: payload.id }, payload);
    Object.assign(item, payload);

    return mapItemResponse(item!);
};

/**
 * Remove one item from database that corresponds to the id passed
 * @param {number} itemId Item identification
 * @param {EntityManager} manager Database manager
 */
export const deleteItem = async (itemId: number, manager: EntityManager): Promise<void> => {
    const item = await manager.findOne(Item, { where: { id: itemId } });

    // If item not found
    if (!item) throw new ApplicationError(ItemErrors.ITEM_NOT_FOUND());

    await manager.delete(Item, { id: itemId });
};
