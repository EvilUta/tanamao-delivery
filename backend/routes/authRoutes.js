import express from "express";
import { register, login } from "../controllers/authController.js";
import { verificarToken } from "../middleware/authMiddleware.js";
import Restaurant from "../models/Restaurant.js";

const router = express.Router();

// Rota pública - registro e login
router.post("/register", register);
router.post("/login", login);

// 🔒 Rota protegida - dados do restaurante logado
router.get("/me", verificarToken, async (req, res) => {
  try {
    const restaurante = await Restaurant.findById(req.userId).select("-senha");
    if (!restaurante) {
      return res.status(404).json({ msg: "Restaurante não encontrado" });
    }
    res.json(restaurante);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

export default router;
