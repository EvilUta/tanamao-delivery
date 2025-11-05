import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Criar novo pedido
export const createOrder = async (req, res) => {
  try {
    const restaurante = req.userId;
    const { itens } = req.body;

    if (!itens || itens.length === 0) {
      return res.status(400).json({ msg: "O pedido precisa conter ao menos 1 item." });
    }

    // Calcular total automaticamente
    let total = 0;
    for (const item of itens) {
      const produto = await Product.findById(item.produto);
      if (!produto) {
        return res.status(404).json({ msg: "Produto não encontrado: " + item.produto });
      }
      total += (produto.preco || 0) * (item.quantidade || 0);
    }

    const novoPedido = await Order.create({
      restaurante,
      itens,
      total,
    });

    res.status(201).json(novoPedido);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Listar pedidos do restaurante logado
export const getOrders = async (req, res) => {
  try {
    const pedidos = await Order.find({ restaurante: req.userId })
      .populate("itens.produto", "nome preco imagem")
      .sort({ createdAt: -1 });

    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Atualizar status do pedido
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const permitido = ["pendente", "em preparo", "entregue"];
    if (!permitido.includes(status)) {
      return res.status(400).json({ msg: "Status inválido." });
    }

    const pedido = await Order.findOneAndUpdate(
      { _id: id, restaurante: req.userId },
      { status },
      { new: true }
    );

    if (!pedido) return res.status(404).json({ msg: "Pedido não encontrado." });
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Deletar pedido
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Order.findOneAndDelete({ _id: id, restaurante: req.userId });
    if (!pedido) return res.status(404).json({ msg: "Pedido não encontrado." });
    res.json({ msg: "Pedido removido com sucesso." });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
