import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Cardapio from "./pages/Cardapio";
import Carrinho from "./pages/Carrinho";

function App() {
  const [carrinho, setCarrinho] = useState([]);

  return (
    <Router>
      <Header carrinho={carrinho} />
      <Routes>
        <Route
          path="/"
          element={<Cardapio carrinho={carrinho} setCarrinho={setCarrinho} />}
        />
        <Route
          path="/carrinho"
          element={<Carrinho carrinho={carrinho} setCarrinho={setCarrinho} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

