import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    descricao: { type: String },
    preco: { type: Number, required: true },
    imagem: { type: String },
    restaurante: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
