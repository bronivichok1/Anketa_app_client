import { observer } from "mobx-react-lite";
import { useState, useEffect, useContext, useRef } from "react";
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
  const [massFormula, setMassFormula] = useState('');
  const [massBall, setMassBall] = useState(0);

  const [vvod, setVvod] = useState(0);
  const [vvodId, setVvodId] = useState(0);

  const [yesNo, setYesNo] = useState(0);
  const [yesNoId, setYesNoId] = useState(0);

  const [select, setSelect] = useState(0);
  const [selectId, setSelectId] = useState(0);

  const [parent, setParent] = useState('');
  const [childValue, setChildValue] = useState(0);

  const [parentVal, setParentVal] = useState(0);


  useEffect(() => {
    if(localStorage.getItem('massiv')) {
      item.setMassiv(JSON.parse(localStorage.getItem('massiv')));
    }
  }, [])

  useEffect(() => {
    let res = 0;
    data.forEach(el => {
      res += Number(el.value ? el.value : 0);
    })
    item.setSym(res);
    
  }, [data])

  // useEffect(() => {
  //   data.forEach(el => {
  //     if (el.children && el.children.length) {
  //       el.children.forEach(el2 => {
  //         data.forEach(el3 => {
  //           if( el3.num === el2.num && el3.value) {
  //             el2.value = el3.value;
  //           }
  //         })
  //       })
  //     }
  //   })
    
  // }, [data])

//  useEffect(() => {
   
//     data.forEach( async el => {
//       if (el.children && el.children.length) {
//         let res = 0;
//        await el.children.forEach( el2 => {
//            res += Number(el2.value ? el2.value : 0);
         
        
//         })
//         if (res) {
//           setParentVal(res);
//           setParent(el.num);
//         }

       
//       }
//     })
   
//   }, [data])

  // useEffect(() => {
  //   if(parentVal && parent) {
  //     data.forEach(el => {
  //       if(el.num === parent) {
  //         el.value = parentVal;
  //       }
  //     })
  //   }
  // }, [parent, parentVal])
  

  
  function massivFunc(id) {
    // setMassiv(massiv.hasOwnProperty(id) 
    // ? {...massiv, [id]: [...massiv[id], {val: massValue, id: Date.now()}]}
    // : {...massiv, [id]: [{val: massValue, id: Date.now()}]}
    // )

    item.setMassiv(item.massiv.hasOwnProperty(id) 
    ? {...item.massiv, [id]: [...item.massiv[id], {val: massValue, id: Date.now()}]}
    : {...item.massiv, [id]: [{val: massValue, id: Date.now()}]}
    )


  }

  //console.log(item.massiv);


  function deleteMassivFunc(idMas, idEl) {
    // setMassiv(
    //   {...massiv, [idMas]: [...massiv[idMas].filter(el => el.id !== idEl)]}
    // )
    item.setMassiv(
      {...item.massiv, [idMas]: [...item.massiv[idMas].filter(el => el.id !== idEl)]}
    )
  }

  async function countResMassiv(id, formula, ball) {
    let res = 0;
    if(item.massiv.hasOwnProperty(id) && item.massiv[id]) {
     await item.massiv[id].map(el => {
       // res += 550 / Number(el.val) < 150 ? 150 : 550 / Number(el.val);
      
      res += formula ? eval(formula.replace(/ball/gi, ball).replace(/Ввод/gi, el.val)) : 0;
      console.log(formula.replace(/ball/gi, ball).replace(/Ввод/gi, el.val))
      })
      
     await setData((data) => [
        ...data.map((dat) =>
          dat.id === id ? { ...dat, value: Number(res.toFixed(2)) } : { ...dat }
        ),
      ]);
      //clone(id, Number(res.toFixed(2)));
    }
    
  }

  async function clone(id, res) {
    
    if(id) {
      const val = await data.find(el => el.id === id);
    // data.forEach( el => {
    //   if(el.id === val.parentId && el.children && el.children.length) {
    //     el.children.forEach(el2 => {
    //       if(el2.id === id) {
    //         el2.value = res;
    //       }
    //     })
    //   }
    // })

    // setData([...data.map(el => 
    //   el.id === val.parentId && el.children && el.children.length
    //   ?  el.children.map(el2 => el2.id === id ? {...el2, value: res} : {...el2})
    //   : {...el}
    
    //   )])
    setData([...data.map(el => 
      el.id === val.parentId && el.children && el.children.length
      ? {...el, children: [...el.children.map(el2 => el2.id === id ? {...el2, value: res} : {...el2})]}
      : {...el}
    
      )])
    
     }

  }
 

  useEffect(() => {
    countResMassiv(massId, massFormula, massBall);
  }, [massId, item.massiv])

  async function vvodFunc(id) {
    //let res = 0;
   await setData([
      ...data.map((dat) =>
        // dat.id === id ? { ...dat, value: Number(vvod) + 1 } : { ...dat }
        dat.id === id ? { ...dat, value: vvod ? eval(dat.formula.replace('ball', dat.ball).replace('Ввод', vvod)) : 0 } : { ...dat }
      ),
    ]);
    // await data.forEach(el => {
    //   if(el.id === id) {
    //     res = vvod ? eval(el.formula.replace('ball', el.ball).replace('Ввод', vvod)) : 0
    //   }
    // })
    // clone(id, res);
  }

  useEffect(() => {
    vvodFunc(vvodId);
  }, [vvod, vvodId]);

  async function yesNoFunc(id) {
   await setData([
      ...data.map((dat) =>
        dat.id === id ? { ...dat, value: Number(yesNo) } : { ...dat }
      ),
    ]);
   // clone(id, Number(yesNo))
  }

  useEffect(() => {
    yesNoFunc(yesNoId);
  }, [yesNo, yesNoId]);

  async function selectFunc(id) {
    console.log(id);

    if(data.find(el => el.id === id && el.name === 'Количество занимаемых ставок')) {
      item.setStavka(data.find(el => el.id === id).vvod);
    }

   await setData([
      ...data.map((dat) =>
        dat.id === id ? { ...dat, value: Number(select) } : { ...dat }
      ),
    ]);
   // clone(id, Number(select) * 2);
  }

  useEffect(() => {
    selectFunc(selectId);
  }, [select, selectId]);

  return (
    <>
      
      {data.map((d) => (
        <Row className="item_hover" key={d.id}>
          <Col
            md={8}
            className={
              d.children && d.children.length
                ? d.clasName
                  ? mobile ? "show it" : "show item" 
                  : mobile ? "hide it" : "hide item"
                : mobile ?  "it" :  "item" 
            }
            hidden={d.clas ? false : true}
            style={
              d.parentId !== null
                ? {
                    fontFamily: "var(--bs-body-font-family)",
                    paddingLeft: `${d.num.split(".").length * 1}rem`,
                    borderLeft: mobile ? '' : "1px solid #d1d1d1",
                  }
                : {
                    paddingLeft: `${d.num.split(".").length * 1}rem`,
                    borderLeft: mobile ? '' : "1px solid #d1d1d1",
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
              borderBottom: mobile ? '' : "1px solid #d1d1d1",
              borderRight: mobile ? '' : "1px solid #d1d1d1",
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
                borderBottom:mobile ? '' : "1px solid #d1d1d1",
                borderRight: mobile ? '' : "1px solid #d1d1d1",
              }}
              md={2}
              hidden={d.clas ? false : true}
            ></Col>
          ) : d.type === "Ввод данных" ? (
            <Col
              style={{
                borderBottom: mobile ? '' : "1px solid #d1d1d1",
                borderRight: mobile ? '' : "1px solid #d1d1d1",
              }}
              md={2}
              hidden={d.clas ? false : true}
            >
              <input
                value={
                  data.find(el=> el.id === d.id).vvod ? data.find(el=> el.id === d.id).vvod : ''
                }
                style={{ marginTop: "0.5rem" }}
                onChange={(e) => {
                  setVvod(e.target.value);
                  setVvodId(d.id);
                  setData([...data.map(dat => dat.id === d.id
                    ? {...dat, vvod: e.target.value}
                    : {...dat}
                    )])
                }}
                type="number"
              />
            </Col>
          ) : d.type === "Массив данных" ? (
            <Col
              style={{
                borderBottom: mobile ? '' : "1px solid #d1d1d1",
                borderRight: mobile ? '' : "1px solid #d1d1d1",
              }}
              md={2}
              hidden={d.clas ? false : true}
            >
              <div style={{ marginTop: "0.5rem", display: "flex" }}>
                <input
                style={{marginBottom: '0.5rem'}}
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
                {item.massiv.hasOwnProperty(`${d.id}`) && item.massiv[`${d.id}`] && item.massiv[`${d.id}`].length
                 ? item.massiv[`${d.id}`].map((dat) => (
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
                : <></>
               }
            </Col>
          ) : d.type === "Да/Нет" ? (
            <Col
              style={{
                borderBottom: mobile ? '' : "1px solid #d1d1d1",
                borderRight: mobile ? '' : "1px solid #d1d1d1",
                textAlign: "center",
              }}
              md={2}
              hidden={d.clas ? false : true}
            >
              <input
              checked={
                data.find(el=> el.id === d.id).value === d.ball ? true : false
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
                data.find(el=> el.id === d.id).value === 0 ? true : false
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
                value='0'
              />
              <label className="yes_no" htmlFor={d.name}>
                Нет
              </label>
            </Col>
          ) : (
            <Col
              style={{
                borderBottom: mobile ? '' : "1px solid #d1d1d1",
                borderRight: mobile ? '' : "1px solid #d1d1d1",
              }}
              md={2}
              hidden={d.clas ? false : true}
            >
              <select
               
                onChange={(e) => {
                  setSelect(e.target.value);
                  setSelectId(d.id);
                  setData([...data.map(dat => dat.id === d.id
                    ? {...dat, vvod: e.target.options[e.target.selectedIndex].text}
                    : {...dat}
                    )])
                }}
                style={{ marginTop: "0.5rem" }}
              >
                <option value=""></option>
                
                {item.selects.map(sel => {
                   if(sel.itemId === d.id) {
                    return(<option selected={
                      d.vvod && d.vvod === sel.name ? true : false
                    } key={sel.id} value={sel.ball}> {sel.name} </option>);
                  }
                })}
              </select>
            </Col>
          )}
          <Col
            className={mobile ? "item2" : "item"}
            style={{ textAlign: "center", cursor: "pointer" }}
            hidden={d.clas ? false : true}
            md={1}
          >
            {d.help ? (
              <Tippy content={d.help}>
                <div style={mobile ? {width: '33px', height: '33px'} : {}} className="ques">?</div>
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
