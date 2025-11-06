import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { handleError } from "../utils/errorHandler.js";

// Criar novo pedido
export const createOrder = async (req, res) => {
  try {
    const restaurante = req.userId;
    const { itens } = req.body;

    if (!itens || itens.length === 0)
      return handleError(res, 400, "O pedido precisa conter ao menos 1 item.");

    let total = 0;
    for (const item of itens) {
      const produto = await Product.findById(item.produto);
      if (!produto)
        return handleError(res, 404, `Produto não encontrado: ${item.produto}`);
      total += (produto.preco || 0) * (item.quantidade || 0);
    }

    const novoPedido = await Order.create({
      restaurante,
      itens,
      total,
    });

    res.status(201).json({
      sucesso: true,
      msg: "Pedido criado com sucesso.",
      pedido: novoPedido,
    });
  } catch (err) {
    return handleError(res, 500, "Erro ao criar pedido.");
  }
};

// Listar pedidos do restaurante logado
export const getOrders = async (req, res) => {
  try {
    const pedidos = await Order.find({ restaurante: req.userId })
      .populate("itens.produto", "nome preco imagem")
      .sort({ createdAt: -1 });

    res.json({ sucesso: true, pedidos });
  } catch (err) {
    return handleError(res, 500, "Erro ao listar pedidos.");
  }
};

// Atualizar status do pedido
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const permitido = ["pendente", "em preparo", "entregue"];
    if (!permitido.includes(status))
      return handleError(res, 400, "Status inválido.");

    const pedido = await Order.findOneAndUpdate(
      { _id: id, restaurante: req.userId },
      { status },
      { new: true }
    );

    if (!pedido) return handleError(res, 404, "Pedido não encontrado.");

    res.json({
      sucesso: true,
      msg: "Status atualizado com sucesso.",
      pedido,
    });
  } catch (err) {
    return handleError(res, 500, "Erro ao atualizar status do pedido.");
  }
};

// Deletar pedido
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Order.findOneAndDelete({
      _id: id,
      restaurante: req.userId,
    });

    if (!pedido) return handleError(res, 404, "Pedido não encontrado.");

    res.json({
      sucesso: true,
      msg: "Pedido removido com sucesso.",
    });
  } catch (err) {
    return handleError(res, 500, "Erro ao remover pedido.");
  }
};
