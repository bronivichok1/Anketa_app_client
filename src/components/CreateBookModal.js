import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useState } from "react";

const CreateBookModal = observer( ({ setVisible, id }) => {

  const [book, setBook] = useState({});

  return (
    <div >
      <h3 style={{textAlign: 'center', marginTop: '2rem'}} >
        Добавить книгу
      </h3>
      <div className="cath_modal">
        <input
          onChange={(e) => setBook({ ...book, name: e.target.value })}
          value={book.name || ''}
          type="text"
          placeholder="Введите название..."
          className="cusInput"
        />

        <div
        style={{fontWeight: 'bold'}}
        >
        <input
                style={{marginRight: '5px', marginLeft: '10px'}}
                checked={
                 book.type === 'книга' || ''
                }
                onChange={() => {
                 setBook({...book, type: 'книга'})
                }}
                name=''
                type="radio"
                id={'книга'}
                value='книга'
                className="yes_no"
              />
              <label className="yes_no" htmlFor={'книга'}>
              книга
              </label>

              <input
              style={{marginRight: '5px', marginLeft: '10px'}}
                checked={
                   book.type === 'статья' || ''
                }
                className="yes_no"
                onChange={() => {
                    setBook({...book, type: 'статья'})
                }}
                name=''
                type="radio"
                id={'статья'}
                value="статья"
              />
              <label className="yes_no" htmlFor={'статья'}>
             статья
              </label>
        </div>

        <input
          onChange={(e) => setBook({ ...book, protocol_num: e.target.value })}
          value={book.protocol_num || ''}
          type="text"
          placeholder="Введите номер протокола НМС..."
          className="cusInput"
        />

      <div
        style={{fontWeight: 'bold'}}
        >
        <input
                style={{marginRight: '5px', marginLeft: '10px'}}
                checked={
                 book.magaz_or_collection === 'журнал' || ''
                }
                onChange={() => {
                 setBook({...book, magaz_or_collection: 'журнал'})
                }}
                name=''
                type="radio"
                id={'журнал'}
                value='журнал'
                className="yes_no"
              />
              <label className="yes_no" htmlFor={'журнал'}>
              журнал
              </label>

              <input
              style={{marginRight: '5px', marginLeft: '10px'}}
                checked={
                   book.magaz_or_collection === 'сборник' || ''
                }
                className="yes_no"
                onChange={() => {
                    setBook({...book, magaz_or_collection: 'сборник'})
                }}
                name=''
                type="radio"
                id={'сборник'}
                value="сборник"
              />
              <label className="yes_no" htmlFor={'сборник'}>
             статья
              </label>
        </div>
        
        <select onChange={(e) => setBook({...book, database: e.target.value})} className="select" >
            <option value="">Выберите базу данных...</option>
            <option value="SCOPUS">SCOPUS</option>
            <option value="Web of Science">Web of Science</option>
            <option value="РИНЦ">РИНЦ</option>
        </select>

        <input
          onChange={(e) => setBook({ ...book, colvo_authors: e.target.value })}
          value={book.colvo_authors || ''}
          type="number"
          placeholder="Введите кол-во авторов..."
          className="cusInput"
        />
      
      </div>

      <div style={{ marginTop: "5rem" }}>
        <Button variant="dark" onClick={() => setVisible(false)}>
          Отменить
        </Button>
        <Button
          style={{ marginLeft: "5px" }}
          variant="primary"
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
})

export default CreateBookModal;