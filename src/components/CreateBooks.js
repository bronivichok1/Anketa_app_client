import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "..";
import { fetchMassivItems } from "../http/ItemApi";
import MyModal from "../UI/MyModal/MyModal";
import { SEE_REPORTS_ROUTE } from "../utils/consts";
import CreateBookModal from "./CreateBookModal";
import trash from "./../imgs/trash_icon.svg";
import edit from "./../imgs/edit_icon.svg";
import { useMediaQuery } from "react-responsive";
import EditBookModal from "./EditBookModal";
import { createBook } from "../http/BooksReportApi";
import axios from "axios";
import { saveAs } from "file-saver";
import { fetchOneCathedra } from "../http/CathedraApi";

const CreateBooks = observer(() => {
  const navigate = useNavigate();
  const params = useParams();

  const { book } = useContext(Context);

  const [id, setId] = useState(0);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const mobile = useMediaQuery({ query: "(max-width: 1200px)" });
  const [bookObj, setBookObj] = useState({
    name: '',
    type: '',
    protocol_num: '',
    magaz_or_collection: null,
    database: null,
    colvo_authors: '',
    authors: []
  });
  const [cathId, setCathId] = useState(0);
  const [cath, setCath] = useState('');

  useEffect(() => {
    fetchMassivItems().then(data => {
        book.setMassivItems(data);
    })
    setCathId(Number(params.id));
    fetchOneCathedra(Number(params.id)).then(async data => {
      setCath(data.name);
    });
  }, [])

  const addBook = (id) => {
    setId(id);
    setModal(true);
  }

  const editBook = (obj) => {
    setBookObj(obj);
    setEditModal(true);
  }

  const deleteBook = (id) => {
    book.setBooks([...book.books.filter(el => el.id !== id)]);
  }

  const saveResult = () => {
    if(book.books && book.books.length) {
      createBook({books: book.books, cathId}).then(data => {
        alert('Приложение к отчету кафедры сохранено!');
        book.setBooks([]);
        navigate(SEE_REPORTS_ROUTE);
      })
    } else {
      alert('Добавьте элементы в приложение к отчету (книги, статьи и т.д.)!');
    }
  }

  const cansel = () => {
    book.setBooks([]);
    navigate(SEE_REPORTS_ROUTE);
  }

  function createExcel() {

    const arr = book.books;

    arr.forEach(el => {
      const punkt = book.massivItems.find(p => p.id === el.item_id);
      if (punkt) {
        el.punkt = punkt.num;
      }
    })

    axios
      .post(process.env.REACT_APP_HOST + "/excelBook", {arr})
      .then(() =>
        axios.get(process.env.REACT_APP_HOST + "/excelBookRes", { responseType: "blob" })
      )
      .then((res) => {
        const xlsxBlob = new Blob([res.data], { type: "application/xlsx" });
        saveAs(xlsxBlob, `bookReport.xlsx`);
      });
  }

  return (
    <div>
        <MyModal visible={modal} setVisible={setModal}>
        <CreateBookModal id={id} setVisible={setModal} />
      </MyModal>
      <MyModal visible={editModal} setVisible={setEditModal}>
        <EditBookModal setVisible={setEditModal} bookObj={bookObj} setBookObj={setBookObj} />
      </MyModal>
      <Container>

       <div style={{marginTop: '0.5rem'}} >

        <h5 style={{marginBottom: '3rem'}} >Кафедра: {cath}</h5>

       {book.massivItems.map(item =>
           <div key={item.id}>
             <Row className="bookItem" >
              <Col md={11} > {item.num}. {item.name}</Col>
              <Col> <Button onClick={() => addBook(item.id)} variant="primary">+</Button> </Col>
            </Row>
            {book.books.map(b => {
              if(b.item_id === item.id) {
                return (
                   <div className="books" key={b.id} >
                  <Row>
                    <Col md={mobile ? 10 : 11} >
                      <h5 style={{textAlign: 'center', marginBottom: '0'}} > {b.name}</h5>
                    </Col>
                    <Col>
                      <img onClick={() => editBook(b)} style={{ height: "25px", cursor: "pointer" }} src={edit} alt="" />
                      <img onClick={() => deleteBook(b.id)} style={{ height: "28px", cursor: "pointer", marginLeft: '0.5rem' }} src={trash} alt="" />
                    </Col>
                  </Row>
                   <div style={{display:'flex'}} >  
                    <p style={{marginBottom: '0', marginLeft: '0.5rem', fontFamily: 'Roboto'}} > Авторы:</p>
                    <p style={{marginBottom: '0', marginLeft: '1rem', fontFamily: 'Roboto'}} >{b.stringAuthors}</p>
                   </div>
                  </div>
                )
              }
            })}
           </div>
            )}
       </div>

        <Row style={{ marginTop: "3rem" }}>
          <Col lg={6}>
            <Button
              onClick={saveResult}
              style={{
                fontFamily: "var(--bs-body-font-family)",
                fontWeight: "500",
                marginTop: "15px",
              }}
              variant="primary"
            >
              Сохранить отчёт
            </Button>

            <Button
              onClick={cansel}
              style={{
                fontFamily: "var(--bs-body-font-family)",
                fontWeight: "500",
                marginTop: "15px",
                marginLeft: "10px",
              }}
              variant="dark"
            >
              Отмена
            </Button>
          </Col>
          <Col style={{display: 'flex', justifyContent: 'end'}} lg={6}>
          <Button
              onClick={createExcel}
              style={{
                fontFamily: "var(--bs-body-font-family)",
                fontWeight: "500",
                marginTop: "15px",
              }}
              variant="dark"
            >
              Вывод в эксель
            </Button>

          </Col>
        </Row>
      </Container>
    </div>
  );
});

export default CreateBooks;
