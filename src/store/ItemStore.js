import { makeAutoObservable } from "mobx";

export default class ItemStore {
  constructor() {
    this._items = [];
    this._sym = 0;
    this._massiv = {};
    this._selects = [];
    this._stavka = '';

    makeAutoObservable(this);
  }

  setItems(items) {
    this._items = items;
  }

  get items() {
    return this._items;
  }

  setSym(sym) {
    this._sym = sym;
  }

  get sym() {
    return this._sym;
  }

  setMassiv(massiv) {
    this._massiv = massiv;
  }

  get massiv() {
    return this._massiv;
  }

  setSelects(selects) {
    this._selects = selects;
  }

  get selects() {
    return this._selects;
  }

  setStavka(stavka) {
    this._stavka = stavka;
  }

  get stavka() {
    return this._stavka;
  }

}
