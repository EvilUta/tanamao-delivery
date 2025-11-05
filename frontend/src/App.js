import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Cardapio from "./pages/Cardapio";
import Carrinho from "./pages/Carrinho";
import LoginAdmin from "./pages/LoginAdmin";
import DashboardAdmin from "./pages/DashboardAdmin";

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
        {/* Login do restaurante */}
        <Route path="/login-admin" element={<LoginAdmin />} />
        {/* Dashboard pós-login */}
        <Route path="/dashboard" element={<DashboardAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;



