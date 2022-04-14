import { $host } from ".";

export const createMassiv = async (massiv) => {
    const {data} = await $host.post('/massiv', massiv);
    return data;
}

export const deleteMassiv = async (id) => {
    const {data} = await $host.delete('/massiv/' + id);
    return data;
}

export const fetchMassiv = async (id) => {
    const {data} = await $host.get('/massiv/' + id);
    return data;
}

export const updateMassiv = async (id, massiv) => {
    const {data} = await $host.put('/massiv/' + id, massiv);
    return data;
}

export const ownDeleteMassiv = async (id) => {
    const {data} = await $host.delete('/massiv/own/' + id);
    return data;
}
