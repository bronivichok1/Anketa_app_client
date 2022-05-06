import { observer } from "mobx-react-lite";
import { useContext, useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { convertDate } from "../functions";
import { fetchOneResult } from "../http/ResultApi";
import edit from "./../imgs/edit_icon.svg";
import moment from 'moment';
moment().format(); 
moment.locale("ru");

const FindUser = observer(() => {
  const navigate = useNavigate();

  const { user } = useContext(Context);
  const { item } = useContext(Context);
  const { dates } = useContext(Context);
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
          } 
          else if (dates.startDate && dates.endDate) {
            if(!moment(data.createdAt).isBetween(dates.startDate, dates.endDate, undefined, '[]')) {
              user.setUsers([...user.users.filter((u) => u.id !== us.id)]);
            }
          }
        });
      });
    }
  }, [user.users, dates.startDate, dates.endDate]);

  function editUser(id) {
    if(moment(new Date()).isBetween(dates.dates.firstDate, dates.dates.lastDate, undefined, '[]')) {
      navigate(`/reports/${id}`);
    } else {
      alert(`Редактировать анкету можно только с ${moment(dates.dates.firstDate).format("DD.MM.YYYY")} по ${moment(dates.dates.lastDate).format("DD.MM.YYYY")}!`)
    }
  }

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
           <>
            <Row style={{marginBottom: '1rem', marginTop: '1rem'}} className="blankHead" >
            <Col md={5}>ФИО</Col>
            <Col>Дата создания анкеты</Col>

           </Row>
           
          {filteredUsers.map((us) => (
            <Row className="us_item" key={us.id}>
              <Col md={5}>{us.fullname}</Col>
              <Col >{moment(us.create).format("DD.MM.YYYY h:mm:ss")}</Col>
              <Col onClick={() => editUser(us.id)} md={1}>
                <img className="edit" src={edit} alt="" />
              </Col>
            </Row>
          ))}
           </>
        ) : (
          <div>Сотрудники не найдены!</div>
        )}
      </div>
    </Container>
  );
});

export default FindUser;
