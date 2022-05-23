import { $host } from ".";

export const createCathReport = async (report) => {
    const {data} = await $host.post('/cathReport', report);
    return data;
}

export const findCathReports = async (userId) => {
    const {data} = await $host.get('/cathReport/' + userId);
    return data;
}

export const findCathStavka = async (itemId) => {
    const {data} = await $host.get('/cathReport/stav/' + itemId);
    return data;
}

export const updateCathReport = async (id, rep) => {
    const {data} = await $host.put('/cathReport/' + id, rep);
    return data;
}

export const deleteCathReport = async (id) => {
    const {data} = await $host.delete('/cathReport/' + id);
    return data;
}

export const deleteCathReportOne = async (id) => {
    const {data} = await $host.delete('/cathReport/one/' + id);
    return data;
}

export const createObj = async (cathId) => {
    const {data} = await $host.post('/cathReport/count', cathId);
    return data;
}

export const getCathReportsByResult = async (cathResultId) => {
    const {data} = await $host.get('/cathReport/result/' + cathResultId);
    return data;
}

export const deleteCathReportByRes = async (id) => {
    const {data} = await $host.delete('/cathReport/res/' + id);
    return data;
}

export const countCathReport = async (items) => {
    const {data} = await $host.post('/cathReport/countReps', items);
    return data;
}

export const updateCathReportFunc = async (obj) => {
    const {data} = await $host.post('/cathReport/update', obj);
    return data;
}
