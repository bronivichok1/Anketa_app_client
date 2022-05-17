import { makeAutoObservable } from "mobx";

export default class ReportStore {
    constructor() {
        this._reports = []
        this._results = [];
       
        makeAutoObservable(this);
    }

    setReports(reports) {
        this._reports = reports;
    }

    get reports() {
        return this._reports;
    }

    setResults(res) {
        this._results = res;
    }

    get results() {
        return this._results;
    }
    
}