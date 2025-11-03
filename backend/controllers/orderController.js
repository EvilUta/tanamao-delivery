import Order from "../models/Order.js";

export const criarPedido = async (req, res) => {
  try {
    const novoPedido = new Order(req.body);
    await novoPedido.save();
    res.status(201).json({ mensagem: "Pedido criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar pedido." });
  }
};

export const listarPedidos = async (req, res) => {
  try {
    const pedidos = await Order.find();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar pedidos." });
  }
};
