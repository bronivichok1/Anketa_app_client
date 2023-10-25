import { observer } from "mobx-react-lite";
import { useContext, useEffect, useMemo, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { convertDate } from "../functions";
import { fetchCathedras } from "../http/CathedraApi";
import { deleteMassiv, deleteMassivByRes } from "../http/MassivApi";
import { deleteReport, deleteReportsByRes } from "../http/ReportApi";
import { deleteResult, deleteResultOwn, fetchOneResult, findByCathResult } from "../http/ResultApi";
import { fetchOneUser, findUsers } from "../http/UserApi";
import trash from "./../imgs/trash_icon.svg";
import moment from 'moment';
import { countResAgain, deleteCathResult, fetchCathResultActive, fetchCathResults } from "../http/CathResultApi";
import { createObj, deleteCathReport, deleteCathReportByRes } from "../http/CathReportApi";
import { deleteColvo, deleteColvoByRes } from "../http/ColvoSelectsApi";
moment().format();
moment.locale("ru");

const DeleteAnketa = observer(() => {
  const { cathedra } = useContext(Context);
  const { report } = useContext(Context);

  const [cathVal, setCathVal] = useState("");
  const [cathId, setCathId] = useState(0);

  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [bool, setBool] = useState(false);

  const filteredResults = useMemo(() => {
    return report.results.filter((us) => {
      return us.fullname ? us.fullname.toLowerCase().includes(value.toLowerCase()) : '';
    });
  });

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
    if (cathId) {
      findByCathResult(cathId).then(data => {
        report.setResults(data);
      })
    }
  }, [cathId]);


  function findUser() {
    setBool(true);
    if (report.results && report.results.length) {
      report.results.forEach((res) => {
        fetchOneUser(res.userId).then(data => {
          report.setResults([...report.results.map(el => el.userId === data.id ? { ...el, fullname: data.fullname }
            : { ...el })]);
        })
      });
    }
  }


  async function DeleteFunc(id, cath_result_id) {
    console.log(id);

    await deleteReportsByRes(id).then(data => {
      console.log('report');
    })

    await deleteMassivByRes(id).then(data => {
      console.log('massiv');
    })

    deleteResultOwn(id).then(data => {
      console.log('result');
    })


    report.setResults([...report.results.filter(u => u.id !== id)]);

    await deleteCathReportByRes(cath_result_id).then(data => { });
    await deleteColvoByRes(cath_result_id).then(data => { });

    await countResAgain({ cath_result_id: cath_result_id }).then(data => {
      console.log('updated cath result');
    })

  }


  return (
    <div className="filter" style={{ marginTop: "4rem" }}>
      <Container>
        <Row style={{ marginTop: "1rem" }}>
          <Col style={{ fontFamily: "Roboto" }} md={4}>
            Выберите кафедру:
          </Col>
          <Col md={7}>
            <select
              onChange={(e) => {
                setCathVal(e.target.value);
                setBool(false);
              }}
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
          <Col md={1} >
            <Button onClick={findUser} variant='primary' >Найти</Button>
          </Col>
        </Row>

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

          {report.results && report.results.length && cathVal && bool ? (
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

          {report.results && report.results.length && cathVal && bool ? (

            <>

              <Row style={{ marginBottom: '1rem' }} className="blankHead" >
                <Col md={4}>ФИО</Col>
                <Col md={3}>Общий балл</Col>
                <Col md={4}>Дата последнего редактирования</Col>

              </Row>

              {filteredResults.map((us) => (
                <Row className="us_item" key={us.id}>
                  <Col md={4}>{us.fullname}</Col>
                  <Col md={3}>{us.result}</Col>
                  <Col md={4}>{
                    moment(us.updatedAt).format("DD.MM.YYYY h:mm:ss")}</Col>
                  <Col md={1}>
                    <img
                      onClick={() => DeleteFunc(us.id, us.cath_result_id)}
                      style={{
                        height: "30px",
                        marginLeft: "30px",
                        cursor: "pointer",
                      }}
                      md={1}
                      src={trash}
                      alt=""
                    />
                  </Col>
                </Row>
              ))}
            </>
          ) : cathVal && bool ? (
            <div>Сотрудники не найдены!</div>
          ) : <></>}
        </div>
      </Container>
    </div>
  );
});

export default DeleteAnketa;
