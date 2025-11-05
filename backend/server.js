import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Rotas
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"; // 👈 nova rota adicionada

// Carrega variáveis do config.env
dotenv.config({ path: "./backend/config.env" });

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { serverSelectionTimeoutMS: 8000 })
  .then(() => console.log("✅ MongoDB conectado com sucesso"))
  .catch((err) => console.error("❌ Erro ao conectar MongoDB:", err.message));

// Rotas da API
app.use("/api/auth", authRoutes);
app.use("/api/produtos", productRoutes);
app.use("/api/pedidos", orderRoutes);

// Rota base
app.get("/", (req, res) => {
  res.send("API TáNaMão está rodando 🚀");
});

// Inicialização do servidor
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
