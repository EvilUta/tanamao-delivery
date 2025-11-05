import mongoose from "mongoose";
import Product from "../models/Product.js";
import Restaurant from "../models/Restaurant.js";

// Criar produto
export const createProduct = async (req, res) => {
  try {
    const restauranteId = req.userId;

    // 🔎 Verifica se o ID é válido e se o restaurante existe
    if (!mongoose.Types.ObjectId.isValid(restauranteId)) {
      return res.status(400).json({ msg: "ID de restaurante inválido" });
    }

    const restaurante = await Restaurant.findById(restauranteId);
    if (!restaurante) {
      return res.status(404).json({ msg: "Restaurante não encontrado" });
    }

    const { nome, descricao, preco, imagem } = req.body;

    const novoProduto = await Product.create({
      nome,
      descricao,
      preco,
      imagem,
      restaurante: restaurante._id, // vincula o produto ao restaurante
    });

    res.status(201).json(novoProduto);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Listar produtos do restaurante logado
export const getProducts = async (req, res) => {
  try {
    const produtos = await Product.find({ restaurante: req.userId });
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Atualizar produto
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const atual = await Product.findOneAndUpdate(
      { _id: id, restaurante: req.userId },
      req.body,
      { new: true }
    );
    if (!atual) return res.status(404).json({ msg: "Produto não encontrado" });
    res.json(atual);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Deletar produto
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletado = await Product.findOneAndDelete({
      _id: id,
      restaurante: req.userId,
    });
    if (!deletado)
      return res.status(404).json({ msg: "Produto não encontrado" });
    res.json({ msg: "Produto removido com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
