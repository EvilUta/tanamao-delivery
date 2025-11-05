import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    restaurante: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Restaurant", 
      required: true 
    },
    itens: [
      {
        produto: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "Product", 
          required: true 
        },
        quantidade: { 
          type: Number, 
          required: true,
          min: 1 
        }
      }
    ],
    total: { 
      type: Number, 
      required: true 
    },
    status: {
      type: String,
      enum: ["pendente", "em preparo", "entregue"],
      default: "pendente"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
