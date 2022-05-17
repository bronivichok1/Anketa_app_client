import { observer } from "mobx-react-lite";
import { useContext, useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import edit from "./../imgs/edit_icon.svg";
import moment from "moment";
moment().format();
moment.locale("ru");

const FindUser = observer(() => {
  const navigate = useNavigate();

  const { user } = useContext(Context);
  const { cathedra } = useContext(Context);
  const { dates } = useContext(Context);
  const [value, setValue] = useState("");
  const { report } = useContext(Context);

  const filteredResults = useMemo(() => {
   if(report.results) {
    return report.results.filter((us) => {
      return us.fullname ? us.fullname.toLowerCase().includes(value.toLowerCase()) : '';
    });
   }
  });

  useEffect(() => {

    if (report.results && report.results.length) {
      report.results.forEach((res) => {
        if (dates.startDate && dates.endDate) {
          if (
            !moment(res.createdAt).isBetween(
              dates.startDate,
              dates.endDate,
              undefined,
              "[]"
            )
          ) {
            report.setResults([...report.results.filter((u) => u.id !== res.id)]);
          }
        }
      });
    }
  }, [dates.startDate, dates.endDate, report.results]);

  function editUser(id) {
    if (
      moment(new Date()).isBetween(
        dates.dates.firstDate,
        dates.dates.lastDate,
        undefined,
        "[]"
      )
    ) {
      navigate(`/reports/${id}`);
    } else {
      alert(
        `Редактировать анкету можно только с ${moment(
          dates.dates.firstDate
        ).format("DD.MM.YYYY")} по ${moment(dates.dates.lastDate).format(
          "DD.MM.YYYY"
        )}!`
      );
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

      {report.results && report.results.length ? (
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

       {report.results && report.results.length ? (
          <>
            <Row
              style={{ marginBottom: "1rem", marginTop: "1rem" }}
              className="blankHead"
            >
              <Col md={4}>ФИО</Col>
              <Col md={4} >Дата создания анкеты</Col>
              <Col md={3} >Общий балл</Col>
            </Row>

            {cathedra.open || user.isAuth
              ? filteredResults.map((us) => (
                  <Row className="us_item" key={us.id}>
                    <Col md={4}>{us.fullname}</Col>
                    <Col md={4} >{moment(us.createdAt).format("DD.MM.YYYY h:mm:ss")}</Col>
                    <Col md={3} >{us.result}</Col>
                    <Col onClick={() => editUser(us.id)} md={1}>
                      <img className="edit" src={edit} alt="" />
                    </Col>
                  </Row>
                ))
              :
                report.results.map((us) => {
                  if (us.userId === user.user.id) {
                    return (
                      <Row key={us.id} className="us_item">
                        <Col md={4}>{us.fullname}</Col>
                        <Col md={4} >
                          {moment(us.createdAt).format("DD.MM.YYYY h:mm:ss")}
                        </Col>
                        <Col md={3} >{us.result}</Col>
                        <Col onClick={() => editUser(us.id)} md={1}>
                          <img className="edit" src={edit} alt="" />
                        </Col>
                      </Row>
                    );
                  }
                })}
          </>
        ) : (
          <div>Сотрудники не найдены!</div>
        )}
      </div>
    </Container>
  );
});

export default FindUser;
