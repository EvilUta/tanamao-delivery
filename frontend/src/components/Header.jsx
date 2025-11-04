import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ carrinho }) {
  const navigate = useNavigate();
  const count = carrinho.length;

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo e textos */}
        <div className="flex items-center gap-3 select-none">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shadow-sm">
            {/* Ícone "chave inglesa" branco */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 21l6-6" />
              <path d="M15.5 7.5a3.5 3.5 0 1 0-5 5L19 21l2-2L15.5 7.5z" />
            </svg>
          </div>
          <div>
            <h1 className="text-[15px] font-semibold text-gray-800">
              Sistema Delivery
            </h1>
            <p className="text-[12px] text-gray-500">Peça já seu lanche!</p>
          </div>
        </div>

        {/* Botão do carrinho */}
        <button
          onClick={() => navigate("/carrinho")}
          className="relative border border-gray-200 hover:bg-gray-50 rounded-md p-2 transition-colors"
          aria-label="Abrir carrinho"
        >
          {/* Ícone de carrinho */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#11182799"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 12.39A2 2 0 0 0 9.62 15H19a2 2 0 0 0 2-1.72L22.64 7H6"></path>
          </svg>

          {/* Badge vermelho */}
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] leading-none font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
