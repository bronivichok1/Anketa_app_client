import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { Context } from "..";
import { fetchCathedras, updateCathedra } from "../http/CathedraApi";
import { findAdmins } from "../http/UserApi";
import trash from "./../imgs/trash_icon.svg";

const EditCathUsers = observer(() => {
  const { cathedra } = useContext(Context);
  const { user } = useContext(Context);

  const [cathVal, setCathVal] = useState("");
  const [cathId, setCathId] = useState(0);
  const [cath, setCath] = useState({});
  const [login, setLogin] = useState("");

  useEffect(() => {
    fetchCathedras().then((data) => {
      cathedra.setCathedras(data);
    });
    findAdmins().then((data) => {
      user.setUsers(data);
    });
  }, []);

  useEffect(() => {
    if (cathVal) {
      cathedra.cathedras.forEach((cath) => {
        if (cath.name === cathVal) {
          setCathId(cath.id);
          setCath(cath);
        }
      });
    }
  }, [cathVal]);

  const addUser = async () => {
    if (cathId && login) {
      const condidate = await user.users.find(
        (us) => us.login.toLowerCase() === login.toLowerCase() + "@bsmu.by"
      );

      if (condidate) {
        updateCathedra(cathId, {
          ...cath,
          user_id: condidate.id,
          user_name: condidate.fullname,
        }).then((data) => {
          window.location.reload();
        });
      } else {
        alert("Такого пользователя нет в базе данных сайта!");
      }
    }
  };

  const deleteFunc = async (id) => {

    const cath = await cathedra.cathedras.find(el => el.id === id);

    if (cath) {
        updateCathedra(id, {
            ...cath,
            user_id: null,
            user_name: null,
          }).then((data) => {
            window.location.reload();
          });
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
              onChange={(e) => setCathVal(e.target.value)}
              value={cathVal}
              className="select"
            >
              <option value=""></option>

              {cathedra.cathedras.map((cath) => (
                <option key={cath.id} value={cath.name}>
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

        {cathedra.cathedras.map((el) => {
          if (el.user_name) {
            return (
              <div key={el.id} style={{ marginLeft: "12px", marginRight: "12px" }}>
                <Row className="us_item">
                  <Col md={5} >{el.name}</Col>
                  <Col>{el.user_name}</Col>
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
