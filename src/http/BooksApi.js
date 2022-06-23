import { $host } from ".";

export const fetchBooks = async () => {
    const {data} = await $host.get('/books');
    return data;
}

export const updateBook = async (id, book) => {
    const {data} = await $host.put('/books/' + id, book);
    return data;
}

export const fetchOneBook = async (id) => {
    const {data} = await $host.get('/books/' + id);
    return data;
}

export const deleteBook = async (id) => {
    const {data} = await $host.delete('/books/' + id);
    return data;
}

export const createBook = async (book) => {
    const {data} = await $host.post('/books', book);
    return data;
}

export const getBooksByReport = async (id) => {
    const {data} = await $host.get('/books/report/' + id);
    return data;
}

export const deleteBookByReport = async (id) => {
    const {data} = await $host.delete('/books/report/' + id);
    return data;
}