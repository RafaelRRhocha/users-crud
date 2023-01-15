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
    <div className="max-w-[60%] m-auto flex flex-col gap-2 h-[100vh]">
      <div className="flex justify-end mt-[10%]">
        {formMode === '' && (
          <button
            type="button"
            onClick={() => {
              setFormMode('create')
            }}
            className="btn-sm btn-success w-[200px] rounded-lg"
          >
            Novo Cliente
          </button>
        )}
      </div>
      <div>
        {formMode === 'create' && (
          <Form
            createUser={ createUser }
            users={ users }
            mode={ formMode }
            setFormMode={ setFormMode }
          />
        )}
        {formMode === 'edit' && (
          <Form
            user={user}
            editUser={ editUser }
            mode={ formMode }
            setFormMode={ setFormMode }
          />
        )}
      </div>
      {users.length === 0 || users === null || formMode === 'create' || formMode === 'edit'  ? (
        <p className="text-center p-4">Nenhum Cliente Cadastrado</p>
      ) : (
        <div className="overflow-x-auto max-h-[450px]">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Editar/Excluir</th>
              </tr>
            </thead>
            <tbody>
            {users.map(({ id, name, email}) => (
                <tr key={ id }>
                  <th>{ id }</th>
                  <th>{ name }</th>
                  <th>{ email }</th>
                  <td className="flex gap-4 items-center">
                    <button
                      type="button"
                      onClick={() => {
                        setFormMode(formMode === 'edit' ? '' : 'edit')
                        getUserById(id)
                      }}
                    >
                      <ArrowSquareIn size={ 25 } color="#37B789" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeUser(id)}
                    >
                      <Trash size={ 25 } color="#ED0606" />
                    </button>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
