import { makeAutoObservable } from "mobx";

export default class ReportStore {
    constructor() {
        this._reports = []
       
        makeAutoObservable(this);
    }

    setReports(reports) {
        this._reports = reports;
    }

    get reports() {
        return this._reports;
    }
    
}