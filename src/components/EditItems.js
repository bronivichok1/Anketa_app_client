import { observer } from "mobx-react-lite";
import { useEffect, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Context } from "..";
import { resItem, testItem } from "../http/ItemApi";
import { checkReports } from "../http/ReportLocalApi";
import VvodComp from "./VvodComp";
import MassivComp from "./MassivComp";
import YesNoComp from "./YesNoComp";
import SelectComp from "./SelectComp";


const EditItems = observer(() => {
  const { item } = useContext(Context);
  const { report } = useContext(Context);

  const mobile = useMediaQuery({ query: "(max-width: 770px)" });

  async function test() {
      await testItem({items: item.items}).then(data => {
        item.setItems(data);
       })
       
       resItem({items: item.items}).then(res => {
         item.setResult({...item.result, result: res});
       })
   }

  useEffect(async () => {
  await checkReports({reports: report.reports, items: item.items}).then(data => {
    item.setItems(data);
  })

  resItem({items: item.items}).then(res => {
    item.setResult({...item.result, result: res});
  })
  }, [report.reports])


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
              mobile
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
            {d.num.split('.')[0] === '0' ? (
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
            <VvodComp d={d} test={test} type={'edit'} />
          ) : d.type === "Массив данных" ? (
            <MassivComp d={d} test={test} type={'edit'} massivv={'massiv'} setMassivv={'setMassiv'} deleted={'deleted'} setDeleted={'setDeleted'} />
          ) : d.type === "Да/Нет" ? (
            <YesNoComp d={d} test={test} type={'edit'} />
          ) : (
            <SelectComp d={d} test={test} type={'edit'} />
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
