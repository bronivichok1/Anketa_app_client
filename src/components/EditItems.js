import { observer } from "mobx-react-lite";
import { useState, useEffect, useContext, useRef } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import del from "./../imgs/delete.svg";
import { Context } from "..";


const EditItems = observer(() => {
  const { item } = useContext(Context);
  const { report } = useContext(Context);
  const { massiv } = useContext(Context);

  const mobile = useMediaQuery({ query: "(max-width: 770px)" });

  const [massValue, setMassValue] = useState(0);
  const [massId, setMassId] = useState(0);
  const [massFormula, setMassFormula] = useState("");
  const [massBall, setMassBall] = useState(0);

  const [vvod, setVvod] = useState(0);
  const [vvodId, setVvodId] = useState(0);

  const [yesNo, setYesNo] = useState(0);
  const [yesNoId, setYesNoId] = useState(0);

  const [select, setSelect] = useState(0);
  const [selectId, setSelectId] = useState(0);


  useEffect(() => {
    let res = 0;
    item.items.forEach((el) => {
      if(el.type !== 'Сумма') {
        res += Number(el.value ? el.value : 0);
      }
    });
    item.setResult({...item.result, result: res});
  }, [item.items]);

  function test() {
    item.items.forEach(async (el) => {
      if(el.type === 'Сумма' && el.children && el.children.length && el.parentId === null) {
       let res = 0;
       let num = el.num;
 
       console.log('ok')

       await item.items.forEach( child => {
         if(child.num.split('.')[0] === num.split('.')[0] && child.num.split('.').length > num.split('.').length ) {
          res += Number(child.value ? child.value : 0);
         }
       })
    
        item.setItems([...item.items.map(i => i.id === el.id 
          ? {...i, value: Number(res.toFixed(2))}
          : {...i}
          )])
      }
     });
  }

  useEffect(() => {
 
    report.reports.map(el => {
      item.setItems([
          ...item.items.map(i =>
              i.id === el.itemId
              ? {...i, vvod: el.value, value: el.ball_value, select: el.selectvalue}
              : {...i}
              )
      ])
  })
   
  }, [report.reports])
 

  function massivFunc(id) {
    if(Number(massValue) && Number(massValue) > 0) {
      item.setMassiv(
        item.massiv.hasOwnProperty(id)
          ? {
              ...item.massiv,
              [id]: [...item.massiv[id], { val: massValue, id: Date.now() }],
            }
          : { ...item.massiv, [id]: [{ val: massValue, id: Date.now() }] }
      );
    } else {
      return;
    }
    
  }

  function deleteMassivFunc(idMas, idEl) {
    item.setMassiv({
      ...item.massiv,
      [idMas]: [...item.massiv[idMas].filter((el) => el.id !== idEl)],
    });
    massiv.setDeleted([...massiv.deleted, idEl]);
  }


  async function countResMassiv(id, formula, ball) {
    let res = 0;
    if (item.massiv.hasOwnProperty(id) && item.massiv[id]) {
      await item.massiv[id].map((el) => {
        res += formula
          ? eval(formula.replace(/Балл/gi, ball).replace(/Ввод/gi, el.val))
          : 0;
        console.log(formula.replace(/Балл/gi, ball).replace(/Ввод/gi, el.val));
      });

      await item.setItems([
        ...item.items.map((dat) =>
          dat.id === id ? { ...dat, value: Number(res.toFixed(2)) } : { ...dat }
        )
      ]);
      test();
    }
  }

  useEffect(() => {
    countResMassiv(massId, massFormula, massBall);
  }, [massId, item.massiv]);

  async function vvodFunc(id) {
    await item.setItems([
      ...item.items.map((dat) =>
        dat.id === id
          ? {
              ...dat,
              value: vvod
                ? eval(
                    dat.formula.replace("Балл", dat.ball).replace("Ввод", vvod)
                  )
                : 0,
            }
          : { ...dat }
      ),
    ]);
    test();
  }

  useEffect(() => {
    if(vvod) {
      vvodFunc(vvodId);
    }
  }, [vvod, vvodId]);

  async function yesNoFunc(id) {
    await item.setItems([
      ...item.items.map((dat) =>
        dat.id === id ? { ...dat, value: Number(yesNo) } : { ...dat }
      ),
    ]);
    test();
  }

  useEffect(() => {
   
    yesNoFunc(yesNoId);
   
  }, [yesNo, yesNoId]);

  async function selectFunc(id) {
    if (select) {
      const ball = await item.selects.find(
        (sel) => sel.itemId === id && sel.name === select
      ).ball;

      await item.setItems([
        ...item.items.map((dat) =>
          dat.id === id ? { ...dat, value: Number(ball) } : { ...dat }
        ),
      ]);
      test();
    }
  }

  useEffect(() => {
    selectFunc(selectId);
  }, [select, selectId]);



  return (
    <>
      {item.items.map((d) => (
        <Row
          className={
            d.num.split(".").length % 2 === 0
              ? "item_hover second"
              : "item_hover"
          }
          key={d.id}
        >
          <Col
            md={8}
            className={
              d.children && d.children.length
                ? d.clasName
                  ? mobile
                    ? "show it"
                    : "show item"
                  : mobile
                  ? "hide it"
                  : "hide item"
                : mobile
                ? "it"
                : "item"
            }
            
            style={
              d.parentId !== null
                ? {
                    fontFamily: "var(--bs-body-font-family)",
                    paddingLeft: `${d.num.split(".").length * 1}rem`,
                    borderLeft: mobile ? "" : "1px solid #d1d1d1",
                  }
                : {
                    paddingLeft: `${d.num.split(".").length * 1}rem`,
                    borderLeft: mobile ? "" : "1px solid #d1d1d1",
                  }
            }
            
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
            style={d.type === 'Сумма'
            ? {
              borderBottom: mobile ? "" : "1px solid #d1d1d1",
              borderRight: mobile ? "" : "1px solid #d1d1d1",
              textAlign: "center",
              paddingTop: "0.5rem",
              color: 'blue'
            }
            : {
              borderBottom: mobile ? "" : "1px solid #d1d1d1",
              borderRight: mobile ? "" : "1px solid #d1d1d1",
              textAlign: "center",
              paddingTop: "0.5rem",
            }
          }
            md={1}
          >
             {d.type === 'Сумма'
             ? (d.value ? d.value : '')
             : d.value
             }
          </Col>
          {d.type === "Сумма" ? (
            <Col
              style={{
                borderBottom: mobile ? "" : "1px solid #d1d1d1",
                borderRight: mobile ? "" : "1px solid #d1d1d1",
              }}
              md={2}
            ></Col>
          ) : d.type === "Ввод данных" ? (
            <Col
              style={{
                borderBottom: mobile ? "" : "1px solid #d1d1d1",
                borderRight: mobile ? "" : "1px solid #d1d1d1",
              }}
              md={2}
            >
              <input
                value={
                d.vvod
                ? d.vvod
                : ""
                }
                style={{ marginTop: "0.5rem" }}
                onChange={(e) => {
                  setVvod(e.target.value);
                  setVvodId(d.id);
                  item.setItems([
                    ...item.items.map((dat) =>
                      dat.id === d.id
                        ? { ...dat, vvod: e.target.value }
                        : { ...dat }
                    ),
                  ]);
                }}
                type="number"
              />
            </Col>
          ) : d.type === "Массив данных" ? (
            <Col
              style={{
                borderBottom: mobile ? "" : "1px solid #d1d1d1",
                borderRight: mobile ? "" : "1px solid #d1d1d1",
              }}
              md={2}
              
            >
              <div style={{ marginTop: "0.5rem", display: "flex" }}>
                <input
                  style={{ marginBottom: "0.5rem" }}
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
                    setMassBall(d.ball);
                    setMassFormula(d.formula);
                  }}
                >
                  +
                </Button>
              </div>
              {item.massiv.hasOwnProperty(`${d.id}`) &&
              item.massiv[`${d.id}`] &&
              item.massiv[`${d.id}`].length ? (
                item.massiv[`${d.id}`].map((dat) => (
                  <div key={dat.id} style={{ display: "flex" }}>
                    <div className="mas_val">{dat.val}</div>
                    <img
                      alt=""
                      src={del}
                      className="mas_del"
                      onClick={() => {
                        deleteMassivFunc(d.id, dat.id);
                        setMassId(d.id);
                        setMassBall(d.ball);
                        setMassFormula(d.formula);
                      }}
                    />
                  </div>
                ))
              ) : (
                <></>
              )}
            </Col>
          ) : d.type === "Да/Нет" ? (
            <Col
              style={{
                borderBottom: mobile ? "" : "1px solid #d1d1d1",
                borderRight: mobile ? "" : "1px solid #d1d1d1",
                textAlign: "center",
              }}
              md={2}
            >
              <input
                checked={
                 d.value
                  ? true
                  : false
                }
                onChange={(e) => {
                  setYesNo(e.target.value);
                  setYesNoId(d.id);
                }}
                name={d.num}
                style={mobile ? { width: "10%" } : { width: "10%" }}
                type="radio"
                id={d.num}
                value={d.ball}
                className="yes_no"
              />
              <label className="yes_no" htmlFor={d.num}>
                Да
              </label>

              <input
                checked={
                  d.value == '0' ? true : false
               
                }
                className="yes_no"
                onChange={(e) => {
                  setYesNo(e.target.value);
                  setYesNoId(d.id);
                }}
                name={d.num}
                style={mobile ? { width: "10%" } : { width: "10%" }}
                type="radio"
                id={d.name}
                value="0"
              />
              <label className="yes_no" htmlFor={d.name}>
                Нет
              </label>
            </Col>
          ) : (
            <Col
              style={{
                borderBottom: mobile ? "" : "1px solid #d1d1d1",
                borderRight: mobile ? "" : "1px solid #d1d1d1",
              }}
              md={2}
              
            >
              <select
                value={d.select || ''}
                onChange={(e) => {
                  setSelect(e.target.value);
                  setSelectId(d.id);
                  item.setItems([
                    ...item.items.map((dat) =>
                      dat.id === d.id
                        ? {
                            ...dat,
                            select: e.target.value,
                          }
                        : { ...dat }
                    ),
                  ]);

                  if (d.name === "Количество занимаемых ставок") {
                    item.setStavka(
                      e.target.value
                    );
                  }
                }}
                style={{ marginTop: "0.5rem" }}
              >
                <option value=""></option>

                {item.selects.map((sel) => {
                  if (sel.itemId === d.id) {
                    return (
                      <option
                        key={sel.id}
                        value={sel.name}
                      >
                        {sel.name}
                      </option>
                    );
                  }
                })}
              </select>
            </Col>
          )}
          <Col
            className={mobile ? "item2" : "item"}
            style={{ textAlign: "center", cursor: "pointer" }}
           
            md={1}
          >
            {d.help ? (
              <Tippy content={d.help}>
                <div
                  style={mobile ? { width: "33px", height: "33px" } : {}}
                  className="ques"
                >
                  ?
                </div>
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

export default EditItems;
