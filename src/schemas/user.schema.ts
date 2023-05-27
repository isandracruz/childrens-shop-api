import mongoose from "mongoose";
import { UserClass } from "../classes/user.class";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        require: false
    },   
    email:  { 
        type: String,
        require: true
    },
    password: { 
        type: String,
        require: true
    },
    role: { 
        type: String,
        defaul: 'user'
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

userSchema.plugin(aggregatePaginate);
userSchema.loadClass(UserClass);

export { userSchema };