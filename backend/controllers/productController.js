import mongoose from "mongoose";
import Product from "../models/Product.js";
import Restaurant from "../models/Restaurant.js";
import { handleError } from "../utils/errorHandler.js";

export const createProduct = async (req, res) => {
  try {
    const restauranteId = req.userId;
    const { nome, descricao, preco, imagem } = req.body;

    if (!nome || !preco)
      return handleError(res, 400, "Nome e preço são obrigatórios.");

    if (!mongoose.Types.ObjectId.isValid(restauranteId))
      return handleError(res, 400, "ID de restaurante inválido.");

    const restaurante = await Restaurant.findById(restauranteId);
    if (!restaurante)
      return handleError(res, 404, "Restaurante não encontrado.");

    const novoProduto = await Product.create({
      nome,
      descricao,
      preco,
      imagem,
      restaurante: restaurante._id,
    });

    res.status(201).json({
      sucesso: true,
      msg: "Produto criado com sucesso.",
      produto: novoProduto,
    });
  } catch (err) {
    return handleError(res, 500, "Erro ao criar produto.");
  }
};

export const getProducts = async (req, res) => {
  try {
    const produtos = await Product.find({ restaurante: req.userId });
    res.json({ sucesso: true, produtos });
  } catch (err) {
    return handleError(res, 500, "Erro ao listar produtos.");
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const atualizado = await Product.findOneAndUpdate(
      { _id: id, restaurante: req.userId },
      req.body,
      { new: true }
    );

    if (!atualizado)
      return handleError(res, 404, "Produto não encontrado.");

    res.json({
      sucesso: true,
      msg: "Produto atualizado com sucesso.",
      produto: atualizado,
    });
  } catch (err) {
    return handleError(res, 500, "Erro ao atualizar produto.");
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletado = await Product.findOneAndDelete({
      _id: id,
      restaurante: req.userId,
    });

    if (!deletado)
      return handleError(res, 404, "Produto não encontrado.");

    res.json({
      sucesso: true,
      msg: "Produto removido com sucesso.",
    });
  } catch (err) {
    return handleError(res, 500, "Erro ao remover produto.");
  }
};
