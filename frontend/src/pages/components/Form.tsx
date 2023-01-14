import { FC, useEffect, useState } from 'react';

type RequireKeys<T, TNames extends keyof T> = T &
  { [P in keyof T]-?: P extends TNames ? T[P] : never };

interface FormProps {
  createUser?: RequireKeys<any, "onClick">
  users?: any[]
  mode?: string
  editUser?: RequireKeys<any, "onClick">
  user?: any
}

const Form: FC<FormProps> = ({ createUser, users, mode, editUser, user }) => {
  const [newUser, setNewUser] = useState({
    newName: '',
    newEmail: ''
  });
  const { newName, newEmail } = newUser;

  const [userById, setUserById] = useState({
    id: 0,
    name: '',
    email: ''
  });
  const { name, email, id } = userById;

  const handleChange = ((name: string, value: string) => {
    setNewUser((prevState) => ({...prevState, [name]: value}))
  });

  useEffect(() => {
    if(user) {
      const { name, email, id } = user;
      setNewUser({
        newName: name,
        newEmail: email
      });
      setUserById({
        id,
        name,
        email
      })
    }
  }, [user]);

  const createNewUser = () => {
    const db = users?.some(({ name, email }) => name === newName || email === newEmail);
    if(db) {
      alert('Usuário Já Cadastrado')
    } else {
      createUser(newName, newEmail);
      setNewUser({
        newName: '',
        newEmail: ''
      });
    }
  }

  return (
    <form className='flex flex-col gap-4 justify-center'>
      <input
        type="text"
        value={ newName }
        name="newName"
        onChange={({ target: { name, value }}) => handleChange(name, value)}
        autoComplete="off"
        className="text-black"
      />
      <input
        type="email"
        value={ newEmail }
        name="newEmail"
        onChange={({ target: { name, value }}) => handleChange(name, value)}
        autoComplete="off"
        className="text-black"
      />
      {mode === 'create' && (
        <button
          type="button"
          onClick={() => createNewUser()}
        >
          Adicionar Cliente
        </button>
      )}
      {mode === 'edit' && (
        <button
          type="button"
          onClick={() => editUser(newName, newEmail, id)}
        >
          Editar Cliente
        </button>
      )}
    </form>
  );
}

export default Form;