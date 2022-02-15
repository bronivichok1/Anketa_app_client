import { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import {  useNavigate } from "react-router-dom";
import { REPORT_ROUTE } from "../utils/consts";

const Auth = observer(() => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmpty, setLoginEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const [loginError, setLoginError] = useState("Заполните это поле!");
  const [passwordError, setPasswordError] = useState("Заполните это поле!");

//   const { admin } = useContext(Context);
 const { user } = useContext(Context);

 const navigate = useNavigate();

//   useEffect(() => {
//     fetchAdmins().then((data) => admin.setAdmins(data));
//   }, []);

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "login":
        setLoginEmpty(true);
        break;
      case "password":
        setPasswordEmpty(true);
        break;
    }
  };

  useEffect(() => {
    if (!login) {
      setLoginError("Заполните это поле!");
    } else {
      setLoginError("");
    }
    if (!password) {
      setPasswordError("Заполните это поле!");
    } else {
      setPasswordError("");
    }
  }, [login, password]);

  useEffect(() => {
    if (loginError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [loginError, passwordError]);

  useEffect(() => {
    if (user.isUserAuth) {
      navigate(REPORT_ROUTE);
    }
  }, [user.isUserAuth])

//   const auth = async () => {
//       try {
//         let data;

//         data = await loginFunc(login + "@bsmu.by", password);

//         user.setIsAuth(true);
//         user.setUser(data);
//         navigate(COURSE_ROUTE);
//       } catch (e) {
//         alert(e.response.data.message);
//       }
//   };

  return (
    <div
    //   onKeyDown={(e) => {
    //     if (e.keyCode === 13) {
    //       auth();
    //     }
    //   }}
      className="auth_div"
    >
      <div className="auth" style={{position: 'relative', backgroundColor: 'white'}}>
        
        <h3 style={{textAlign: 'center'}}>Менеджмент качества работы</h3>
        <h4 style={{ textAlign: "center", color: '#0b5ed7', marginTop: "1rem" }}>
          Авторизация
        </h4>
        {loginEmpty && loginError && (
          <div style={{ color: "red" }}>{loginError}</div>
        )}
        <input
          onBlur={(e) => blurHandler(e)}
          name="login"
          onChange={(e) => setLogin(e.target.value)}
          value={login}
          type="text"
          placeholder="Введите логин..."
        />
        {passwordEmpty && passwordError && (
          <div style={{ color: "red" }}>{passwordError}</div>
        )}
        <input
          onBlur={(e) => blurHandler(e)}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Введите пароль..."
        />

        <Button
          className="button"
          disabled={!formValid}
        //   onClick={auth}
          variant="primary"
          style={{
            marginTop: "2rem",
            fontFamily: "Roboto",
            fontSize: "20px",
          }}
        >
          Войти
        </Button>
      </div>
    </div>
  );
});

export default Auth;