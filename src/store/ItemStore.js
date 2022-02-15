import { makeAutoObservable } from "mobx";

export default class ItemStore {
    constructor() {
        this._items = [
            {id: 2, name: 'Выполнение педагогической нагрузки, запланированной по кафедре на отчетный период', num: '1.1', ball: 1, help: '', formula: 'ball*Сумма', type: 'Сумма',  parentId: 1},
            {id: 3, name: 'процент выполнения учебной нагрузки согласно индивидуальному плану', num: '1.1.1', ball: 1, help: 'Введите процент выполнения, количественный показатель без знака%', formula: 'ball*Ввод', type: 'Ввод данных', parentId: 2},
            {id: 4, name: 'УЧЕБНО-МЕТОДИЧЕСКАЯ РАБОТА', num: '2', ball: 20, help: 'ggjjg', formula: 'ball*Сумма', type: 'Сумма',  parentId: null},
            {id: 5, name: 'Выполнение педагогической нагрузки, запланированной по кафедре на отчетный период', num: '1.2', ball: 1, help: 'ghbdtn', formula: 'ball*Сумма', type: 'Список',  parentId: 1},
            {id: 6, name: 'Выполнение педагогической нагрузки, запланированной по кафедре на отчетный период', num: '2.2', ball: 1, help: '', formula: 'ball*Сумма', type: 'Массив данных',  parentId: 4},
            {id: 7, name: 'Выполнение педагогической нагрузки, запланированной по кафедре на отчетный период', num: '2.3', ball: 1, help: '', formula: 'ball*Сумма', type: 'Да/Нет',  parentId: 4},
            {id: 8, name: 'Выполнение педагогической нагрузки, запланированной по кафедре на отчетный период', num: '2.2.3', ball: 1, help: '', formula: 'ball*Сумма', type: 'Сумма',  parentId: 6},
            {id: 9, name: 'Выполнение педагогической нагрузки, запланированной по кафедре на отчетный период', num: '2.2.1', ball: 1, help: '', formula: 'ball*Сумма', type: 'Сумма',  parentId: 6},
            {id: 1, name: 'УЧЕБНАЯ РАБОТА', num: '1', ball: 1, help: 'учебная работа', formula: 'ball*Сумма', type: 'Сумма', parentId: null},
            {id: 10, name: 'Выполнение педагогической нагрузки, запланированной по кафедре на отчетный период', num: '2.2.3.1', ball: 1, help: '', formula: 'ball*Сумма', type: 'Сумма',  parentId: 8},
            {id: 11, name: 'Выполнение ', num: '0', ball: 1, help: '', formula: 'ball*Сумма', type: 'Сумма',  parentId: null},
            {id: 12, name: 'Выполнение ', num: '0.1', ball: 1, help: '', formula: 'ball*Сумма', type: 'Сумма',  parentId: 11},
            {id: 13, name: 'процент', num: '1.1.2', ball: 1, help: 'Введите ', formula: 'ball*Ввод', type: 'Ввод данных', parentId: 2},
        ]
       
        makeAutoObservable(this);
    }

    setItems(items) {
        this._items = items;
    }

    get items() {
        return this._items;
    }
    
}