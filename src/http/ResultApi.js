import { $host } from ".";

export const createResult = async (result) => {
    const {data} = await $host.post('/result', result);
    return data;
}

export const fetchOneResult = async (id) => {
    const {data} = await $host.get('/result/' + id);
    return data;
}

export const updateResult = async (id, res) => {
    const {data} = await $host.put('/result/' + id, res);
    return data;
}

export const deleteResult = async (id) => {
    const {data} = await $host.delete('/result/' + id);
    return data;
}

export const findByCathResult = async (cathId) => {
    const {data} = await $host.get('/result/cath/' + cathId);
    return data;
}
