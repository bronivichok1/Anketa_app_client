import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { Context } from "..";
import { fetchCathedras } from "../http/CathedraApi";
import { findAdmins } from "../http/UserApi";
import { createCathResponsible, deleteCathResponsible, fetchCathResponsibles } from "../http/CathResponsiblesApi";
import trash from "./../imgs/trash_icon.svg";

const EditCathUsers = observer(() => {
  const { cathedra } = useContext(Context);
  const { user } = useContext(Context);

  const [cathId, setCathId] = useState(0);
  const [login, setLogin] = useState("");
  const [cathResponsibles, setResponsibles] = useState([]);

  useEffect(() => {
    fetchCathedras().then((data) => {
      cathedra.setCathedras(data);
    });
    findAdmins().then((data) => {
      user.setUsers(data);
    });
    fetchCathResponsibles().then((data) => {
      setResponsibles(data);
    });
  }, []);

  const addUser = async () => {
    if (cathId && login) {
      const responsibles = cathResponsibles.filter((element) => element.cathedraId === cathId);
      if (responsibles.length < 2) {
        const condidate = await user.users.find(
          (us) => us.login.toLowerCase() === login.toLowerCase() + "@bsmu.by"
        );

        if (condidate) {
          createCathResponsible(cathId, condidate.id).then((data) => {
            window.location.reload();
          });
        } else {
          alert("Такого пользователя нет в базе данных сайта!");
        }
      } else {
        alert("Данная кафедра уже имеет " + responsibles.length + " ответственых");
      }
    }
  };

  const deleteFunc = async (id) => {
    if (id) {
      deleteCathResponsible(id).then((data) => {
        window.location.reload();
      })
    }
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <Container>
        <Row>
          <Col>
            <span style={{ fontFamily: "Roboto", fontSize: "19px" }}>
              Кафедра:
            </span>
            <select
              onChange={(e) => setCathId(parseInt(e.target.value))}
              value={cathId}
              className="select"
            >
              <option value=""></option>

              {cathedra.cathedras.map((cath) => (
                <option key={cath.id} value={cath.id}>
                  {cath.name}
                </option>
              ))}
            </select>
          </Col>
          <Col>
            <span style={{ fontFamily: "Roboto", fontSize: "19px" }}>
              Пользователь:
            </span>
            <Row>
              <Col md={9}>
                {" "}
                <input
                  placeholder="Введите логин пользователя..."
                  onChange={(e) => setLogin(e.target.value)}
                  value={login}
                  className="select"
                  type="text"
                />
              </Col>
              <Col>
                <Button onClick={addUser} variant="primary">
                  Добавить
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <div
          style={{
            paddingLeft: "12px",
            paddingRight: "12px",
            marginBottom: "1rem",
          }}
        >
          <Row style={{ marginTop: "3rem" }} className="blankHead">
            <Col md={5}>Кафедра</Col>
            <Col md={7}>Пользователь</Col>
          </Row>
        </div>

        {cathResponsibles.map((el) => {
          let cath = cathedra.cathedras.find((cath) => el.cathedraId === cath.id);
          let cathUser = user.users.find((user) => el.userId === user.id);
          if (cathUser && cath) {
            return (
              <div key={el.id} style={{ marginLeft: "12px", marginRight: "12px" }}>
                <Row className="us_item">
                  <Col md={5} >{cath.name}</Col>
                  <Col>{cathUser.fullname}</Col>
                  <Col md={1}>
                    <img
                      onClick={() => deleteFunc(el.id)}
                      style={{
                        height: "30px",
                        marginLeft: "30px",
                        cursor: "pointer",
                      }}
                      src={trash}
                      alt=""
                    />
                  </Col>
                </Row>
              </div>
            );
          }
        })}
      </Container>
    </div>
  );
});

export default EditCathUsers;
