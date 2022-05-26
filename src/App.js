
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { Container, Spinner } from 'react-bootstrap';
import { check } from './http/UserApi';

function App() {

  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true);
  //const [firefox, setFirefox] = useState(false);

  useEffect( () => {
    check().then( data => {
      user.setUser(data);
      user.setIsUserAuth(true);
      user.setIsAuth(data.role === 'ADMIN');
    }).finally( () => setLoading(false));

    //setFirefox(navigator.userAgent.toLowerCase().indexOf('firefox') > -1);
  }, [])

  if (loading) {
    return <Spinner animation={'grow'} />
  }

  // if (firefox) {
  //   return <Container className='firefox' >
  //     <h2>Для входа в приложение, пожалуйста, используйте любой другой браузер!</h2>
  //   </Container>
  // }

  
  return (
    
    <BrowserRouter className="App">
      <AppRouter/>
    </BrowserRouter>
    
  );
}

export default App;
