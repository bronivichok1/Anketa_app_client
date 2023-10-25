import { $host } from ".";

export const createCathResponsible = async (cathedraId, userId) => {
    const {data} = await $host.post('/cathResponsibles', {cathedraId: cathedraId, userId: userId});
    return data;
}

export const deleteCathResponsible = async (userId) => {
    const {data} = await $host.delete('/cathResponsibles/' + userId);
    return data;
}

export const fetchCathResponsibles = async () => {
    const {data} = await $host.get('/cathResponsibles');
    return data;
}

export const fetchOneCathResponsible = async (userId) => {
    const {data} = await $host.get('/cathResponsibles/' + userId);
    return data;
}