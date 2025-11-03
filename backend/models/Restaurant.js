import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    telefone: { type: String },
    endereco: { type: String },
    cardapio: [
      {
        nome: String,
        preco: Number,
        descricao: String,
        imagem: String,
      },
    ],
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
export default Restaurant;
