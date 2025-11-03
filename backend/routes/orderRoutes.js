import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ mensagem: "Pedidos funcionando!" });
});

export default router;
