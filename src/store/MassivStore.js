import { makeAutoObservable } from "mobx";

export default class MassivStore {
    constructor() {
        this._massiv = []
        this._deleted = []
        this._massivLocal = []
        this._deletedLocal = []
       
        makeAutoObservable(this);
    }

    setMassiv(massiv) {
        this._massiv = massiv;
    }

    get massiv() {
        return this._massiv;
    }

    setDeleted(deleted) {
        this._deleted = deleted;
    }

    get deleted() {
        return this._deleted;
    }

    setMassivLocal(massiv) {
        this._massivLocal = massiv;
    }

    get massivLocal() {
        return this._massivLocal;
    }

    setDeletedLocal(deleted) {
        this._deletedLocal = deleted;
    }

    get deletedLocal() {
        return this._deletedLocal;
    }
    
}