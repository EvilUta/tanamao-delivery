import Restaurant from "../models/Restaurant.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleError } from "../utils/errorHandler.js"; // usa seu handler

// 🔹 Registrar restaurante
export const register = async (req, res) => {
  try {
    const { nome, email, senha, whatsapp } = req.body;

    // Verifica se o corpo foi recebido
    if (!req.body || Object.keys(req.body).length === 0) {
      return handleError(res, 400, "Nenhum dado enviado. Verifique o corpo da requisição (JSON).");
    }

    // Verifica campos obrigatórios
    if (!nome || !email || !senha || !whatsapp) {
      return handleError(res, 400, "Preencha todos os campos obrigatórios (nome, email, senha, whatsapp).");
    }

    // Verifica se já existe restaurante com esse email
    const existente = await Restaurant.findOne({ email });
    if (existente) {
      return handleError(res, 400, "Esse email já está cadastrado.");
    }

    // Criptografa senha
    const hashed = await bcrypt.hash(senha, 10);

    // Cria e salva
    const novo = new Restaurant({ nome, email, senha: hashed, whatsapp });
    await novo.save();

    return res.status(201).json({
      sucesso: true,
      mensagem: "Restaurante cadastrado com sucesso!",
      restaurante: {
        id: novo._id,
        nome: novo.nome,
        email: novo.email,
        whatsapp: novo.whatsapp,
      },
    });
  } catch (err) {
    console.error("❌ Erro no registro:", err);
    return handleError(res, 500, "Erro interno ao registrar restaurante.");
  }
};

// 🔹 Login do restaurante
export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return handleError(res, 400, "Informe email e senha.");
    }

    const restaurante = await Restaurant.findOne({ email });
    if (!restaurante) {
      return handleError(res, 404, "Restaurante não encontrado.");
    }

    const senhaCorreta = await bcrypt.compare(senha, restaurante.senha);
    if (!senhaCorreta) {
      return handleError(res, 401, "Senha incorreta.");
    }

    const token = jwt.sign(
      { id: restaurante._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      sucesso: true,
      mensagem: "Login realizado com sucesso!",
      token,
      restaurante: {
        id: restaurante._id,
        nome: restaurante.nome,
        email: restaurante.email,
      },
    });
  } catch (err) {
    console.error("❌ Erro no login:", err);
    return handleError(res, 500, "Erro interno ao realizar login.");
  }
};
