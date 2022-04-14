import { $host } from ".";

export const createMassivLocal = async (massiv) => {
    const {data} = await $host.post('/massivLocal', massiv);
    return data;
}

export const deleteMassivLocal = async (id) => {
    const {data} = await $host.delete('/massivLocal/' + id);
    return data;
}

export const fetchMassivLocal = async (id) => {
    const {data} = await $host.get('/massivLocal/' + id);
    return data;
}

export const updateMassivLocal = async (id, massiv) => {
    const {data} = await $host.put('/massivLocal/' + id, massiv);
    return data;
}

export const ownDeleteMassivLocal = async (id) => {
    const {data} = await $host.delete('/massivLocal/own/' + id);
    return data;
}
