import { $host } from ".";

export const fetchCath_type = async () => {
    const {data} = await $host.get('/cath_type');
    return data;
}

export const fetchOneCath_type = async (id) => {
    const {data} = await $host.get('/cath_type/' + id);
    return data;
}

