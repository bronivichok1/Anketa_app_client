import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Context } from "..";
import VvodComp from "./VvodComp";
import MassivComp from "./MassivComp";
import YesNoComp from "./YesNoComp";
import SelectComp from "./SelectComp";
import { resItem, testItem } from "../http/ItemApi";


const Items = observer(({ showFunc }) => {

  const { item } = useContext(Context);
  const mobile = useMediaQuery({ query: "(max-width: 770px)" });

  async function test() {
    await testItem({items: item.items}).then(data => {
      item.setItems(data);
     })
     
     resItem({items: item.items}).then(res => {
       item.setSym(res)
     })
}

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
               (d.children && d.children.length)
                ? (d.clasName)
                  ? (mobile ? "show it": "show item")
                  : (mobile ? "hide it": "hide item")
                : (mobile ? "it": "item")
            }
            hidden={d.clas ? false : true}
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
           <span style={{paddingLeft: '30px', marginLeft: '-30px', cursor: 'pointer'}}
            onClick={() => showFunc(d.id)}
           > 
           {d.num.split('.')[0] === '0' ? (
              <> {d.name}</>
            ) : (
              <>
                {d.num}. {d.name}
              </>
            )}</span>
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
            hidden={d.clas ? false : true}
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
              hidden={d.clas ? false : true}
            ></Col>
          ) : d.type === "Ввод данных" ? (
            <VvodComp d={d} test={test} type={'create'} />
          ) : d.type === "Массив данных" ? (
            <MassivComp d={d} test={test} type={'create'} massivv={'massivLocal'} setMassivv={'setMassivLocal'} deleted={'deletedLocal'} setDeleted={'setDeletedLocal'} />
          ) : d.type === "Да/Нет" ? (
            <YesNoComp d={d} test={test} type={'create'} />
          ) : (
            <SelectComp d={d} test={test} type={'create'} />
          )}
          <Col
            className={mobile ? "item2" : "item"}
            style={{ textAlign: "center", cursor: "pointer" }}
            hidden={d.clas ? false : true}
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

export default Items;
