import { makeAutoObservable } from "mobx";

export default class RatingStore {
    constructor() {
        this._rating = [];
        this._ratingTables = [];
        makeAutoObservable(this);
    }

    setRating(r) {
        this._rating = r;
    }

    get rating() {
        return this._rating;
    }

    setRatingTables(r) {
        this._ratingTables = r;
    }

    get ratingTables() {
        return this._ratingTables;
    }

}