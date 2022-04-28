import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { convertDate } from "../functions";
import { createObj, deleteCathReport } from "../http/CathReportApi";
import { deleteCathResult } from "../http/CathResultApi";
import { deleteColvo } from "../http/ColvoSelectsApi";
import edit from "./../imgs/edit_icon.svg";
import trash from "./../imgs/trash_icon.svg";

const FindCathResult = observer(({ cathId }) => {
  const navigate = useNavigate();

  const { cath_report } = useContext(Context);
  const { item } = useContext(Context);

  const createResult = async () => {
    try {
      if (cathId) {
          createObj({cathedra_id: cathId}).then( data => {

            cath_report.setResult([...cath_report.result, data]);
           
          })
        } else {
          alert('Индивидуальных отчётов на этой кафедре ещё нет!');
        }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteFunc = async (id) => {
    await deleteCathResult(id).then(data => {
      cath_report.setResult([...cath_report.result.filter(d => d.id !== id)]);
    })
   await deleteCathReport(cathId).then(data => {});
   await deleteColvo(cathId).then(data => {});

    window.location.reload();
  }


  return (
   <Container>
      <div>
      <h4
        style={{ textAlign: "center", marginTop: "3rem", marginBottom: "3rem" }}
      >
        Отчёты
      </h4>

      {cath_report.result && cath_report.result.length ? (
        <>
         <Row style={{marginBottom: '1rem'}} className="blankHead" >
         <Col md={5}>Общий балл</Col>
         <Col md={3}>Дата создания</Col>
         <Col md={3}>Дата редактирования</Col>

     </Row>

       {cath_report.result.map((us) => (
        <Row className="us_item" key={us.id}>
          <Col md={5}>{us.result}</Col>
          <Col md={3}>
            { convertDate(us.createdAt) }
          </Col>
          <Col md={3}>
            { convertDate(us.updatedAt) }
          </Col>
          <Col style={{display: 'flex'}} md={1}>
            <img  onClick={() => navigate(`/cathReports/${us.id}`)} className="edit" src={edit} alt="" />
            <img
              onClick={() => deleteFunc(us.id)}
                  style={{
                    height: "30px",
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                  src={trash}
                  alt=""
                  />
          </Col>
        </Row>
      ))}
        </>
      ) : (
        <div>
          <Button onClick={createResult} variant="primary">
            Создать отчёт
          </Button>
        </div>
      )}
    </div>
   </Container>
  );
});

export default FindCathResult;
