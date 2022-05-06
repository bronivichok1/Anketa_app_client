import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { Context } from "..";
import { convertDate } from "../functions";
import { fetchCathedras } from "../http/CathedraApi";
import { fetchCathResults } from "../http/CathResultApi";
import { createRating } from "../http/RatingApi";
import { findUsers } from "../http/UserApi";
import FindCathRating from "./FindCathRating";
import FindCathResult from "./FindCathResult";
import FindUser from "./FindUser";
import moment from 'moment';
import { fetchOneResult } from "../http/ResultApi";
import { fetchDates } from "../http/DatesApi";
moment().format(); 


const Filter = observer(() => {
  const { cathedra } = useContext(Context);
  const { user } = useContext(Context);
  const { cath_report } = useContext(Context);
  const { rating } = useContext(Context);
  const { item } = useContext(Context);
  const { dates } = useContext(Context);

  const [cathVal, setCathVal] = useState("");
  const [cathId, setCathId] = useState(0);
  const [type, setType] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const mobile = useMediaQuery({ query: '(max-width: 770px)' })

  useEffect(() => {
    fetchCathedras().then((data) => {
      cathedra.setCathedras(data);
    });
    fetchDates().then(data => {
      dates.setDates(data[0]);
    })
  }, []);

  useEffect(() => {
    if (cathVal) {
      cathedra.cathedras.forEach((cath) => {
        if (cath.name === cathVal) {
          setCathId(cath.id);
        }
      });
    }
  }, [cathVal]);

  useEffect(() => {
    if (cathId && type === "Индивидуальный отчёт") {
      findUsers(cathId).then(async (data) => {
       await user.setUsers(data);
       
       if(user.users && user.users.length) {
        user.users.forEach((us) => {
          fetchOneResult(us.id).then((data) => {
           if(data === null) {
            user.setUsers([...user.users.filter(u => u.id !== us.id)]);
           } else {
            user.setUsers([
              ...user.users.map((u) =>
                u.id === us.id
                  ? { ...u, res: data.result, create: data.createdAt}
                  : { ...u }
              ),
            ]);
           }
          
          });
        });
       }
      });
    
    }
  }, [cathId, type, dates.startDate, dates.endDate
  //  , item.dateArr
  ]);

  useEffect(async () => {
    if (cathId && type === "Кафедральный отчёт") {
      await fetchCathResults(cathId).then((data) => {

        if(startDate && endDate) {
          cath_report.setResult([...data.filter(el => moment(el.createdAt).isBetween(startDate, endDate, undefined, '[]'))]);
      } 
        else {
            cath_report.setResult(data);
        }
      });
    }
  }, [cathId, type, startDate, endDate]);

  useEffect(async () => {
    if (cathId && type === "Рейтинг") {
      await createRating({ cathId }).then((data) => {
        console.log(data);
        rating.setRating(data);
      });
    }
  }, [cathId, type]);

  useEffect(() => {
    if (startDate && endDate) {
      dates.setStartDate(startDate);
      dates.setEndDate(endDate);
    }
  }, [startDate, endDate]);

  let types;

  if (type === "Индивидуальный отчёт" && cathVal) {
    types = <FindUser />;
  } else if (type === "Кафедральный отчёт" && cathVal) {
    types = <FindCathResult cathId={cathId} />;
  } else if (type === "Рейтинг" && cathVal) {
    types = <FindCathRating cathId={cathId} />;
  }

  return (
    <div className="filter" style={{ marginTop: "4rem" }}>
      <Container>
        <Row>
          <Col style={{ fontFamily: "Roboto" }} md={4}>
            Период:
          </Col>
          <Col style={mobile ? {marginTop: '0.5rem'} : {}} md={5}>
            <span className="date_span">С:</span>
            <input
              onChange={(e) => setStartDate(e.target.value)}
              className="date"
              type="date"
            />
          </Col>
          <Col style={mobile ? {marginTop: '0.5rem'} : {}} md={3}>
            <span className="date_span">По:</span>
            <input
              onChange={(e) => setEndDate(e.target.value)}
              className="date"
              type="date"
            />
          </Col>
        </Row>

        <Row style={{ marginTop: "1.5rem" }}>
          <Col style={{ fontFamily: "Roboto" }} md={4}>
            Выберите тип отчёта:
          </Col>
          <Col md={8}>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="select"
            >
              <option value=""></option>
              <option value="Индивидуальный отчёт">Индивидуальный отчёт</option>
              <option value="Кафедральный отчёт">Кафедральный отчёт</option>
              <option value="Рейтинг">Рейтинг</option>
            </select>
          </Col>
        </Row>

        <Row style={{ marginTop: "1rem" }}>
          <Col style={{ fontFamily: "Roboto" }} md={4}>
            Выберите кафедру:
          </Col>
          <Col md={8}>
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
        </Row>
      </Container>

      {types}
    </div>
  );
});

export default Filter;
