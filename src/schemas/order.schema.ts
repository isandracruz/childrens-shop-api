import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import { OrderClass } from "../classes/order.class";

const orderSchema = new mongoose.Schema({
    price: {
        type: Number,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

orderSchema.plugin(aggregatePaginate);
orderSchema.loadClass(OrderClass);

export { orderSchema };