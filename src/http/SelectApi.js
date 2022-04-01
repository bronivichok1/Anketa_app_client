import { $host } from ".";

export const fetchSelects = async (selects) => {
    const {data} = await $host.post('/select_name/find', selects);
    return data;
}

export const fetchSelectsAll = async () => {
    const {data} = await $host.get('/select_name');
    return data;
}
