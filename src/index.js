import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ItemStore from './store/ItemStore';
import UserStore from './store/UserStore';
import ReportStore from './store/ReportStore';
import CathedraStore from './store/CathedraStore';
import MassivStore from './store/MassivStore';
import CathReportStore from './store/CathReportStore';
import RatingStore from './store/RatingStore';

export const Context = createContext(null);

ReactDOM.render(
  <Context.Provider value={{
    user: new UserStore(),
    item: new ItemStore(),
    report: new ReportStore(),
    cathedra: new CathedraStore(),
    massiv: new MassivStore(),
    cath_report: new CathReportStore(),
    rating: new RatingStore(),
  }} >
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

