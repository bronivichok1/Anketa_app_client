import { $host } from ".";

export const fetchFaculties = async () => {
    const {data} = await $host.get('/faculty');
    return data;
}

export const fetchOneFaculty = async (id) => {
    const {data} = await $host.get('/faculty/' + id);
    return data;
}

