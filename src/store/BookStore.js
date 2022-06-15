import { makeAutoObservable } from "mobx";

export default class BookStore {
    constructor() {
        this._books = [];
        this._authors = [];
        this._bookReports = [];
        this._massivItems = [];
        makeAutoObservable(this);
    }

    setBooks(books) {
        this._books = books;
    }

    get books() {
        return this._books;
    }

    setMassivItems(i) {
        this._massivItems = i;
    }

    get massivItems() {
        return this._massivItems;
    }

    setBookReports(books) {
        this._bookReports = books;
    }

    get bookReports() {
        return this._bookReports;
    }


    setAuthors(a) {
        this._authors = a;
    }

    get authors() {
        return this._authors;
    }
}