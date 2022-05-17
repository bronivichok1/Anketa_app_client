import { observer } from "mobx-react-lite";
import { Row, Col, Button } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { Context } from "../index";
import { useMediaQuery } from "react-responsive";
import { fetchItems } from "../http/ItemApi";
import { fetchOneUser, updateUser } from "../http/UserApi";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCathedras, fetchOneCathedra } from "../http/CathedraApi";
import EditItems from "./EditItems";
import { createReport, deleteReportOne, findByResReport, updateReport } from "../http/ReportApi";
import { fetchSelectsAll } from "../http/SelectApi";
import { createMassiv, ownDeleteMassiv, getMassivByRes } from "../http/MassivApi";
import { fetchOneOwnResult, updateResult } from "../http/ResultApi";
import { createMassivFunc, createTree2 } from "../functions";
import { SEE_REPORTS_ROUTE } from "../utils/consts";
import { deleteCathResult, fetchCathResultActive } from "../http/CathResultApi";
import { createObj, deleteCathReportByRes } from "../http/CathReportApi";
import { deleteColvoByRes } from "../http/ColvoSelectsApi";


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


  useEffect(async () => {
    await fetchItems().then((data) => {
      item.setItems(createTree2(data));
    });

    fetchCathedras().then((data) => {
      cathedra.setCathedras(data);
    });

    fetchSelectsAll().then((data) => {
      item.setSelects(data);
    });

   await fetchOneOwnResult(params.id).then((data) => {
      item.setResult(data);
    });

    fetchOneUser(item.result.userId).then( (data) => {
      setLocalUser(data);
     fetchOneCathedra(data.cathedraId).then(cath => {
       setCathValue(cath.name);
     })
   });

    findByResReport(params.id).then(async (data) => {
      report.setReports(data);

     const itemId = await item.items.find(
       (i) => i.name === "Количество занимаемых ставок"
     ).id;

     const stavka = await data.find(d => d.itemId === itemId);

     if(stavka) {
      item.setStavka(stavka.selectvalue);
     }
   });

    getMassivByRes(params.id).then((data) => {
      item.setMassiv(createMassivFunc(data));
      massiv.setMassiv(data);
    });
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
      let res;
     
      res = await updateResult(item.result.id, {...item.result, cathedra_id: localUser.cathedraId});

      if(item.items.length > report.reports.length) {
        const arr = [];
        await item.items.forEach( async el => {
          const t = await report.reports.find(rep => rep.itemId === el.id);
          if(!t) {
            arr.push(el);
          }
        })

         arr.forEach(async (d) => {
         await createReport({
            selectvalue: d.select,
            value: d.vvod,
            ball_value: d.value,
            userId: item.result.userId,
            itemId: d.id,
            cathedra_id: localUser.cathedraId,
            resultId: params.id
          }).then( data => {
            console.log('good');
          })
        })
      }
      
      await report.reports.forEach(rep => {
        const cont = item.items.find(i => i.id === rep.itemId);
        if(cont) {
          updateReport(rep.id, {
            ...rep,
            selectvalue: cont.select,
            value: cont.vvod,
            ball_value: cont.value,
            cathedra_id: localUser.cathedraId
          })
        } else {
          deleteReportOne(rep.id).then(data => {
            console.log('delete report');
          })
        }
        
      })
      

      for(let key in item.massiv) {
        let itemId = await item.items.find(it => it.id == key).id;

        if(itemId) {
          item.massiv[key].forEach(mas => {
            if(massiv.massiv.find(sm => sm.id === mas.id)) {
              console.log('yes');
             } else {
               createMassiv({value: Number(mas.val), userId: localUser.id, itemId: itemId, result_id: params.id})
               .then(end => console.log('massiv'));
             }
          })
        }
      }
      
      if(massiv.deleted && massiv.deleted.length) {
        massiv.deleted.forEach(el => {
          ownDeleteMassiv(el).then(d => console.log('yes'));
        })
      }
      
      updateUser(localUser.id, localUser);

      await fetchCathResultActive(localUser.cathedraId).then(async data => {
        if(data && data.length) {

          await deleteCathResult(data[0].id).then(data => {
          })
         await deleteCathReportByRes(data[0].id).then(data => {});
         await deleteColvoByRes(data[0].id).then(data => {});

        await createObj({cathedra_id: localUser.cathedraId}).then( data => {
         console.log('create and update cath');

         cath_report.setSelects( [] );
        })

        } else {
         await createObj({cathedra_id: localUser.cathedraId}).then( data => {
           console.log('create cath');

           cath_report.setSelects( [] );
          })
        }
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

      <EditItems />

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
