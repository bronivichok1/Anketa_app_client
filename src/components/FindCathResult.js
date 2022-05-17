import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { deleteCathReportByRes } from "../http/CathReportApi";
import { deleteCathResult } from "../http/CathResultApi";
import { deleteColvoByRes } from "../http/ColvoSelectsApi";
import edit from "./../imgs/edit_icon.svg";
import trash from "./../imgs/trash_icon.svg";
import moment from 'moment';
moment().format(); 
moment.locale("ru");

const FindCathResult = observer(({ cathId }) => {
  const navigate = useNavigate();

  const { cath_report } = useContext(Context);
  const { cathedra } = useContext(Context);
  const { user } = useContext(Context);

  const deleteFunc = async (id) => {
    await deleteCathResult(id).then(data => {
      cath_report.setResult([...cath_report.result.filter(d => d.id !== id)]);
    })
   await deleteCathReportByRes(id).then(data => {});
   await deleteColvoByRes(id).then(data => {});

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
        <div>
         <Row style={{marginBottom: '1rem'}} className="blankHead" >
         <Col md={5}>Общий балл</Col>
          <Col md={6}>Дата последнего редактирования</Col>

     </Row>

       {cathedra.open || user.isAuth 
       ?
        cath_report.result.map((us) => (
        <Row className="us_item" key={us.id}>
          <Col md={5}>{us.result}</Col>
           <Col md={6}>
            {moment(us.createdAt).format("DD.MM.YYYY h:mm:ss")}
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
      ))
      : <div>
        У Вас нет доступа!
        </div>}
        </div>
      ) : (
        <div>
          Кафедрального отчёта ещё нет!
        </div>
      )}
    </div>
   </Container>
  );
});

export default FindCathResult;
