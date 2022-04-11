import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = true;
        this._isUserAuth = false;
        this._user = {};
        this._users = [];
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setIsUserAuth(bool) {
        this._isUserAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }

    get isAuth() {
        return this._isAuth;
    }

    get isUserAuth() {
        return this._isUserAuth;
    }

    get user() {
        return this._user;
    }

    get users() {
        return this._users;
    }

    setUsers(users) {
        this._users = users;
    }

}