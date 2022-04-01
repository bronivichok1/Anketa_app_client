import { $host, $authHost } from "./index";

export const createItem = async (item) => {
    const {data} = await $authHost.post('/item', item);
    return data;
}

export const fetchItems = async () => {
    const {data} = await $host.get('/item');
    return data;
}

