import { $host } from ".";

export const fetchCathedras = async () => {
    const {data} = await $host.get('/cathedra');
    return data;
}

export const fetchOneCathedra = async (id) => {
    const {data} = await $host.get('/cathedra/' + id);
    return data;
}

