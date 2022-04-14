import { $host } from ".";

export const createReportLocal = async (report) => {
    const {data} = await $host.post('/reportLocal', report);
    return data;
}

export const findReportsLocal = async (userId) => {
    const {data} = await $host.get('/reportLocal/' + userId);
    return data;
}

export const findStavkaLocal = async (itemId) => {
    const {data} = await $host.get('/reportLocal/stavka/' + itemId);
    return data;
}

export const updateReportLocal = async (id, rep) => {
    const {data} = await $host.put('/reportLocal/' + id, rep);
    return data;
}

export const deleteReportLocal = async (id) => {
    const {data} = await $host.delete('/reportLocal/' + id);
    return data;
}