import { makeAutoObservable } from "mobx";

export default class RatingStore {
    constructor() {
        this._rating = [];
        makeAutoObservable(this);
    }

    setRating(r) {
        this._rating = r;
    }

    get rating() {
        return this._rating;
    }

}