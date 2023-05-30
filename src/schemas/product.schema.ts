import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import { ProductClass } from "../classes/product.class";

const productSchema = new mongoose.Schema({
    sku: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    inStock: {
        type: Number,
        require: true
    },
    categories: {
        type: [String],
        require: false,
        default: []
    },
    tags: {
        type: [String],
        require: false,
        default: []
    },
    description: {
        type: String,
        require: true
    },
    info: {
        type: String,
        require: true
    },
    images: {
        type: [String],
        require: false,
        default: []
    },  
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

productSchema.plugin(aggregatePaginate);
productSchema.loadClass(ProductClass);

export { productSchema };