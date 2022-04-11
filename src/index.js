import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ItemStore from './store/ItemStore';
import UserStore from './store/UserStore';
import ReportStore from './store/ReportStore';
import CathedraStore from './store/CathedraStore';
import MassivStore from './store/MassivStore';

export const Context = createContext(null);

ReactDOM.render(
  <Context.Provider value={{
    user: new UserStore(),
    item: new ItemStore(),
    report: new ReportStore(),
    cathedra: new CathedraStore(),
    massiv: new MassivStore(),
  }} >
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

