import React, { useState } from "react";
import api from "../services/api";

export default function LoginAdmin() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      setMsg("✅ Login realizado com sucesso!");
      window.location.href = "/dashboard"; // redireciona
    } catch (err) {
      setMsg(err.response?.data?.msg || "Erro ao fazer login");
    }
  };

  return (
    <main className="max-w-md mx-auto p-6 pt-28">
      <h1 className="text-2xl font-bold mb-4">Login Restaurante</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          Entrar
        </button>
      </form>
      {msg && <p className="mt-4 text-center text-sm">{msg}</p>}
    </main>
  );
}
