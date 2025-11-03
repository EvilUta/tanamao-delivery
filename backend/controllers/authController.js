import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Restaurant from "../models/Restaurant.js";

dotenv.config();

export const register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const restauranteExistente = await Restaurant.findOne({ email });
    if (restauranteExistente)
      return res.status(400).json({ mensagem: "Email já cadastrado." });

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoRestaurante = new Restaurant({ nome, email, senha: senhaHash });
    await novoRestaurante.save();

    res.status(201).json({ mensagem: "Restaurante cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao registrar restaurante." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const restaurante = await Restaurant.findOne({ email });
    if (!restaurante)
      return res.status(404).json({ mensagem: "Restaurante não encontrado." });

    const senhaValida = await bcrypt.compare(senha, restaurante.senha);
    if (!senhaValida)
      return res.status(401).json({ mensagem: "Senha incorreta." });

    const token = jwt.sign(
      { id: restaurante._id, email: restaurante.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ mensagem: "Login bem-sucedido!", token });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao fazer login." });
  }
};
