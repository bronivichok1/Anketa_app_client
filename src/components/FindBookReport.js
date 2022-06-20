import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import edit from "./../imgs/edit_icon.svg";
import trash from "./../imgs/trash_icon.svg";
import moment from 'moment';
moment().format(); 
moment.locale("ru");

const FindBookReport = observer(({ cathId }) => {
  const navigate = useNavigate();

  const { cathedra } = useContext(Context);
  const { user } = useContext(Context);
  const { book } = useContext(Context);

  return (
   <Container>
      <div>
      <h4
        style={{ textAlign: "center", marginTop: "3rem", marginBottom: "3rem" }}
      >
        Книжные отчёты
      </h4>

      {book.bookReports && book.bookReports.length ? (
        <div>
         <Row style={{marginBottom: '1rem'}} className="blankHead" >
         <Col md={6}>Дата создания</Col>
     </Row>

       {cathedra.open || user.isAuth 
       ?
       <>
        <Button onClick={() => navigate(`/createBook/${cathId}`)} style={{marginBottom: '1rem'}} variant="primary" >Создать книжный отчёт</Button>
       { book.bookReports.map((b) => (
        <Row className="us_item" key={b.id}>
           <Col md={6}>
            {moment(b.createdAt).format("DD.MM.YYYY h:mm:ss")}
          </Col>
          <Col style={{display: 'flex'}} md={1}>
            <img  onClick={() => navigate(`/book_report/${b.id}`)} className="edit" src={edit} alt="" />
            <img
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
      : <div>
        У Вас нет доступа!
        </div>}
        </div>
      ) : (
        <>
         <Button onClick={() => navigate(`/createBook/${cathId}`)} style={{marginBottom: '1rem'}} variant="primary" >Создать книжный отчёт</Button>
        <div>
          Книжных отчётов ещё нет!
        </div>
        </>
      )}
    </div>
   </Container>
  );
});

export default FindBookReport;