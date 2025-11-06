import Restaurant from "../models/Restaurant.js";
import { handleError } from "../utils/errorHandler.js";

export const listarRestaurantes = async (req, res) => {
  try {
    const restaurantes = await Restaurant.find();
    res.json({ sucesso: true, restaurantes });
  } catch (error) {
    return handleError(res, 500, "Erro ao listar restaurantes.");
  }
};

export const obterRestaurante = async (req, res) => {
  try {
    const restaurante = await Restaurant.findById(req.params.id);
    if (!restaurante)
      return handleError(res, 404, "Restaurante não encontrado.");
    res.json({ sucesso: true, restaurante });
  } catch (error) {
    return handleError(res, 500, "Erro ao obter restaurante.");
  }
};
