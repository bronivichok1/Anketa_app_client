import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Context } from "..";
import { findAdmins, updateUser } from "../http/UserApi";
import trash from "./../imgs/trash_icon.svg";

const { observer } = require("mobx-react-lite");

const AdminUsers = observer( () => {

    const {user} = useContext(Context);

    const [login, setLogin] = useState('');

    useEffect(() => {
        findAdmins().then(data => {
            user.setAdmins([...data.filter(adm => adm.role === "ADMIN")]);
            user.setUsers(data);
        })

    }, [])

    function createAdmin() {
        if(login) {
            user.users.forEach(adm => {
                if(adm.login.toLowerCase() === login.toLowerCase() + '@bsmu.by') {
                   updateUser(adm.id, {...adm, role: 'ADMIN'}).then(data => {
                    //    user.setAdmins([...user.admins, {...adm, role: 'ADMIN'}]);
                    window.location.reload();
                       setLogin('');

                   })
                }
            })
        }
    }

    function deleteAdmin(id) {
        user.admins.forEach(adm => {
            if(adm.id === id) {
                updateUser(adm.id, {...adm, role: "USER"}).then( data => {
                    user.setAdmins([...user.admins.filter(ad => ad.id !== id)])
                })
            }
        })
    }

    console.log(login)

    return(
        <Container style={{marginTop: '3rem'}} >
             <Row>
            <Col md={10}>
              <input
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="cusInput"
                type="text"
                placeholder="Введите логин администратора..."
              />
            </Col>
            <Col md={2}>
              <Button
              onClick={createAdmin}
                style={{ marginTop: "3px", width: "100%" }}
                variant="primary"
              >
                Добавить
              </Button>
            </Col>
          </Row>

          <div className="admHead">
          <Row>
            <Col md={11}>Администраторы</Col>
            <Col md={1}></Col>
          </Row>
        </div>

        {user.admins.map((adm) => (
          <div className="admItem" key={adm.id}>
            <Row>
              <Col md={11}>{adm.fullname}</Col>
              <Col md={1}>
                <img
                onClick={() => deleteAdmin(adm.id)}
                  style={{ height: "30px", cursor: "pointer" }}
                  src={trash}
                  alt=""
                />
              </Col>
            </Row>
          </div>
        ))}
        </Container>
    );
})

export default AdminUsers;