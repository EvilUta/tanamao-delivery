import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, senha });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setErro("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Painel do Restaurante</h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-3 w-80 bg-white p-6 shadow-md rounded-lg"
      >
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="border p-2 rounded"
        />
        <button className="bg-green-600 text-white py-2 rounded">
          Entrar
        </button>
        {erro && <p className="text-red-500 text-center">{erro}</p>}
      </form>
    </div>
  );
}
