import { createContext, useContext, useEffect, useState } from "react";
import axios from "../config/axios";
import { Loader } from "../components/complements/Loader";
import { alertSimple } from "../components/utils/alerts";

const UserContext = createContext();

const initialUserState = {
  userID: "",
  userName: "",
  email: "",
  role: "",
  cartID: "",
  isAdmin: false,
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUserState);
  const [isAuth, setIsAuth] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`/api/sessions/current`, {
        withCredentials: true,
      });

      setUser(response.data.message);
      if (response.data.message) {
        setIsAuth(true);
      } else {
        setUser(initialUserState);
        setIsAuth(false);
      }

      setLoading(false);
    } catch (error) {
      setError("Error al autenticar usuario");
      console.log(error);
      setLoading(false);
    }
  };

  const logOut = async () => {
    try {
      const response = await axios.post("/api/sessions/logout", null, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUser(initialUserState);
        setIsAuth(false);
        alertSimple("Sesion cerrada.");
      }
      checkAuthStatus();
    } catch (error) {
      alertIcon("No se pudo cerrar sesion", "error");
    }
  };

  if (loading) return <Loader />;

  return (
    <UserContext.Provider
      value={{ user, setUser, isAuth, setIsAuth, checkAuthStatus, logOut }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
