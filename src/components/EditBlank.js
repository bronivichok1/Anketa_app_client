import { observer } from "mobx-react-lite";
import { Row, Col, Button } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { Context } from "../index";
import { useMediaQuery } from "react-responsive";
import { fetchItems, resItem } from "../http/ItemApi";
import { fetchOneUser } from "../http/UserApi";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCathedras, fetchOneCathedra } from "../http/CathedraApi";
import EditItems from "./EditItems";
import { findByResReport, updateAnketaReport } from "../http/ReportApi";
import { fetchSelectsAll } from "../http/SelectApi";
import { getMassivByRes } from "../http/MassivApi";
import { fetchOneOwnResult } from "../http/ResultApi";
import { createMassivFunc, createTree2 } from "../functions";
import { SEE_REPORTS_ROUTE } from "../utils/consts";
import { createObj } from "../http/CathReportApi";


const EditBlank = observer(() => {
  const { item } = useContext(Context);
  const { cathedra } = useContext(Context);
  const { report } = useContext(Context);
  const { massiv } = useContext(Context);
  const { cath_report } = useContext(Context);

  const navigate = useNavigate();

  const params = useParams();

  const mobile = useMediaQuery({ query: "(max-width: 1400px)" });

  const [localUser, setLocalUser] = useState({});
  const [cathValue, setCathValue] = useState("");
  const [bool, setBool] = useState(false);


  useEffect(async () => {
    let itemId;

    await fetchItems().then(async (data) => {
      item.setItems(createTree2(data));

      itemId = await data.find(
        (i) => i.name === "Количество занимаемых ставок"
      ).id;
 
    });

    fetchCathedras().then((data) => {
      cathedra.setCathedras(data);
    });

   fetchSelectsAll().then((data) => {
      item.setSelects(data);
    });

   await fetchOneOwnResult(params.id).then((data) => {
      item.setResult(data);
    })

    fetchOneUser(item.result.userId).then( (data) => {
      setLocalUser(data);
     fetchOneCathedra(data.cathedraId).then(cath => {
       setCathValue(cath.name);
     })
   });

    findByResReport(params.id).then(async (data) => {
      report.setReports(data);

     const stavka = await data.find(d => d.itemId === itemId);

     if(stavka) {
      item.setStavka(stavka.selectvalue);
     }
   });

    getMassivByRes(params.id).then((data) => {
      item.setMassiv(createMassivFunc(data));
      massiv.setMassiv(data);
    });

    setBool(true)
  }, []);

  useEffect(() => {
      cathedra.cathedras.map((cath) => {
        if (cath.name === cathValue) {
          setLocalUser({...localUser, cathedraId: cath.id});
        }
      });
    
  }, [cathValue]);


  async function updateAnketa() {
    try {

      await updateAnketaReport({itemResult: item.result, localUser: localUser, itemItems: item.items, reportReports: report.reports, itemMassiv: item.massiv, massivMassiv: massiv.massiv, massivDeleted: massiv.deleted}).then(() => {
           createObj({cathedra_id: localUser.cathedraId}).then( data => {
           console.log('create cath');

           cath_report.setSelects( [] );
          })
      })

      alert('Ваша анкета изменена!');

      navigate(SEE_REPORTS_ROUTE);
    } catch (e) {
       alert(e.response.data.message);
    }
  }

  return (
    <div className="blank" style={{ marginTop: "4rem" }}>
      <Row >
        <Col style={{ textAlign: "center", backgroundColor: "#e9eff9", borderRadius: "15px"  }}>Ставка: {item.stavka} </Col>
        <Col style={{ textAlign: "center", backgroundColor: "#e9eff9", borderRadius: "15px"  }}>Общий балл: 
         {item.result.result} </Col>
      </Row>
      <Row className="row" style={{ marginTop: "1rem" }}>
        <Col md={6}>ФИО</Col>
        <Col md={6}>
          <input
            onChange={(e) =>
              setLocalUser({ ...localUser, fullname: e.target.value })
            }
            value={localUser.fullname || ""}
            type="text"
          />
        </Col>
      </Row>
      <Row className="row" style={{ marginTop: "1rem" }}>
        <Col md={6}>Кафедра</Col>
        <Col md={6}>
          <select
            value={cathValue}
            onChange={(e) => setCathValue(e.target.value)}
          >
            <option value=""></option>

            {cathedra.cathedras.map((cath) => (
              <option key={cath.id} value={cath.name}>
                {" "}
                {cath.name}{" "}
              </option>
            ))}
          </select>
        </Col>
      </Row>
      <div
        style={{ marginTop: "2rem", marginBottom: "0.5rem" }}
        className="hr"
      ></div>

      <Row>
        <Col style={{ textAlign: "center" }} md={8}>
          Критерии
        </Col>
        <Col style={{ textAlign: "center" }} md={1}>
          Балл
        </Col>
        <Col style={{ textAlign: "center" }} md={2}>
          Значение
        </Col>
        <Col md={1}></Col>
      </Row>

      <div style={{ marginTop: "0.5rem" }} className="hr"></div>

       {bool
       ? <EditItems />
      : <></>}

      <Row style={{ marginTop: "3rem" }}>
        <Col lg={6}>
          <Button
          onClick={updateAnketa}
            style={{
              fontFamily: "var(--bs-body-font-family)",
              fontWeight: "500",
              marginTop: "15px",
            }}
            variant="primary"
          >
            Сохранить анкету
          </Button>

          <Button
          onClick={() => navigate(SEE_REPORTS_ROUTE)}
            style={
              {
                fontFamily: "var(--bs-body-font-family)",
                fontWeight: "500",
                marginTop: "15px",
                marginLeft: '10px',
              }
            }
            variant="dark"
          >
            Отмена
          </Button>
        </Col>
        <Col lg={6}>
         
        </Col>
      </Row>
    </div>
  );
});

export default EditBlank;
