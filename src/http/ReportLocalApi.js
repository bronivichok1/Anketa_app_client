import { $host } from ".";

export const createReportLocal = async (report) => {
    const { data } = await $host.post('/reportLocal', report);
    return data;
}

export const findReportsLocal = async (userId, cathedraId) => {
    const { data } = await $host.get('/reportLocal/' + userId + (cathedraId ? ("/" + cathedraId) : ""));
    return data;
}

export const findStavkaLocal = async (itemId) => {
    const { data } = await $host.get('/reportLocal/stavka/' + itemId);
    return data;
}

export const updateReportLocal = async (id, rep) => {
    const { data } = await $host.put('/reportLocal/' + id, rep);
    return data;
}

export const deleteReportLocal = async (userId, cathedraId) => {
    const { data } = await $host.delete('/reportLocal/' + userId + (cathedraId ? ("/" + cathedraId) : ""));
    return data;
}

export const deleteReportLocalOne = async (id) => {
    const { data } = await $host.delete('/reportLocal/one/' + id);
    return data;
}

export const checkReports = async (reportsAndItems) => {
    const { data } = await $host.post('/reportLocal/check', reportsAndItems);
    return data;
}

export const saveReportsLoc = async (obj) => {
    const { data } = await $host.post('/reportLocal/save', obj);
    return data;
}