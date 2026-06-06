import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        name: {
            type: String,
            default: '',
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        avatar: {
            type: String,
            default: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
        },
    },
    {
        timestamps: true,
    },
);

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export const User = model('User', userSchema);
