import axios from "axios";
import { ArrowSquareIn, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import Form from "./components/Form";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: '',
    email: '',
    id: 0
  });
  const [formMode, setFormMode] = useState('');

  useEffect(() => getUsers(), []);
  
  const getUsers = () => {
    axios
    .get('http://localhost:3001/users')
    .then((response) => {
      const { data } = response;
      setUsers(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
  };

  const getUserById = (id: number) => {
    axios
    .get(`http://localhost:3001/users/${id}`)
    .then((response) => {
      const { data } = response;
      setUser(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

  const createUser = (userName: string, email: string) => {
    axios
     .post('http://localhost:3001/users', {
        name: userName,
        email,
      })
     .then(() => {
        getUsers();
        setFormMode('');
     })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const editUser = (name: string, email: string, id: number) => {
    axios
     .put(`http://localhost:3001/users/${id}`, {
        name,
        email,
      })
     .then(() => {
        getUsers();
        setFormMode('');
     })
     .catch((err) => {
        console.log(err.message);
      });
  }

  const removeUser = (id: number) => {
    axios
    .delete(`http://localhost:3001/users/${id}`)
    .then(() => {
       getUsers();
       setFormMode('');
     });
  };

  return (
    <>
      <div className="flex flex-col justify-center gap-4">
        <button
          type="button"
          onClick={() => setFormMode(formMode === 'create' ? '' : 'create')}
        >
          Criar Cliente
        </button>
        <div>
          {formMode === 'create' && (
            <Form
              createUser={ createUser }
              users={ users }
              mode={ formMode }
            />
          )}
          {formMode === 'edit' && (
            <Form
              user={user}
              editUser={ editUser }
              mode={ formMode }
            />
          )}
        </div>
      </div>
      {users.length === 0 || users === null ? (
        <div>
          <p>Nenhum Cliente Cadastrado</p>
        </div>
      ) : (
        <div>
          {users.map(({ id, name, email}) => (
              <div key={ id } className="flex gap-4 justify-center items-center">
                <p>{ name }</p>
                <p>{ email }</p>
                <button
                  type="button"
                  onClick={() => removeUser(id)}
                >
                  <Trash size={ 25 } />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormMode(formMode === 'edit' ? '' : 'edit')
                    getUserById(id)
                  }}
                >
                  <ArrowSquareIn size={ 25 } />
                </button>
              </div>
            ))
          }
        </div>
      )}
    </>
  )
}
