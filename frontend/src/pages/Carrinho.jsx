import React from "react";

export default function Carrinho({ carrinho, setCarrinho }) {
  const total = carrinho.reduce((acc, item) => acc + item.preco, 0);

  const enviarWhatsApp = () => {
    if (carrinho.length === 0) {
      alert("Adicione algo ao carrinho primeiro 🍔");
      return;
    }

    const numero = "5515988163876"; // <- Substitua pelo número real (DDI + DDD + número)
    const cliente = "Renan Gustavo"; // <- Você pode futuramente puxar esse nome de um input
    const data = new Date();
    const horario = data.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // ✅ Mensagem formatada com cliente, data, pedido e total
    const mensagem =
      `🧍 *Cliente:* ${cliente}\n` +
      `⏰ *Horário:* ${horario}\n` +
      "────────────────────\n" +
      "🍔 *NOVO PEDIDO* 🍟\n" +
      "────────────────────\n" +
      carrinho.map((p) => `• ${p.nome} - R$ ${p.preco.toFixed(2)}`).join("\n") +
      "\n────────────────────\n" +
      `💰 *TOTAL:* R$ ${total.toFixed(2)}\n`;

    const url = `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(
      mensagem
    )}`;
    window.open(url, "_blank");
  };

  const limparCarrinho = () => setCarrinho([]);

  return (
    <main className="pt-24 max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">🛒 Seu Carrinho</h2>
      <p className="text-gray-500 mb-6">Confira seu pedido antes de enviar.</p>

      {carrinho.length === 0 ? (
        <p className="text-gray-600 text-center mt-10">
          Seu carrinho está vazio 😢
        </p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 mb-6">
            {carrinho.map((item, i) => (
              <li
                key={i}
                className="flex justify-between items-center py-3 text-gray-800"
              >
                <span>{item.nome}</span>
                <span className="font-semibold">
                  R$ {item.preco.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Total: R$ {total.toFixed(2)}</h3>
            <button
              onClick={limparCarrinho}
              className="text-sm text-red-500 hover:underline"
            >
              Esvaziar carrinho
            </button>
          </div>

          <button
            onClick={enviarWhatsApp}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Enviar Pedido via WhatsApp
          </button>
        </>
      )}
    </main>
  );
}
