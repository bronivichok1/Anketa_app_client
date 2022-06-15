import { $host } from ".";

export const fetchAuthors = async () => {
    const {data} = await $host.get('/authors');
    return data;
}

export const updateAuthor = async (id, auth) => {
    const {data} = await $host.put('/authors/' + id, auth);
    return data;
}

export const fetchOneAuthor = async (id) => {
    const {data} = await $host.get('/authors/' + id);
    return data;
}

export const deleteAuthor = async (id) => {
    const {data} = await $host.delete('/authors/' + id);
    return data;
}

export const createAuthor = async (author) => {
    const {data} = await $host.post('/authors', author);
    return data;
}