import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import config from "../config/config";
import { userModel } from "../models/user.model";

beforeAll(async () => {
    await mongoose.connect(config.DB_URI);     
});
  
afterAll(async () => {
    // Clean database
    const user = await userModel.findOne({ email: "patsys.curtis@example.com"})
    await await userModel.findByIdAndRemove(user._id);

    await mongoose.connection.close();
});

describe("POST /signup", () => {
    it("should sign up a new user", async () => {
        const userData = {
            username: "Patsys Curtis",
            email: "patsys.curtis@example.com",
            password: "hillbill",
            role: 'user'
        };
        const res = await request(app).post("/signup").send(userData);        
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('User registered successfully!');            
    });
});

describe("POST /signin", () => {
    it("should sign in a user", async () => {
        const userData = {            
            email: "patsys.curtis@example.com",
            password: "hillbill"
        };
        const res = await request(app).post("/signin").send(userData);        
        expect(res.statusCode).toBe(200);        
        expect(res.body.token).toBeDefined();            
    });
});

