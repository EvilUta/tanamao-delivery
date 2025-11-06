import { useEffect, useState } from "react";
import api from "../services/api";

export default function DashboardAdmin() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [msg, setMsg] = useState("");

  const carregarProdutos = async () => {
    const res = await api.get("/produtos");
    setProdutos(res.data.produtos || []);
  };

  const criarProduto = async (e) => {
    e.preventDefault();
    try {
      await api.post("/produtos", { nome, preco, descricao });
      setNome("");
      setPreco("");
      setDescricao("");
      setMsg("Produto criado com sucesso!");
      carregarProdutos();
    } catch {
      setMsg("Erro ao criar produto.");
    }
  };

  const deletarProduto = async (id) => {
    try {
      await api.delete(`/produtos/${id}`);
      setMsg("Produto removido com sucesso!");
      carregarProdutos();
    } catch {
      setMsg("Erro ao remover produto.");
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gerenciar Produtos</h2>

      <form onSubmit={criarProduto} className="flex gap-2 mb-4">
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button className="bg-green-600 text-white p-2 rounded">Adicionar</button>
      </form>

      {msg && <p className="text-blue-600 mb-2">{msg}</p>}

      <ul className="space-y-2">
        {produtos.map((p) => (
          <li key={p._id} className="flex justify-between border p-2 rounded">
            <span>
              {p.nome} — R$ {p.preco}
            </span>
            <button
              onClick={() => deletarProduto(p._id)}
              className="text-red-600"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
