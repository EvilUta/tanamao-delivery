import Restaurant from "../models/Restaurant.js";

export const listarRestaurantes = async (req, res) => {
  try {
    const restaurantes = await Restaurant.find();
    res.json(restaurantes);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar restaurantes." });
  }
};

export const obterRestaurante = async (req, res) => {
  try {
    const restaurante = await Restaurant.findById(req.params.id);
    if (!restaurante)
      return res.status(404).json({ mensagem: "Restaurante não encontrado." });
    res.json(restaurante);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao obter restaurante." });
  }
};
