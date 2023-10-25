import { $authHost, $host } from "./index";
import jwt_decode from 'jwt-decode';

export const loginFunc = async (login, password) => {
    const {data} = await $host.post('/user/login', {login, password, role: 'USER'});
    localStorage.setItem('token', data.token);
    //return {...jwt_decode(data.token), name: data.name};
    return jwt_decode(data.token);
}

export const check = async () => {
    const {data} = await $authHost.get('/user/auth');
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
   //return {...jwt_decode(data.token), name: data.name};
}

export const updateUser = async (id, user) => {
    const {data} = await $host.put('/user/' + id, user);
    return data;
}

export const fetchOneUser = async (id) => {
    const {data} = await $host.get('/user/' + id);
    return data;
}

export const findUsers = async (cathedraId) => {
    const {data} = await $host.get('/user/find/' + cathedraId);
    return data;
}

export const findAdmins = async () => {
    const {data} = await $host.get('/user');
    return data;
}