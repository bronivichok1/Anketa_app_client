import { $authHost, $host } from "./index";
import jwt_decode from 'jwt-decode';

export const loginFunc = async (login, password) => {
    const {data} = await $host.post('/user/login', {login, password, role: 'ADMIN'});
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

