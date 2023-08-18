import { $host } from "./index";

export const updateUserCathedras = async (id, cathedraIDs) => {
    const ids = JSON.stringify({cathedraIDs: cathedraIDs});
    const config = {
        headers: {'Content-Type': 'application/json'}
    };
    const {data} = await $host.put('/userCathedras/' + id, ids, config);
    return data;
}

export const fetchUserCathedras = async (id) => {
    const {data} = await $host.get('/userCathedras/' + id);
    return data;
}