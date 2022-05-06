import { makeAutoObservable } from "mobx";

export default class DatesStore {
    constructor() {
        this._dates = {};
        this._startDate = '';
        this._endDate = '';
        makeAutoObservable(this);
    }

    setDates(d) {
        this._dates = d;
    }

    get dates() {
        return this._dates;
    }

    setStartDate(d) {
        this._startDate = d;
    }

    get startDate() {
        return this._startDate;
    }

    setEndDate(d) {
        this._endDate = d;
    }

    get endDate() {
        return this._endDate;
    }


}