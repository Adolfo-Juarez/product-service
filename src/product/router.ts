import express from "express";
import ValidateAdminUserMiddleware from "../middleware/ValidateAdminUserMiddleware.ts";
import { createProductController } from "./controller/ProductController.ts";

const router = express.Router();

router.post('/', ValidateAdminUserMiddleware, createProductController);

export default router;