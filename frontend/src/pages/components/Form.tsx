import { FC, useEffect, useState } from 'react';

type RequireKeys<T, TNames extends keyof T> = T &
  { [P in keyof T]-?: P extends TNames ? T[P] : never };

interface FormProps {
  createUser?: RequireKeys<any, "onClick">
  users?: any[]
  mode?: string
  editUser?: RequireKeys<any, "onClick">
  user?: any
  setFormMode?: any
}

const Form: FC<FormProps> = ({ createUser, users, mode, editUser, user, setFormMode }) => {
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
  const { id } = userById;

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
    <div className="bg-zinc-200 w-[60%] h-[400px] rounded-lg z-50 fixed flex flex-col justify-center gap-10">
      <div className="flex flex-col m-auto gap-5">
        <h2
        className="text-zinc-700 font-semibold"
        >
          {`${mode === 'create' ? 'Cadastre um novo cliente preenchendo' : 'Edite o cliente modificando'}  os campos abaixo`}
        </h2>
        <form className="flex flex-col justify-center">
          <label className="label">
            <span className="label-text text-zinc-700">Digite o nome do cliente</span>
          </label>
          <input
            type="text"
            value={ newName }
            name="newName"
            onChange={({ target: { name, value }}) => handleChange(name, value)}
            autoComplete="off"
            className="py-2 px-3 rounded-lg bg-zinc-300 mt-2 border focus:border-violet-500
            focus:outline-none focus:bg-zinc-100 w-full max-w-lg text-zinc-700 transition-colors"
          />
          <label className="label">
            <span className="label-text text-zinc-700">Digite o email do cliente</span>
          </label>
          <input
            type="email"
            value={ newEmail }
            name="newEmail"
            onChange={({ target: { name, value }}) => handleChange(name, value) }
            autoComplete="off"
            className="py-2 px-3 rounded-lg bg-zinc-300 mt-2 border focus:border-violet-500
            focus:outline-none focus:bg-zinc-100 w-full max-w-lg text-zinc-700 transition-colors"
          />
        </form>
      </div>
      <div className="p-5 flex gap-4 justify-end">
        <button
          type="button"
          className="btn btn-error"
          onClick={() => setFormMode('')}
        >
          Fechar
        </button>
        {mode === 'create' && (
          <button
            type="button"
            onClick={() => createNewUser()}
            className="btn btn-success transition-opacity"
            disabled={ !/\S+@\w+\.\w+/i.test(newEmail) }
          >
            Adicionar Cliente
          </button>
        )}
        {mode === 'edit' && (
          <button
            type="button"
            onClick={() => editUser(newName, newEmail, id)}
            className="btn btn-warning"
            disabled={ !/\S+@\w+\.\w+/i.test(newEmail) }
          >
            Editar Cliente
          </button>
        )}
      </div>
    </div>
  );
}

export default Form;