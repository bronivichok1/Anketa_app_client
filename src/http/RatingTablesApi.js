import { $host } from ".";

export const createTable = async (table) => {
    const {data} = await $host.post('/ratingTables', table);
    return data;
}

export const fetchOneTable = async (id) => {
    const {data} = await $host.get('/ratingTables/' + id);
    return data;
}

export const updateTable = async (id, table) => {
    const {data} = await $host.put('/ratingTables/' + id, table);
    return data;
}

export const deleteTable = async (id) => {
    const {data} = await $host.delete('/ratingTables/' + id);
    return data;
}

export const fetchTables = async () => {
    const {data} = await $host.get('/ratingTables');
    return data;
}

export const fetchTablesTrue = async () => {
    const {data} = await $host.get('/ratingTables/truee/');
    return data;
}
