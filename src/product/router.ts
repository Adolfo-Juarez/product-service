import express from "express";
import ValidateAdminUserMiddleware from "../middleware/ValidateAdminUserMiddleware.ts";
import { createProductController, listProducts, getProduct } from "./controller/ProductController.ts";

const router = express.Router();

router.post('/', ValidateAdminUserMiddleware, createProductController);
router.get('/', listProducts);
router.get('/:id', getProduct);

export default router;