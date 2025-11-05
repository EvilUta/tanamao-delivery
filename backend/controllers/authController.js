import Restaurant from "../models/Restaurant.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { nome, email, senha, whatsapp } = req.body;

    const existe = await Restaurant.findOne({ email });
    if (existe) return res.status(400).json({ msg: "Email já cadastrado" });

    const hashed = await bcrypt.hash(senha, 10);
    const novo = new Restaurant({ nome, email, senha: hashed, whatsapp });
    await novo.save();

    res.status(201).json({ msg: "Restaurante cadastrado com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const restaurante = await Restaurant.findOne({ email });
    if (!restaurante) return res.status(404).json({ msg: "Usuário não encontrado" });

    const match = await bcrypt.compare(senha, restaurante.senha);
    if (!match) return res.status(401).json({ msg: "Senha incorreta" });

    const token = jwt.sign(
      { id: restaurante._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, restaurante });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
