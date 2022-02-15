import { makeAutoObservable } from "mobx";

export default class ReportStore {
    constructor() {
        this._reports = [
            {id: 1, user_id: 1, item_id: 1, value: 'yes', ball_value: 100, result_id: 1 }
        ]
       
        makeAutoObservable(this);
    }

    setReports(reports) {
        this._reports = reports;
    }

    get reports() {
        return this._reports;
    }
    
}