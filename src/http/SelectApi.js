import { $host } from ".";

export const fetchSelects = async (selects) => {
    const {data} = await $host.post('/select_name/find', selects);
    return data;
}

export const fetchSelectsAll = async () => {
    const {data} = await $host.get('/select_name');
    return data;
}

export const updateSelect = async (id, sel) => {
    const {data} = await $host.put('/select_name/' + id, sel);
    return data;
}

export const fetchOneSelect = async (id) => {
    const {data} = await $host.get('/select_name/' + id);
    return data;
}

export const deleteSelect = async (id) => {
    const {data} = await $host.delete('/select_name/' + id);
    return data;
}

export const createSelect = async (sel) => {
    const {data} = await $host.post('/select_name', sel);
    return data;
}