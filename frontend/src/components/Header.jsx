import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ carrinho }) {
  const navigate = useNavigate();
  const count = carrinho.length;

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo e textos */}
        <div className="flex items-center gap-4 select-none cursor-pointer" onClick={() => navigate("/")}>
          {/* Logo */}
          <img
            src="/imagens/logo.png"
            alt="TáNaMão Delivery"
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-sm"
          />
          {/* Textos */}
          <div className="flex flex-col leading-tight">
            <h1 className="text-[17px] sm:text-[18px] font-bold text-gray-800 tracking-tight">
              TáNaMão Delivery
            </h1>
            <p className="text-[13px] text-gray-500">Peça já seu lanche!</p>
          </div>
        </div>

        {/* Botão do carrinho */}
        <button
          onClick={() => navigate("/carrinho")}
          className="relative border border-gray-200 hover:bg-gray-50 rounded-lg p-2.5 transition-all flex items-center justify-center"
          aria-label="Abrir carrinho"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#111827CC"
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
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] leading-none font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
