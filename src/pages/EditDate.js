import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Context } from "..";
import AdminNavBar from "../components/AdminNavBar";
import Footer from "../components/Footer";
import { fetchDates, updateDates } from "../http/DatesApi";
import moment from 'moment';
moment().format(); 

const EditDate = observer(() => {

    const { dates } = useContext(Context);

    useEffect(() => {
        fetchDates().then(data => {
            dates.setDates(data[0]);
        })
    }, [])

    const saveDates = () => {
        updateDates(dates.dates.id, dates.dates).then(data => {
            window.location.reload();
        })
    }

    console.log(moment("2022-05-05 09:53:48.163+03").isBetween('2022-05-02', '2022-05-07', undefined, '[]'))

    return(
        <div className="wrapper" >
      <AdminNavBar />
      <div className="main" >
        <Container style={{ marginTop: "7rem" }}>
          <h2 style={{ textAlign: "center", color: "#0b5ed7" }}>
          Изменить дату заполнения и редактирования отчётов
          </h2>
        </Container>
        <main>
            <Container>
            <Row style={{marginTop: '6rem'}} >
            <Col md={2} >
                </Col>
                <Col md={1} >
                    <span className="span_date" >Начало:</span>
                </Col>
                <Col>
                    <input onChange={(e) => dates.setDates({...dates.dates, firstDate: e.target.value})} value={dates.dates.firstDate || ''} className="select" type="date" />
                </Col>
                <Col md={1} >
                </Col>
                <Col md={1} >
                   <span className="span_date" >Конец:</span>
                </Col>
                <Col>
                    <input onChange={(e) => dates.setDates({...dates.dates, lastDate: e.target.value})} value={dates.dates.lastDate || ''} className="select" type="date" />
                </Col>
                <Col md={2} >
                </Col>
            </Row>

            <Button onClick={saveDates} className="button_date" variant="primary"> Сохранить </Button>

            </Container>
        </main>
      </div>
      <Footer />
    </div>
    );
})

export default EditDate;