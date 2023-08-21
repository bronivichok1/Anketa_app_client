import { makeAutoObservable } from "mobx";

export default class CathedraStore {
    constructor() {
        this._cathedras = [];
        this._types = [];
        this._values = [];
        this._faculties = [];
        this._open = false;
        makeAutoObservable(this);
    }

    setCathedras(cathedras) {
        this._cathedras = cathedras;
    }

    get cathedras() {
        return this._cathedras;
    }

    setTypes(types) {
        this._types = types;
    }

    get types() {
        return this._types;
    }

    typeNameById(id) {
        return this._types.map(t => t.id === id ? t.name : '')
    }

    setValues(values) {
        this._values = values;
    }

    get values() {
        return this._values;
    }

    valueNameById(id) {
        return this._values.map(t => t.id === id ? t.name : '')
    }

    setFaculties(faculties) {
        this._faculties = faculties;
    }

    get faculties() {
        return this._faculties;
    }

    facultyNameById(id) {
        return this._faculties.map(t => t.id === id ? t.name : '')
    }

    setOpen(bool) {
        this._open = bool;
    }

    get open() {
        return this._open;
    }


}