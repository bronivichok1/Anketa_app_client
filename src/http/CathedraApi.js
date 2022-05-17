import { $authHost, $host } from ".";

export const fetchCathedras = async () => {
    const {data} = await $host.get('/cathedra');
    return data;
}

export const fetchOneCathedra = async (id) => {
    const {data} = await $host.get('/cathedra/' + id);
    return data;
}

export const createCathedra = async (cath) => {
    const {data} = await $authHost.post('/cathedra', cath);
    return data;
}

export const deleteCathedra = async (id) => {
    const {data} = await $authHost.delete('/cathedra/' + id);
    return data;
}

export const updateCathedra = async (id, cath) => {
    const {data} = await $authHost.put('/cathedra/' + id, cath);
    return data;
}
