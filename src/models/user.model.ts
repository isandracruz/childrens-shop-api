import mongoose from "mongoose";
import { userSchema } from "../schemas/user.schema";
import { UserClass } from "../classes/user.class";

export type UserDocument = UserClass & Document;

const User = mongoose.model<UserDocument>("User", userSchema);

export { User };

