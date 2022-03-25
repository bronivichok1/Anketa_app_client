import { observer } from "mobx-react-lite";
import { useState, useEffect, useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { createTree } from "../functions";
import del from "./../imgs/delete.svg";
import { Context } from "..";

const Items = observer(({ showFunc, data, setData }) => {

  const { item } = useContext(Context);

  const mobile = useMediaQuery({ query: "(max-width: 770px)" });
  const [massiv, setMassiv] = useState({});
  const [massValue, setMassValue] = useState(0);
  const [massId, setMassId] = useState(0);

  const [vvod, setVvod] = useState(0);
  const [vvodId, setVvodId] = useState(0);

  const [yesNo, setYesNo] = useState(0);
  const [yesNoId, setYesNoId] = useState(0);

  const [select, setSelect] = useState(0);
  const [selectId, setSelectId] = useState(0);

  useEffect(() => {
    let res = 0;
    data.forEach(el => {
      res += Number(el.value ? el.value : 0);
    })
    item.setSym(res);
    
  }, [data])

  console.log(item.sym);
  
  
  function massivFunc(id) {
    setMassiv(massiv.hasOwnProperty(id) 
    ? {...massiv, [id]: [...massiv[id], {val: massValue, id: Date.now()}]}
    : {...massiv, [id]: [{val: massValue, id: Date.now()}]}
    )

  }


  function deleteMassivFunc(idMas, idEl) {
    setMassiv(
      {...massiv, [idMas]: [...massiv[idMas].filter(el => el.id !== idEl)]}
    )
  }

  async function countResMassiv(id) {
    let res = 0;
    if(massiv.hasOwnProperty(id) && massiv[id] && massiv[id].length) {
     await massiv[id].map(el => {
        res += Number(el.val);
      })
      setData((data) => [
        ...data.map((dat) =>
          dat.id === id ? { ...dat, value: res } : { ...dat }
        ),
      ]);
    }
    
  }

  useEffect(() => {
    countResMassiv(massId);
  }, [massId, massiv])

  function vvodFunc(id) {
    setData([
      ...data.map((dat) =>
        dat.id === id ? { ...dat, value: Number(vvod) + 1 } : { ...dat }
      ),
    ]);
  }

  useEffect(() => {
    vvodFunc(vvodId);
  }, [vvod, vvodId]);

  function yesNoFunc(id) {
    setData([
      ...data.map((dat) =>
        dat.id === id ? { ...dat, value: Number(yesNo) / 2 } : { ...dat }
      ),
    ]);
  }

  useEffect(() => {
    yesNoFunc(yesNoId);
  }, [yesNo, yesNoId]);

  function selectFunc(id) {
    setData([
      ...data.map((dat) =>
        dat.id === id ? { ...dat, value: Number(select) * 2 } : { ...dat }
      ),
    ]);
  }

  useEffect(() => {
    selectFunc(selectId);
  }, [select, selectId]);

  return (
    <>
      <div className="hr2"></div>
      {data.map((d) => (
        <Row className="item_hover" key={d.id}>
          <Col
            md={8}
            className={
              d.children && d.children.length
                ? d.clasName
                  ? "show item"
                  : "hide item"
                : "item"
            }
            hidden={d.clas ? false : true}
            style={
              d.parentId !== null
                ? {
                    fontFamily: "var(--bs-body-font-family)",
                    paddingLeft: `${d.num.split(".").length * 1}rem`,
                  }
                : {
                    paddingLeft: `${d.num.split(".").length * 1}rem`,
                  }
            }
            onClick={() => showFunc(d.id)}
          >
            {d.num.includes("0") ? (
              <> {d.name}</>
            ) : (
              <>
                {d.num}. {d.name}
              </>
            )}
          </Col>
          <Col
            style={{
              borderBottom: "1px solid #d1d1d1",
              borderRight: "1px solid #d1d1d1",
              textAlign: "center",
              paddingTop: "0.5rem",
            }}
            md={1}
            hidden={d.clas ? false : true}
          >
            {d.value}
          </Col>
          {d.type === "Сумма" ? (
            <Col
              style={{
                borderBottom: "1px solid #d1d1d1",
                borderRight: "1px solid #d1d1d1",
              }}
              md={2}
              hidden={d.clas ? false : true}
            ></Col>
          ) : d.type === "Ввод данных" ? (
            <Col
              style={{
                borderBottom: "1px solid #d1d1d1",
                borderRight: "1px solid #d1d1d1",
              }}
              md={2}
              hidden={d.clas ? false : true}
            >
              <input
                style={{ marginTop: "0.5rem" }}
                onChange={(e) => {
                  setVvod(e.target.value);
                  setVvodId(d.id);
                }}
                type="number"
              />
            </Col>
          ) : d.type === "Массив данных" ? (
            <Col
              style={{
                borderBottom: "1px solid #d1d1d1",
                borderRight: "1px solid #d1d1d1",
              }}
              md={2}
              hidden={d.clas ? false : true}
            >
              <div style={{ marginTop: "0.5rem", display: "flex" }}>
                <input
                 
                  onChange={(e) => {
                    setMassValue(e.target.value);
                  }}
                  type="number"
                />
                <Button
                  className="mas_but"
                  variant="primary"
                  onClick={() => {
                   setMassId(d.id);
                    massivFunc(d.id);
                  }}
                >
                  +
                </Button>
              </div>
                {massiv.hasOwnProperty(`${d.id}`) && massiv[`${d.id}`] && massiv[`${d.id}`].length
                 && massiv[`${d.id}`].map((dat) => (
                  <div key={dat.id} style={{ display: "flex" }}>
                    <div className="mas_val">{dat.val}</div>
                    <img
                      alt=""
                      src={del}
                      className="mas_del"
                      onClick={() => {
                        deleteMassivFunc(d.id, dat.id);
                        setMassId(d.id);
                      }}
                    />
                  </div>
                ))
              
               }
            </Col>
          ) : d.type === "Да/Нет" ? (
            <Col
              style={{
                borderBottom: "1px solid #d1d1d1",
                borderRight: "1px solid #d1d1d1",
                textAlign: "center",
              }}
              md={2}
              hidden={d.clas ? false : true}
            >
              <input
                onChange={(e) => {
                  setYesNo(e.target.value);
                  setYesNoId(d.id);
                }}
                name={d.num}
                style={mobile ? { width: "10%" } : { width: "10%" }}
                type="radio"
                id="yes"
                value="101"
                className="yes_no"
              />
              <label className="yes_no" htmlFor="yes">
                Да
              </label>

              <input
                className="yes_no"
                onChange={(e) => {
                  setYesNo(e.target.value);
                  setYesNoId(d.id);
                }}
                name={d.num}
                style={mobile ? { width: "10%" } : { width: "10%" }}
                type="radio"
                id="no"
                value="51"
              />
              <label className="yes_no" htmlFor="no">
                Нет
              </label>
            </Col>
          ) : (
            <Col
              style={{
                borderBottom: "1px solid #d1d1d1",
                borderRight: "1px solid #d1d1d1",
              }}
              md={2}
              hidden={d.clas ? false : true}
            >
              <select
                onChange={(e) => {
                  setSelect(e.target.value);
                  setSelectId(d.id);
                }}
                style={{ marginTop: "0.5rem" }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </Col>
          )}
          <Col
            className="item"
            style={{ textAlign: "center", cursor: "pointer" }}
            hidden={d.clas ? false : true}
            md={1}
          >
            {d.help ? (
              <Tippy content={d.help}>
                <div className="ques">?</div>
              </Tippy>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      ))}
    </>
  );
});

export default Items;
