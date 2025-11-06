import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import { verificarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Protege todas as rotas de produto
router.use(verificarToken);

router.post("/", createProduct);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
