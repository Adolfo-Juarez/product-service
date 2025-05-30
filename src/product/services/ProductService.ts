import InvalidValueException from "../../exception/InvalidValueException.ts";
import Product from "../models/Product.ts";

interface createInterfaceRequest {
    name: string;
    price: number;
    description: string;
    stock: number;
}

interface productResponse{
    id: number,
    name: string,
    description: string,
    stock: number,
    price: number
}

export async function createProductService(request: createInterfaceRequest): Promise<productResponse> {

    if (request.price <= 0) {
        throw new InvalidValueException('Price must be greater than 0');
    }

    if(request.stock <= 0){
        throw new InvalidValueException('Stock must be greater than 0');
    }

    const product = await Product.create(request);

    return {
        id: product.id,
        name: product.dataValues.name,
        description: product.dataValues.description,
        stock: product.dataValues.stock,
        price: product.dataValues.price
    }
}

export async function listProductsService(): Promise<productResponse[]> {
    const products = await Product.findAll();
    
    return products.map(product => ({
        id: product.dataValues.id,
        name: product.dataValues.name,
        description: product.dataValues.description,
        stock: product.dataValues.stock,
        price: product.dataValues.price
    }));
}

export async function getProductService(id: number): Promise<productResponse | null> {
    const product = await Product.findByPk(id);
    
    if (!product) {
        return null;
    }
    
    return {
        id: product.dataValues.id,
        name: product.dataValues.name,
        description: product.dataValues.description,
        stock: product.dataValues.stock,
        price: product.dataValues.price
    };
}