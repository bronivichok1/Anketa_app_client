import { $host } from ".";

export const createCathResult = async (result) => {
    const {data} = await $host.post('/cathResult', result);
    return data;
}

export const fetchCathResults = async (id) => {
    const {data} = await $host.get('/cathResult/' + id);
    return data;
}

export const updateCathResult = async (id, res) => {
    const {data} = await $host.put('/cathResult/' + id, res);
    return data;
}

export const deleteCathResult = async (id) => {
    const {data} = await $host.delete('/cathResult/' + id);
    return data;
}

export const fetchCathResultOwn = async (id) => {
    const {data} = await $host.get('/cathResult/own/' + id);
    return data;
}

export const fetchCathResultActive = async (id) => {
    const {data} = await $host.get('/cathResult/active/' + id);
    return data;
}

export const countResAgain = async (cath_result_id) => {
    const {data} = await $host.post('/cathResult/count', cath_result_id);
    return data;
}
