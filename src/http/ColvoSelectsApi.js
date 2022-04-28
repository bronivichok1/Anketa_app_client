import { $host } from ".";

export const fetchColvo = async (selects) => {
    const {data} = await $host.post('/colvo/find', selects);
    return data;
}

export const fetchColvoAll = async () => {
    const {data} = await $host.get('/colvo');
    return data;
}

export const updateColvo = async (id, sel) => {
    const {data} = await $host.put('/colvo/' + id, sel);
    return data;
}

export const fetchOneColvo = async (id) => {
    const {data} = await $host.get('/colvo/' + id);
    return data;
}

export const deleteColvo = async (id) => {
    const {data} = await $host.delete('/colvo/' + id);
    return data;
}

export const createColvo = async (sel) => {
    const {data} = await $host.post('/colvo', sel);
    return data;
}