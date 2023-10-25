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
import { createCathValue } from "../http/CathValueApi";
import { postAnketaReport } from "../http/ReportApi";
import { fetchOneUser } from "../http/UserApi";
import { fetchUserCathedras, updateUserCathedras } from "../http/UserCathedraApi";
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
  const [userCathedras, setUserCathedras] = useState([{}]);
  const [bool, setBool] = useState(false);
  const [plusVisible, setPlusVisible] = useState(true);
  const [selectCathIndex, setSelectedCath] = useState(0);
  const [currentLocalReportId, setLocalReportId] = useState(undefined);
  const [requestedLocalReportId, setRequestedLocalReportId] = useState(0);
  const [defaultItemsArray, setDefaultItemsArray] = useState([]);

  const selectorWeights = [11, 5, 4];

  useEffect(async () => {
    await fetchItems().then((data) => {
      let array = createTree2([
        ...data.map((d) =>
          d.parentId === null
            ? { ...d, clas: true, clasName: false }
            : d.children && d.children.length
              ? { ...d, clas: false, clasName: false }
              : { ...d, clas: false }
        ),
      ]);
      setDefaultItemsArray(array);
      item.setItems(JSON.parse(JSON.stringify(array)));
    });

    fetchSelectsAll().then((data) => {
      item.setSelects(data);
    });

    fetchCathedras().then((data) => {
      cathedra.setCathedras(data);
      fetchUserCathedras(user.user.id).then((cathedrasIDs) => {
        if (cathedrasIDs && cathedrasIDs.length > 0) {
          for (let i = 0; i < cathedrasIDs.length; i++)
            setCathedra(i, cathedrasIDs[i]);
        } else {
          alert('Пожалуйста, выберите кафедру перед заполнением анкеты!');
        }
      });
    });

    fetchOneUser(user.user.id).then((userData) => {
      setLocalUser(userData);
      setName(userData.fullname);
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

    await closeItem({ items: item.items }).then(data => {
      item.setItems(data);
    })
  };

  useEffect(() => {
    let id = userCathedras[selectCathIndex].id;
    setLocalUser({ ...localUser, cathedraId: id });
    if (id) {
      getBooks(id).then(books => {
        book.setBooks(books);
      })
    }
    fetchLocalReport(user.user.id, id);
  }, [selectCathIndex, userCathedras]);


  function clearData() {
    deleteReportLocal(user.user.id, userCathedras[selectCathIndex].id).then((data) => {
      console.log("report");
    });

    deleteMassivLocal(user.user.id).then((data) => {
      console.log("massiv");
    });

    window.location.reload();
  }

  function fetchLocalReport(userId, cathedraId) {
    if (requestedLocalReportId != cathedraId) {
      setRequestedLocalReportId(cathedraId);
      findReportsLocal(userId, cathedraId).then(async (data) => {
        await report.setReports(data.reports);
        item.setStavka(data.stavka);
        item.setMassivLocal(createMassivFunc(data.massivLocal));
        massiv.setMassivLocal(data.massivLocal);

        if (report.reports && report.reports.length) {
          await checkReports({ reports: report.reports, items: item.items }).then(data => {
            item.setItems(data);
          });
          setLocalReportId(cathedraId);
        } else {
          if (currentLocalReportId !== undefined) {
            item.setItems(JSON.parse(JSON.stringify(defaultItemsArray)));
          }
        }

        resItem({ items: item.items }).then(res => {
          item.setSym(res)
        })
      });
    }
  }

  async function saveData() {
    try {
      if (!userCathedras[selectCathIndex].id) {
        alert('Выберите кафедру!');
      } else {
        localUser.cathedraId = userCathedras[selectCathIndex].id;
        await saveUserCathedras();
        saveReportsLoc({ items: item.items, reports: report.reports, userId: user.user.id, itemMassivLocal: item.massivLocal, massivMassivLocal: massiv.massivLocal, massivDeletedLocal: massiv.deletedLocal, localUser: localUser }).then((data) => {
          alert("Ваши данные для кафедры " + userCathedras[selectCathIndex].name + " сохранены!");
        })
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  async function postAnketa() {
    if (moment(new Date()).isBetween(dates.dates.firstDate, dates.dates.lastDate, undefined, '[]')) {
      if (!userCathedras[selectCathIndex].id) {
        alert('Выберите кафедру!');
      } else {
        await saveUserCathedras();
        let cath = userCathedras[selectCathIndex];
        try {
          if (cath && cath.id) {
            let res;

            res = await postAnketaReport({ userId: user.user.id, itemSym: item.sym, items: item.items, massivLocal: item.massivLocal, localUser: localUser })

            createObj({ cathedra_id: cath.id }).then(data => {
              console.log('create and update cath');
              alert("Ваша анкета добавлена в кафедру " + cath.name);
              window.location.reload();
            })
          }
        } catch (e) {
          alert(e.response.data.message);
        }
      }
    } else {
      alert(`Добавить анкету можно только с ${moment(dates.dates.firstDate).format("DD.MM.YYYY")} по ${moment(dates.dates.lastDate).format("DD.MM.YYYY")}!`)
    }
  }

  async function saveUserCathedras() {
    try {
      if (userCathedras[0].id) {
        const cathedraIDs = [];
        for (let i = 0; i < userCathedras.length; i++) {
          let id = userCathedras[i].id;
          if (id)
            cathedraIDs.push(id);
        }
        await updateUserCathedras(user.user.id, cathedraIDs);
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  function setCathedra(index, cathId) {
    let cath = {};
    if (cathId)
      cathedra.cathedras.forEach((e) => {
        if (e.id == cathId) {
          cath = e;
          return;
        }
      })
    setUserCathedras((oldArray) => {
      if (cath.id || index === 0)
        oldArray[index] = cath;
      else if (oldArray.length > 1) {
        if (selectCathIndex >= index)
          setSelectedCath(selectCathIndex - 1);
        oldArray.splice(index, 1);
      }
      return [...oldArray];
    })
  }

  function addUserCathedra(cathedra) {
    setUserCathedras((oldArray) => {
      oldArray.push(cathedra ? cathedra : {});
      return [...oldArray];
    })
  }

  const handleRadioChange = (e) => {
    setSelectedCath(parseInt(e.target.value));
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
          <Row className="row">
            {userCathedras.map((userCath, index) => (
              <Col md={selectorWeights[userCathedras.length - 1]}>
                <select
                  style={(selectCathIndex === index) ? { boxShadow: "0px 0px 10px #0b5ed7" } : null}
                  value={userCath.id}
                  onChange={(e) => setCathedra(index, e.target.value)}>
                  <option value=""></option>

                  {cathedra.cathedras.map((cath) => {
                    let c;
                    userCathedras.map((e, i) => {
                      if (i !== index && cath.id === e.id) {
                        c = e;
                        return;
                      }
                    })
                    if (!c) {
                      return (<option key={cath.id} value={cath.id}>
                        {" "}
                        {cath.name}{" "}
                      </option>)
                    }
                  })}
                </select>

                {userCathedras.length > 1 &&
                  <input
                    value={index}
                    type="radio"
                    checked={selectCathIndex === index}
                    onChange={handleRadioChange}
                  />}
              </Col>
            ))}

            {plusVisible && userCathedras.length < 3 && <Col md={1}>
              <Button
                className='plusButtonClass'
                onClick={(e) => {
                  if (userCathedras.length < 3) {
                    addUserCathedra()
                    if (userCathedras >= 3)
                      setPlusVisible(false);
                  }
                }}
                variant="primary"
              >
                +
              </Button>
            </Col>
            }

          </Row>
        </Col>
      </Row>
      <div
        style={{ marginTop: "1.5rem", marginBottom: "0.5rem" }}
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
                : { marginLeft: "35%" }
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
                : { marginLeft: "10px" }
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
