import { observer } from "mobx-react-lite";
import { useState, useEffect, useContext, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { Context } from "..";

const EditCathItems = observer(() => {
  const { item } = useContext(Context);
  const { cath_report } = useContext(Context);

  const mobile = useMediaQuery({ query: "(max-width: 770px)" });

  useEffect(() => {
    cath_report.reports.map((el) => {
      item.setItems([
        ...item.items.map((i) =>
          i.id === el.itemId
            ? { ...i, vvod: el.value, value: el.ball_value, colvo: el.colvo }
            : { ...i }
        ),
      ]);
    });
  }, [cath_report.reports]);

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
            md={9}
            className={mobile ? "it" : "item"}
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
              <> <div style={{marginBottom: '1rem'}} >{d.name}</div>
              {cath_report.selects && cath_report.selects.length 
              ? cath_report.selects.map(sel => {
              if(sel.itemId === d.id) {
                return(
                    <Row
                className={
                  d.num.split(".").length % 2 === 0
                    ? "item_hover second"
                    : "item_hover"
                }
                key={sel.id}
              >
                <Col
                  md={8}
                  className={mobile ? "it" : "item"}
                  style={
                    {paddingLeft: `${d.num.split(".").length * 1}rem`,
                    borderLeft: mobile ? "" : "1px solid #d1d1d1",
                     backgroundColor: 'white',
                    borderTop: "1px solid #d1d1d1",
                paddingTop: '0.5rem'}
                  }
                >
                {sel.name}
                </Col>
              <Col style={{
                      borderBottom: mobile ? "" : "1px solid #d1d1d1",
                      borderRight: mobile ? "" : "1px solid #d1d1d1",
                      backgroundColor: 'white',
                    borderTop: "1px solid #d1d1d1",
                    paddingTop: '0.5rem',
                    }}
                    md={2} >
              {sel.colvo}
              </Col>
              </Row>
                )
              }
          })
          : <></>
        }
              
              </>
            ) : (
              <>
                {d.num}. {d.name}
              </>
            )}
          </Col>
          <Col
            style={
              d.type === "Сумма"
                ? {
                    borderBottom: mobile ? "" : "1px solid #d1d1d1",
                    borderRight: mobile ? "" : "1px solid #d1d1d1",
                    textAlign: "center",
                    paddingTop: "0.5rem",
                    color: "blue",
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
            {d.type === "Сумма"
              ? (Number(d.value) ? d.value : "")
              : d.type === "Массив данных"
              ? d.value
                ? Number(Number(d.value).toFixed(2))
                : ""
              : d.type === 'Список' && d.name === 'Количество занимаемых ставок'
              ? <div style={{color: 'blue'}} >{item.stavka}</div>
              : d.value
              ? d.value
              : ""}
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
              <div className="colvo">{d.colvo}</div>
            </Col>
          ) : d.type === "Массив данных" ? (
            <Col
              style={{
                borderBottom: mobile ? "" : "1px solid #d1d1d1",
                borderRight: mobile ? "" : "1px solid #d1d1d1",
              }}
              md={2}
            >
              <div className="colvo">{d.colvo}</div>
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
              <div className="colvo">{d.colvo}</div>
            </Col>
          ) : (
            <Col
              style={{
                borderBottom: mobile ? "" : "1px solid #d1d1d1",
                borderRight: mobile ? "" : "1px solid #d1d1d1",
              }}
              md={2}
            >
              <div className="colvo">{d.colvo}</div>
              {
                  d.name === 'Количество занимаемых ставок'
                  ? <input style={{marginTop: '1rem'}} value={item.stavka} onChange={(e) => item.setStavka(e.target.value)} type="text" />
                  : <></>
              }
            </Col>
          )}
        </Row>
      ))}
    </>
  );
});

export default EditCathItems;
