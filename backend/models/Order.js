import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    restaurante: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    itens: [
      {
        nome: String,
        preco: Number,
        quantidade: Number,
      },
    ],
    total: Number,
    cliente: {
      nome: String,
      telefone: String,
      endereco: String,
    },
    status: {
      type: String,
      enum: ["pendente", "preparando", "enviado", "entregue"],
      default: "pendente",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
