import { Button, Col, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "..";
import { useMediaQuery } from "react-responsive";
import trash from "./../imgs/trash_icon.svg";

const CreateBookModal = observer(({ setVisible, id }) => {
  const { book } = useContext(Context);

  const [bookObj, setBookObj] = useState({
    name: '',
    type: '',
    protocol_num: '',
    magaz_or_collection: null,
    database: null,
    colvo_authors: '',
    authors: []
  });
  const [author, setAuthor] = useState('');
  const mobile = useMediaQuery({ query: "(max-width: 900px)" });

 const addAuthor = () => {
  if(author) {
    const newAuthor = {
      id: Date.now(),
      name: author
    }
    setBookObj({...bookObj, authors: [...bookObj.authors, newAuthor]});
    setAuthor('');
  }
 }

 const addBook = () => {
  if (bookObj.name && bookObj.type && bookObj.protocol_num && bookObj.colvo_authors && bookObj.authors && bookObj.authors.length) {
    let stringAuthors = '';
    bookObj.authors.forEach(el => {
      stringAuthors += el.name + ', ';
    }) 
    book.setBooks([...book.books, {...bookObj, item_id: id, id: Date.now(), stringAuthors}]);
    setBookObj({
      name: '',
      type: '',
      protocol_num: '',
      magaz_or_collection: null,
      database: null,
      colvo_authors: '',
      authors: []
    });
    setVisible(false);
  } else {
    alert('Название, тип, номер протокола, кол-во авторов и ФИО авторов не могут быть пустыми!');
  }
 }

 const deleteAuth = (id) => {
  setBookObj({...bookObj, authors: [...bookObj.authors.filter(el => el.id !== id)]});
 }

  return (
    <div>
      <h3 style={{ textAlign: "center", marginTop: "2rem" }}>
        Добавить книгу/статью
      </h3>
      <div className="cath_modal">
        <input
          style={mobile ? {} : { minWidth: "850px" }}
          onChange={(e) => setBookObj({ ...bookObj, name: e.target.value })}
          value={bookObj.name}
          type="text"
          placeholder="Введите название..."
          className="cusInput"
        />

        <div
          style={{
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            margin: "0.5rem 0",
          }}
        >
          <input
            style={{
              marginRight: "5px",
              marginLeft: "15px",
              marginTop: "14px",
            }}
            checked={bookObj.type === "книга"}
            onChange={() => {
              setBookObj({ ...bookObj, type: "книга" });
            }}
            name=""
            type="radio"
            id={"книга"}
            value="книга"
            className="yes_no"
          />
          <label className="yes_no" htmlFor={"книга"}>
            книга
          </label>

          <input
            style={{
              marginRight: "5px",
              marginLeft: "15px",
              marginTop: "14px",
            }}
            checked={bookObj.type === "статья"}
            className="yes_no"
            onChange={() => {
              setBookObj({ ...bookObj, type: "статья" });
            }}
            name=""
            type="radio"
            id={"статья"}
            value="статья"
          />
          <label className="yes_no" htmlFor={"статья"}>
            статья
          </label>
        </div>

        <input
          style={{ marginTop: "0.5rem" }}
          onChange={(e) =>
            setBookObj({ ...bookObj, protocol_num: e.target.value })
          }
          value={bookObj.protocol_num}
          type="text"
          placeholder="Введите номер протокола НМС..."
          className="cusInput"
        />

        {bookObj && bookObj.type === "статья" ? (
          <div
            style={{
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              margin: "0.5rem 0",
            }}
          >
            <input
              style={{
                marginRight: "5px",
                marginLeft: "15px",
                marginTop: "14px",
              }}
              checked={bookObj.magaz_or_collection === "журнал"}
              onChange={() => {
                setBookObj({ ...bookObj, magaz_or_collection: "журнал" });
              }}
              name=""
              type="radio"
              id={"журнал"}
              value="журнал"
              className="yes_no"
            />
            <label className="yes_no" htmlFor={"журнал"}>
              журнал
            </label>

            <input
              style={{
                marginRight: "5px",
                marginLeft: "15px",
                marginTop: "14px",
              }}
              checked={bookObj.magaz_or_collection === "сборник"}
              className="yes_no"
              onChange={() => {
                setBookObj({ ...bookObj, magaz_or_collection: "сборник" });
              }}
              name=""
              type="radio"
              id={"сборник"}
              value="сборник"
            />
            <label className="yes_no" htmlFor={"сборник"}>
              сборник
            </label>
          </div>
        ) : (
          <></>
        )}

        {bookObj && bookObj.type === "статья" ? (
          <select
            style={{ marginTop: "0.5rem" }}
            onChange={(e) =>
              setBookObj({ ...bookObj, database: e.target.value })
            }
            className="select"
          >
            <option value="">Выберите базу данных...</option>
            <option value="SCOPUS">SCOPUS</option>
            <option value="Web of Science">Web of Science</option>
            <option value="РИНЦ">РИНЦ</option>
          </select>
        ) : (
          <></>
        )}

        <input
          style={{ marginTop: "1.5rem" }}
          onChange={(e) =>
            setBookObj({ ...bookObj, colvo_authors: Number(e.target.value) })
          }
          value={bookObj.colvo_authors}
          type="number"
          placeholder="Введите кол-во авторов..."
          className="cusInput"
        />
      </div>

        <div className="authors" >
          <h5 style={{textAlign: 'center'}} >Авторы</h5>

         <Row style={{ marginTop: "1rem", marginBottom: '1rem' }}>
          <Col md={10} > <input
          onChange={(e) =>
            setAuthor(e.target.value)
          }
          value={author}
          type="text"
          placeholder="Введите ФИО автора..."
          className="cusInput"
        /></Col>
        <Col>
        <Button onClick={addAuthor} style={{marginTop: '5px'}} variant="primary" >Добавить</Button>
        </Col>
         </Row>

          { bookObj.authors.map(auth =>
            <Row style={{fontWeight: '600', fontSize: '18px'}} key={auth.id} >
              <Col md={10} > <p style={{textAlign: 'center', marginBottom: '0'}} > {auth.name}</p></Col>
              <Col><img onClick={() => deleteAuth(auth.id)} style={{ height: "28px", cursor: "pointer", marginLeft: '0.5rem' }} src={trash} alt="" /></Col>
            </Row>
            )}
          
        </div>

      <div style={{ marginTop: "5rem" }}>
        <Button variant="dark" onClick={() => setVisible(false)}>
          Отменить
        </Button>
        <Button onClick={addBook} style={{ marginLeft: "5px" }} variant="primary">
          Сохранить
        </Button>
      </div>
    </div>
  );
});

export default CreateBookModal;
