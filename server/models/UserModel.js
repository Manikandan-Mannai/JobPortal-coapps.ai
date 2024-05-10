import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    accountType: { type: String, default: "seeker" },
    companyName: { type: String },
    
    degree:{type:String},
    college:{type:String},
    gender:{type:String},
    DOB:{type:String},
    aboutMe:{type:String},
});

const User = mongoose.model("Users", UserSchema);
export default User;
