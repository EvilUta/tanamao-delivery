import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function DashboardAdmin() {
  const [restaurante, setRestaurante] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return (window.location.href = "/login-admin");

    // Exemplo: rota futura de perfil
    api
      .get("/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setRestaurante(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/login-admin";
      });
  }, []);

  return (
    <main className="max-w-3xl mx-auto p-6 pt-24">
      <h1 className="text-2xl font-bold mb-4">Painel do Restaurante</h1>
      {restaurante ? (
        <div>
          <p>🍔 Nome: {restaurante.nome}</p>
          <p>📧 Email: {restaurante.email}</p>
          <p>📱 WhatsApp: {restaurante.whatsapp}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </main>
  );
}
