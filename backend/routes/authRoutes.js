import express from "express";
import { register, login } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import Restaurant from "../models/Restaurant.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// 🔒 rota protegida: retorna os dados do restaurante logado
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const restaurante = await Restaurant.findById(req.userId).select("-senha");
    if (!restaurante)
      return res.status(404).json({ msg: "Restaurante não encontrado" });

    res.json(restaurante);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

export default router;

