import { observer } from "mobx-react-lite";
import { Row, Col, Button } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { Context } from "../index";
import { fetchItems } from "../http/ItemApi";
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
import { getBooks } from "../http/BooksReportApi";


const EditBlank = observer(() => {
  const { item } = useContext(Context);
  const { cathedra } = useContext(Context);
  const { report } = useContext(Context);
  const { massiv } = useContext(Context);
  const { cath_report } = useContext(Context);
  const { book } = useContext(Context);

  const navigate = useNavigate();

  const params = useParams();

  const [localUser, setLocalUser] = useState({});
  const [cathValue, setCathValue] = useState("");
  const [bool, setBool] = useState(false);

  useEffect(async () => {
    let itemId;

    await fetchItems().then(async (data) => {
      item.setItems(createTree2(data));

      itemId = await data.find(
        (i) => i.name.trim() === "Количество занимаемых ставок"
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
     getBooks(data.cathedraId).then(books => {
      book.setBooks(books);
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
          getBooks(cath.id).then(books => {
            book.setBooks(books);
          })
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
        <Col className="colClass"
        >Ставка: {item.stavka} </Col>
        <Col className="colClass">
          Общий балл: {item.result.result} 
         </Col>
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
           className='buttonClass'
          onClick={updateAnketa}
            variant="primary"
          >
            Сохранить анкету
          </Button>

          <Button
          onClick={() => navigate(SEE_REPORTS_ROUTE)}
          className='buttonClass'
            style={
              {marginLeft: '10px'}
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
