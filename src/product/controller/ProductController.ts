import InvalidValueException from "../../exception/InvalidValueException.ts";
import Product from "../models/Product.ts";
import { createProductService } from "../services/ProductService.ts";

export async function createProductController(req, res) {
    try {
        const { name, price, description, stock } = req.body;

        if (!name || !price || !description || !stock) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const product = await createProductService({
            name,
            price,
            description,
            stock
        });

        return res.status(201).json({
            "message": "Producto creado",
            product
        });
    } catch (error: unknown) {
        if (error instanceof InvalidValueException) {
            return res.status(400).json({ message: error.message });
        }

        console.error('Failed to create product:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
