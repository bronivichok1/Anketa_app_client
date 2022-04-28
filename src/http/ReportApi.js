import { $host } from ".";

export const createReport = async (report) => {
    const {data} = await $host.post('/report', report);
    return data;
}

export const findReports = async (userId) => {
    const {data} = await $host.get('/report/' + userId);
    return data;
}

export const findStavka = async (itemId) => {
    const {data} = await $host.get('/report/stavka/' + itemId);
    return data;
}

export const updateReport = async (id, rep) => {
    const {data} = await $host.put('/report/' + id, rep);
    return data;
}

export const deleteReport = async (id) => {
    const {data} = await $host.delete('/report/' + id);
    return data;
}

export const deleteReportOne = async (id) => {
    const {data} = await $host.delete('/report/one/' + id);
    return data;
}

export const findByCathReport = async (cathId) => {
    const {data} = await $host.get('/report/cath/' + cathId);
    return data;
}
