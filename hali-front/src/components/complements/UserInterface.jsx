import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";

const UserInterface = () => {
  const { logOut, user, isAuth } = useUser();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
    getTickets();
    console.log(tickets);
  }, [isAuth]);

  const getTickets = async () => {
    try {
      const response = await axios.get(`/api/tickets/${user.userID}`, {
        withCredential: true,
      });
      setTickets(response.data);

      return;
    } catch (error) {
      console.error("Problemas con los tickets: " + error);
    }
  };

  return (
    <div className="container">
      <div className="user">
        <button onClick={() => logOut()}>log out</button>
        <p>Hola {user.userName}!</p>
        <p>Tu email: {user.email}</p>
        <table border="1">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Producto(s)</th>
              <th> Unidades </th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td>-/-/--</td>
                <td>No se han hecho compras aun.</td>
                <td>0</td>
                <td>$0</td>
              </tr>
            ) : (
              tickets.map((ticket, index) => {
                <tr key={index}>
                  <td>
                    {new Date(ticket.purchase_datetime).toLocaleDateString()}
                  </td>
                </tr>;
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserInterface;
