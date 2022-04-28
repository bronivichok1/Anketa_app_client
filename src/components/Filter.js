import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "..";
import { convertDate } from "../functions";
import { fetchCathedras } from "../http/CathedraApi";
import { fetchCathResults } from "../http/CathResultApi";
import { createRating } from "../http/RatingApi";
import { fetchOneResult } from "../http/ResultApi";
import { findUsers } from "../http/UserApi";
import FindCathRating from "./FindCathRating";
import FindCathResult from "./FindCathResult";
import FindUser from "./FindUser";

const Filter = observer(() => {
  const { cathedra } = useContext(Context);
  const { user } = useContext(Context);
  const { cath_report } = useContext(Context);
  const { rating } = useContext(Context);
  const { item } = useContext(Context);

  const [cathVal, setCathVal] = useState("");
  const [cathId, setCathId] = useState(0);
  const [type, setType] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchCathedras().then((data) => {
      cathedra.setCathedras(data);
    });
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
      findUsers(cathId).then((data) => {
        user.setUsers(data);
      });
    }
  }, [cathId, type, item.dateArr]);

  useEffect(async () => {
    if (cathId && type === "Кафедральный отчёт") {
      await fetchCathResults(cathId).then((data) => {
        // cath_report.setResult(data);

        if(item.dateArr && item.dateArr.length) {
            cath_report.setResult([...data.filter(el => item.dateArr.includes(convertDate(
                new Date(el.createdAt).toISOString()
              ).split(" ")[0]))]);
        } else {
            cath_report.setResult(data);
        }
      });
    }
  }, [cathId, type, item.dateArr]);

  useEffect(async () => {
    if (cathId && type === "Рейтинг") {
      await createRating({ cathId }).then((data) => {
        console.log(data);
        rating.setRating(data);
      });
    }
  }, [cathId, type]);

  // console.log(startDate)
  // console.log(endDate)

  useEffect(() => {
    if (startDate && endDate) {
      const arr = [];
      let start = Date.parse(startDate);
      let end = Date.parse(endDate);

      for (let i = start; i <= end; i = i + 24 * 60 * 60 * 1000) {
        const dates = convertDate(new Date(i).toISOString()).split(" ");
        // console.log(dates[0]);
        arr.push(dates[0]);
      }
      item.setDateArr(arr);
    }
  }, [startDate, endDate]);

  //console.log(item.dateArr);

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
          <Col md={4}>
            <span className="date_span">С:</span>
            <input
              onChange={(e) => setStartDate(e.target.value)}
              className="date"
              type="date"
            />
          </Col>
          <Col md={4}>
            <span className="date_span">По:</span>
            <input
              onChange={(e) => setEndDate(e.target.value)}
              className="date"
              type="date"
            />
          </Col>
        </Row>

        <Row style={{ marginTop: "1rem" }}>
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
