import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { UserDocument } from "./user.model";

export interface ProductDocument extends mongoose.Document {
    user: UserDocument["_id"];
    name: string;
    code: string;
    shortDescription: string;
    description: string;
    supplierPrice: number;
    mrpPrice: number;
    discountedPrice: number;
    stockTotal: number;
    categoryName: string;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: String,
        code: {
            type: String,
            required: true,
            unique: true,
            default: () => nanoid(10),
        },
        shortDescription: String,
        description: String,
        supplierPrice: Number,
        mrpPrice: Number,
        discountedPrice: Number,
        stockTotal: Number,
        categoryName: String,
    },
    { timestamps: true }
);

const Product = mongoose.model<ProductDocument>("Product", ProductSchema);

export default Product;
