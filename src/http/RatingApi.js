import { $host } from ".";

export const createRating = async (cathId) => {
    const {data} = await $host.post('/rating', cathId);
    return data;
}