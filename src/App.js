
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { Spinner } from 'react-bootstrap';
import { check } from './http/UserApi';

function App() {

  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    check().then( data => {
      user.setUser(data);
      user.setIsUserAuth(true);
      user.setIsAuth(data.role === 'ADMIN');
    }).finally( () => setLoading(false));
  }, [])

  if (loading) {
    return <Spinner animation={'grow'} />
  }
  
  return (
    
    <BrowserRouter className="App">
      <AppRouter/>
    </BrowserRouter>
    
  );
}

export default App;
