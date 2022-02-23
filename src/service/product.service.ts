import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
} from "mongoose";
import Product, { ProductDocument } from "../model/product.model";

export async function createProduct(input: DocumentDefinition<ProductDocument>) {
    return await Product.create(input);
}

export async function getAllProduct(data:DocumentDefinition<ProductDocument>){
    return await Product.find().select({data});
}