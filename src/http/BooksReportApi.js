import { $host } from ".";

export const fetchBookReports = async () => {
    const {data} = await $host.get('/book_report');
    return data;
}

export const fetchOneBookReport = async (id) => {
    const {data} = await $host.get('/book_report/' + id);
    return data;
}

export const deleteBookReport = async (id) => {
    const {data} = await $host.delete('/book_report/' + id);
    return data;
}

export const createBookReport = async (book) => {
    const {data} = await $host.post('/book_report', book);
    return data;
}

export const fetchByCathBookReports = async (id) => {
    const {data} = await $host.get('/book_report/byCath/' + id);
    return data;
}

export const createBook = async (books) => {
    const {data} = await $host.post('/book_report/create', books);
    return data;
}

export const editBookApi = async (books) => {
    const {data} = await $host.post('/book_report/edit', books);
    return data;
}

export const getBooks = async (id) => {
    const {data} = await $host.get('/book_report/getBooks/' + id);
    return data;
}
