import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ItemStore from './store/ItemStore';
import UserStore from './store/UserStore';
import ReportStore from './store/ReportStore';

export const Context = createContext(null);

ReactDOM.render(
  <Context.Provider value={{
    user: new UserStore(),
    item: new ItemStore(),
    report: new ReportStore(),
  }} >
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

