import { observer } from "mobx-react-lite";
import { useContext, useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { convertDate } from "../functions";
import { fetchOneResult } from "../http/ResultApi";
import edit from "./../imgs/edit_icon.svg";

const FindUser = observer(() => {
  const navigate = useNavigate();

  const { user } = useContext(Context);
  const { item } = useContext(Context);
  const [value, setValue] = useState("");

  const filteredUsers = useMemo(() => {
    return user.users.filter((us) => {
      return us.fullname.toLowerCase().includes(value.toLowerCase());
    });
  });

  useEffect(() => {
    if (user.users && user.users.length) {
      user.users.forEach((us) => {
        fetchOneResult(us.id).then((data) => {
          if (data === null) {
            user.setUsers([...user.users.filter((u) => u.id !== us.id)]);
          } else if (item.dateArr && item.dateArr.length) {
            const dates = convertDate(
              new Date(data.createdAt).toISOString()
            ).split(" ");
            console.log(dates[0]);

            if(!item.dateArr.includes(dates[0])) {
              user.setUsers([...user.users.filter((u) => u.id !== us.id)]);
            }
          }
        });
      });
    }
  }, [user.users, item.dateArr]);

  return (
    <Container>
      <div>
        <h4
          style={{
            textAlign: "center",
            marginTop: "3rem",
            marginBottom: "2rem",
          }}
        >
          Сотрудники
        </h4>

        {user.users && user.users.length ? (
          <Row>
            <Col md={4}></Col>
            <Col md={4}>
              <input
                placeholder="Поиск сотрудников..."
                className="search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
              />
            </Col>
            <Col md={4}></Col>
          </Row>
        ) : (
          <></>
        )}

        {user.users && user.users.length ? (
          filteredUsers.map((us) => (
            <Row className="us_item" key={us.id}>
              <Col md={11}>{us.fullname}</Col>
              <Col onClick={() => navigate(`/reports/${us.id}`)} md={1}>
                <img className="edit" src={edit} alt="" />
              </Col>
            </Row>
          ))
        ) : (
          <div>Сотрудники не найдены!</div>
        )}
      </div>
    </Container>
  );
});

export default FindUser;
