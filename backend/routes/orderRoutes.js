import express from "express";
import { verificarToken } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getOrders,
  updateStatus,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", verificarToken, createOrder);
router.get("/", verificarToken, getOrders);
router.put("/:id", verificarToken, updateStatus);
router.delete("/:id", verificarToken, deleteOrder);

export default router;
