import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// // importacion para firebase

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ItemListContainer } from "./components/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer";

import { Cart } from "./components/Cart";
import { AdminPage } from "./components/AdminPage";
import { UserProvider } from "./contexts/UserContext";
import { ItemProvider } from "./contexts/ItemContext";
import UserInterface from "./components/complements/userInterface";

function App() {
  return (
    <>
      <UserProvider>
        <ItemProvider>
          <BrowserRouter>
            {location.pathname !== "/haliadmin" && <Header />}
            <Routes>
              <Route path="/" element={<ItemListContainer />} />

              <Route path="/profile" element={<UserInterface />} />

              <Route path="/category/:id" element={<ItemListContainer />} />

              <Route path="/item/:id" element={<ItemDetailContainer />} />

              <Route path="/cart" element={<Cart />} />

              <Route path="/haliadmin" element={<AdminPage />} />

              <Route path="*" element={"404"} />
            </Routes>
            {location.pathname !== "/haliadmin" && <Footer />}
          </BrowserRouter>
        </ItemProvider>
      </UserProvider>
    </>
  );
}

export default App;
