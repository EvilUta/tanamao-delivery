import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: "Token não fornecido" });

  const token = authHeader.split(" ")[1]; // Pega só o token depois de "Bearer"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // salva o ID do restaurante logado
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token inválido ou expirado" });
  }
};
