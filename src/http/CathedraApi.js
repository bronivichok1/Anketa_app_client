import { $host } from ".";

export const fetchCathedras = async () => {
    const {data} = await $host.get('/cathedra');
    return data;
}

export const fetchOneCathedra = async (id) => {
    const {data} = await $host.get('/cathedra/' + id);
    return data;
}

export const createCathedra = async (cath) => {
    const {data} = await $host.post('/cathedra', cath);
    return data;
}

export const deleteCathedra = async (id) => {
    const {data} = await $host.delete('/cathedra/' + id);
    return data;
}

export const updateCathedra = async (id, cath) => {
    const {data} = await $host.put('/cathedra/' + id, cath);
    return data;
}
