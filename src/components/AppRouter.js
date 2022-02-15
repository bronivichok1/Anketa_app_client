import { useContext } from 'react';
import { Context } from '../index';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes, publicAuthRoutes } from '../routes';
import { LOGIN_ROUTE, REPORT_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';

const AppRouter = observer( () => {
    const {user} = useContext(Context);

    return(
        <Routes>
            { user.isAuth && authRoutes.map(({path, Component}) =>
               <Route key={path} path={path} element={Component} exact />
            )}
             { user.isUserAuth && publicAuthRoutes.map(({path, Component}) =>
               <Route key={path} path={path} element={Component} exact />
            )}
             {publicRoutes.map(({path, Component}) =>
               <Route key={path} path={path} element={Component} exact />
            )}
            {
                user.isUserAuth
                ? <Route path="*" element={<Navigate to ={REPORT_ROUTE} />}/>
                : <Route path="*" element={<Navigate to ={LOGIN_ROUTE} />}/>
            }
        </Routes>
    );
})


export default AppRouter;