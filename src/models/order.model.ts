import mongoose from "mongoose";
import { OrderClass } from "../classes/order.class";
import { orderSchema } from "../schemas/order.schema";

export type OrderDocument = OrderClass & Document;

const orderModel = mongoose.model("Orders", orderSchema, 'orders');

export { orderModel };