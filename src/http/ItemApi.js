
import { $host, $authHost } from "./index";

export const createItem = async (item) => {
    const {data} = await $authHost.post('/item', item);
    return data;
}

export const fetchItems = async () => {
    const {data} = await $host.get('/item');
    return data;
}

export const fetchOneItem = async (id) => {
    const {data} = await $host.get('/item/' + id);
    return data;
}

export const updateItem = async (id, item) => {
    const {data} = await $host.put('/item/' + id, item);
    return data;
}

export const deleteItem = async (id) => {
    const {data} = await $host.delete('/item/' + id);
    return data;
}

export const testItem = async (items) => {
    const {data} = await $authHost.post('/item/test', items);
    return data;
}

export const resItem = async (items) => {
    const {data} = await $authHost.post('/item/res', items);
    return data;
}

export const closeItem = async (items) => {
    const {data} = await $authHost.post('/item/close', items);
    return data;
}

