import mongoose from "mongoose";
import { ProductClass } from "../classes/product.class";
import { productSchema } from "../schemas/product.schema";

export type ProductDocument = ProductClass & Document;

const productModel = mongoose.model(
    "Products",
    productSchema,
    'products'
);

export { productModel };