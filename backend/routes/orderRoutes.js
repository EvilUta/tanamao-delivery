import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getOrders,
  updateStatus,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, getOrders);
router.put("/:id", authMiddleware, updateStatus);
router.delete("/:id", authMiddleware, deleteOrder);

export default router;
