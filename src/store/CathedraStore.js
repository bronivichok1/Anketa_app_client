import { makeAutoObservable } from "mobx";

export default class CathedraStore {
    constructor() {
        this._cathedras = [];
        makeAutoObservable(this);
    }

    setCathedras(cathedras) {
        this._cathedras = cathedras;
    }

    get cathedras() {
        return this._cathedras;
    }
    
}