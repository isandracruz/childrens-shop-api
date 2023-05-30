import { ProductInterface } from "../interfaces/product.interface";

export class ProductClass implements ProductInterface {
    _id?: string;
    sku: string;
    name: string;
    price: number;
    inStock: number;
    categories?: string[];
    tags?: string[];
    description?: string;
    info?: string;
    images?: string[]; 

    constructor(newProduct: ProductInterface) {
        this.sku = newProduct.sku;
        this.name = newProduct.name;
        this.price = newProduct.price;
        this.inStock = newProduct.inStock;
        this.categories = newProduct.categories || [];
        this.tags = newProduct.tags || [];
        this.description = newProduct.description;
        this.info = newProduct.info;
        this.images = newProduct.images || [];
    }
}