import InvalidValueException from "../../exception/InvalidValueException.ts";
import Product from "../models/Product.ts";
import { createProductService, listProductsService, getProductService } from "../services/ProductService.ts";

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

export async function listProducts(req, res){
    try {
        const products = await listProductsService();
        return res.status(200).json({
            message: 'Productos obtenidos exitosamente',
            products
        });
    } catch (error) {
        console.error('Failed to list products:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function getProduct(req, res){
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }
        
        const product = await getProductService(Number(id));
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        return res.status(200).json({
            message: 'Producto obtenido exitosamente',
            product
        });
    } catch (error) {
        console.error('Failed to get product:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}