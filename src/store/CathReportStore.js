import { makeAutoObservable } from "mobx";

export default class CathReportStore {
    constructor() {
        this._result = [];
        this._resultOne = {};
        this._reports = [];
        this._colvo = [];
        this._selects = [];
        makeAutoObservable(this);
    }

    setResult(res) {
        this._result = res;
    }

    get result() {
        return this._result;
    }

    setReports(rep) {
        this._reports = rep;
    }

    get reports() {
        return this._reports;
    }

    setColvo(col) {
        this._colvo = col;
    }

    get colvo() {
        return this._colvo;
    }

    setResultOne(col) {
        this._resultOne = col;
    }

    get resultOne() {
        return this._resultOne;
    }

    setSelects(sel) {
        this._selects = sel;
    }

    get selects() {
        return this._selects;
    }


}