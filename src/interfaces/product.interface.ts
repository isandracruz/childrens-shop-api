export interface ProductInterface {
    _id?: string;
    name: string;
    price: number;
    inStock: number;
    categories?: string[];
    tags?: string[];
    description?: string;
    info?: string;
    images?: string[];  
}