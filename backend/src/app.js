import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rota teste
app.get("/", (req, res) => res.send("API do Delivery funcionando 🚀"));

// Rota de produtos
app.get("/api/produtos", (req, res) => {
  const produtos = [
    { id: 1, nome: "X-Bacon", preco: 22.9, imagem: "https://i.imgur.com/2s8h2ZQ.png" },
    { id: 2, nome: "X-Salada", preco: 18.5, imagem: "https://i.imgur.com/3fZQv3V.png" },
    { id: 3, nome: "Batata Frita", preco: 12.0, imagem: "https://i.imgur.com/0zNnK8V.png" },
    { id: 4, nome: "Suco Natural", preco: 8.0, imagem: "https://i.imgur.com/3w0b4MQ.png" },
  ];
  res.json(produtos);
});

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
