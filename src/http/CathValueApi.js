import { $host } from ".";

export const createCathValue = async (name) => {
    const {data} = await $host.post('/cathValue', {name: name});
    return data;
}

export const fetchCathValues = async () => {
    const {data} = await $host.get('/cathValue');
    return data;
}

export const fetchOneCathValue = async (id) => {
    const {data} = await $host.get('/cathValue/' + id);
    return data;
}