import { useState } from "react";
import axios from "../../config/axios";
import { createRoot } from "react-dom/client";
import { alertSimple } from "../utils/alerts";

export const LogInForm = ({ onSwitch, checkAuthStatus }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `/api/sessions/login`,
        { userName, password },
        { withCredentials: true }
      );
      await checkAuthStatus();
      Swal.close();
      alertSimple(`Hola  ${userName}!`);
    } catch (error) {
      alert("error al obtener el usuario: " + error);
    }
  };
  return (
    <div>
      <h1>Iniciar sesión</h1>

      <form onSubmit={handleLogIn}>
        <label htmlFor="userName">Usuario: </label>
        <input
          type="text"
          name="userName"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          required
        />
        <br />
        <br />
        <label htmlFor="password">Contraseña: </label>
        <input
          type="text"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <br />
        <br />

        <button className="button" type="submit">
          Ingresar
        </button>
      </form>
      <a id="registerLink" className="pointer" onClick={onSwitch}>
        No tengo un usuario creado.
      </a>
    </div>
  );
};
const RegisterForm = ({ onSwitch, checkAuthStatus }) => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `api/sessions/register`,
        {
          first_name,
          last_name,
          userName,
          email,
          birth,
          password,
        },
        { withCredentials: true }
      );
      checkAuthStatus();
      Swal.close();
      alertSimple(`Hola  ${userName}!`);
    } catch (error) {
      alert("error al crear el usuario: " + error);
    }
  };

  return (
    <div className="">
      <h1>Registrar</h1>

      <form onSubmit={handleRegister}>
        <label htmlFor="first_name">Nombre: </label>
        <input
          type="text"
          name="first_name"
          onChange={(e) => setFirst_name(e.target.value)}
          value={first_name}
          required
        />
        <br />
        <br />
        <label htmlFor="last_name">Apellido: </label>
        <input
          type="text"
          name="last_name"
          onChange={(e) => setLast_name(e.target.value)}
          value={last_name}
          required
        />
        <br />
        <br />
        <label htmlFor="userName">Nombre de usuario: </label>
        <input
          type="text"
          name="userName"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          required
        />
        <br />
        <br />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <br />
        <br />
        <label htmlFor="birth">Fecha de Nacimiento: </label>
        <input
          type="date"
          name="birth"
          onChange={(e) => setBirth(e.target.value)}
          value={birth}
          required
        />
        <br />
        <br />
        <label htmlFor="password">Contraseña: </label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <br />
        <br />

        <button className="button" type="submit">
          Registrar
        </button>
      </form>
      <a id="logInLink" className="pointer" onClick={onSwitch}>
        Ya tengo un usuario.
      </a>
    </div>
  );
};

export const logInAlert = (checkAuthStatus) => {
  Swal.fire({
    html: '<div id="swal-login"></div>',

    showCloseButton: true,
    showConfirmButton: false,
    didRender: () => {
      const formDoc = document.getElementById("swal-login");
      if (formDoc) {
        const root = createRoot(formDoc);
        root.render(
          <LogInForm
            onSwitch={() => registerAlert(checkAuthStatus)}
            checkAuthStatus={checkAuthStatus}
          />
        );
      }
    },
  });
};
export const registerAlert = (checkAuthStatus) => {
  Swal.fire({
    html: '<div id="swal-login"></div>',

    showCloseButton: true,
    showConfirmButton: false,
    didRender: () => {
      const formDoc = document.getElementById("swal-login");
      if (formDoc) {
        const root = createRoot(formDoc);
        root.render(
          <RegisterForm
            onSwitch={() => logInAlert(checkAuthStatus)}
            checkAuthStatus={checkAuthStatus}
          />
        );
      }
    },
  });
};
