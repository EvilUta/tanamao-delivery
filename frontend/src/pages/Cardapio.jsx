import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Cardapio({ carrinho, setCarrinho }) {
  const [produtos, setProdutos] = useState([]);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    api.get("/api/produtos").then((res) => setProdutos(res.data));
  }, []);

  const adicionar = (produto) => {
    setCarrinho((prev) => [...prev, produto]);
    setPopup(produto);

    // Fecha o popup automaticamente após 2,5 segundos
    setTimeout(() => setPopup(null), 2500);
  };

  return (
    <main className="pt-24 max-w-5xl mx-auto p-4 relative">
      <h2 className="text-2xl font-bold mb-2">🍔 Cardápio</h2>
      <p className="text-gray-500 mb-6">Monte seu pedido e envie via WhatsApp!</p>

      {/* Grid dos produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produtos.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center text-center"
          >
            <img
              src={p.imagem}
              alt={p.nome}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h3 className="font-semibold text-lg">{p.nome}</h3>
            <p className="text-green-600 font-bold mb-2">
              R$ {p.preco.toFixed(2)}
            </p>
            <button
              onClick={() => adicionar(p)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Adicionar
            </button>
          </div>
        ))}
      </div>

      {/* Popup de confirmação */}
      {popup && (
        <div className="fixed bottom-5 right-5 bg-white shadow-lg border border-gray-200 rounded-lg px-4 py-3 animate-slideIn flex items-center gap-3">
          <span className="text-green-600 text-xl">✅</span>
          <div>
            <p className="text-sm text-gray-700 font-semibold">
              {popup.nome} adicionado!
            </p>
            <p className="text-gray-500 text-xs">
              R$ {popup.preco.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
