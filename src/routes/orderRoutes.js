import { Router } from "express";
import { createOrder, deleteOrder, getOrder, listOrders, updateOrder } from "../controllers/orderController.js";

const router = Router();

router.get("/", listOrders);
router.post("/", createOrder);
router.get("/:id", getOrder);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
