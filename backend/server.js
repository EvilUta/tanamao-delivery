import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 8000,
  })
  .then(() => console.log("✅ MongoDB conectado com sucesso"))
  .catch((err) => console.error("❌ Erro ao conectar MongoDB:", err.message));

app.get("/", (req, res) => {
  res.send("API TáNaMão está rodando 🚀");
});

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
