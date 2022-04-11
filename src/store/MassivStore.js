import { makeAutoObservable } from "mobx";

export default class MassivStore {
    constructor() {
        this._massiv = []
        this._deleted = []
       
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
    
}