import { observer } from "mobx-react-lite";
import { Row, Col, Button } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { Context } from "../index";
import { useMediaQuery } from "react-responsive";
import Items from "./Items";
import { createMassivFunc, createTree2 } from "../functions";
import { closeItem, fetchItems, resItem } from "../http/ItemApi";
import { fetchSelectsAll } from "../http/SelectApi";
import { fetchCathedras } from "../http/CathedraApi";
import { postAnketaReport } from "../http/ReportApi";
import { fetchOneUser } from "../http/UserApi";
import { checkReports, deleteReportLocal, findReportsLocal, saveReportsLoc } from "../http/ReportLocalApi";
import { deleteMassivLocal } from "../http/MassivLocalApi";
import moment from 'moment';
import { fetchDates } from "../http/DatesApi";
import { createObj } from "../http/CathReportApi";
import { getBooks } from "../http/BooksReportApi";
moment().format(); 

const Blank = observer(() => {
  const { item } = useContext(Context);
  const { cathedra } = useContext(Context);
  const { user } = useContext(Context);
  const { report } = useContext(Context);
  const { massiv } = useContext(Context);
  const { dates } = useContext(Context);
  const { book } = useContext(Context);

  const mobile = useMediaQuery({ query: "(max-width: 1400px)" });
  const mobile2 = useMediaQuery({ query: "(max-width: 410px)" });

  const [name, setName] = useState("");
  const [localUser, setLocalUser] = useState({});
  const [cathValue, setCathValue] = useState("");
  const [cathId, setCathId] = useState(0);
  const [bool, setBool] = useState(false);


  useEffect(async () => {

    await fetchItems().then( (data) => {
      item.setItems(
        createTree2([
          ...data.map((d) =>
            d.parentId === null
              ? { ...d, clas: true, clasName: false }
              : d.children && d.children.length
              ? { ...d, clas: false, clasName: false }
              : { ...d, clas: false }
          ),
        ])
      );
    });

    findReportsLocal(user.user.id).then(async (data) => {
     await report.setReports(data.reports);
      item.setStavka(data.stavka);
      item.setMassivLocal(createMassivFunc(data.massivLocal));
      massiv.setMassivLocal(data.massivLocal);

      if(report.reports && report.reports.length) {
       await checkReports({reports: report.reports, items: item.items}).then(data => {
          item.setItems(data);
        })
       }

        resItem({items: item.items}).then(res => {
        item.setSym(res)
      })
   });

    fetchSelectsAll().then((data) => {
      item.setSelects(data);
    });

    fetchCathedras().then((data) => {
      cathedra.setCathedras(data);
      fetchOneUser(user.user.id).then((userData) => {
        setLocalUser(userData);
        setName(userData.fullname);
        if (userData.cathedraId) {
          setCathValue(data.find(el => el.id === userData.cathedraId).name);
          getBooks(userData.cathedraId).then(books => {
            book.setBooks(books);
          })
        } else {
          alert('Пожалуйста выберите кафедру перед заполнением анкеты!');
        }
      });
    });

    fetchDates().then(data => {
      dates.setDates(data[0]);
    })

    setBool(true);
  }, []);

  const showFunc = async (id) => {
   await item.setItems([
      ...item.items.map((d) =>
        d.parentId === id
          ? { ...d, clas: !d.clas }
          : d.id === id && d.children && d.children.length
          ? { ...d, clasName: !d.clasName }
          : { ...d }
      ),
    ]);

   await closeItem({items: item.items}).then(data => {
      item.setItems(data);
    })
  };


  useEffect(() => {
    if (cathValue) {
      cathedra.cathedras.forEach((cath) => {
        if (cath.name === cathValue) {
          setCathId(cath.id);
        }
      });
    }
  }, [cathValue]);

  useEffect(() => {
    if (cathId) {
      setLocalUser({ ...localUser, cathedraId: cathId });
      getBooks(cathId).then(books => {
        book.setBooks(books);
      })
    }
  }, [cathId]);


  function clearData() {
    deleteReportLocal(user.user.id).then((data) => {
      console.log("report");
    });

    deleteMassivLocal(user.user.id).then((data) => {
      console.log("massiv");
    });

    window.location.reload();
  }

  async function saveData() {
    try {

      saveReportsLoc({items: item.items, reports: report.reports, userId: user.user.id, itemMassivLocal: item.massivLocal, massivMassivLocal: massiv.massivLocal, massivDeletedLocal: massiv.deletedLocal, localUser: localUser}).then(() => {
        alert("Ваши данные сохранены!");
      })

    } catch (e) {
      alert(e.response.data.message);
    }
  }

  async function postAnketa() {
    if(moment(new Date()).isBetween(dates.dates.firstDate, dates.dates.lastDate, undefined, '[]')) {
      try {

        if(localUser.cathedraId) {
        let res;

        res = await postAnketaReport({userId: user.user.id, itemSym: item.sym, items: item.items, massivLocal: item.massivLocal, localUser: localUser})

        createObj({cathedra_id: localUser.cathedraId}).then( data => {
          console.log('create and update cath');
          alert("Ваша анкета добавлена!");
          window.location.reload();
        })
        } else {
          alert('Выберите кафедру!');
        }
      } catch (e) {
        alert(e.response.data.message);
      }
    } else {
      alert(`Добавить анкету можно только с ${moment(dates.dates.firstDate).format("DD.MM.YYYY")} по ${moment(dates.dates.lastDate).format("DD.MM.YYYY")}!`)
    }
  }

 
  return (
    <div className="blank" style={{ marginTop: "4rem" }}>
      <Row>
        <Col
        className="colClass"
        >
        Ставка: {item.stavka}{" "} 
        </Col>
        <Col 
        className="colClass"
        >
          Общий балл: {item.sym ? Number(item.sym.toFixed(2)) : ""}{" "}
        </Col>
      </Row>
      <Row className="row" style={{ marginTop: "1rem" }}>
        <Col md={6}>ФИО</Col>
        <Col md={6}>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name ? name : ""}
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
      ? <Items showFunc={showFunc} />
      : <></>}

      <Row style={{ marginTop: "3rem" }}>
        <Col lg={6}>
          <Button
            onClick={postAnketa}
            className='buttonClass'
            variant="primary"
          >
            Добавить анкету
          </Button>
        </Col>
        <Col lg={6}>
          <Button 
          className='buttonClass'
            onClick={clearData}
            style={
                mobile
                  ? {}
                  : {marginLeft: "35%"}
              }
            variant="dark"
          >
            Сброс данных анкеты
          </Button>
          <Button 
          className='buttonClass'
            onClick={saveData}
            style={
              mobile2
                ? {}
                : {marginLeft: "10px"}
            }
            variant="primary"
          >
            Сохранить анкету
          </Button>
        </Col>
      </Row>
    </div>
  );
});

export default Blank;
