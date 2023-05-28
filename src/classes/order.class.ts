import { OrderInterface } from "../interfaces/order.interface";

export class OrderClass implements OrderInterface {
    _id?: string;    
    price: number;
    amount: number;
    quantity: number; 
    productId: string;

    constructor(newOrder: OrderInterface) {
        this.price = newOrder.price;
        this.quantity = 1;
        this.amount = newOrder.amount; 
        this.productId = newOrder.productId;        
    }
}