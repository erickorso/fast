import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        require: [true, 'Email is required'],
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Email is not valid'
        ]
    },
    password: {
        type: String,
        require: [true, 'Password is required'],
        match: [
            /^(0x)?[0-9a-fA-F]+$/,
            'Password is not valid ss']
    },
    fullname: {
        type: String,
        require: [true, 'Name is required'],
        match: [
            /^[A-Za-z\s]+$/,
            'Name is not valid']
    }
});

const User = models.User || model('User', userSchema);

export default User;