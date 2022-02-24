import { Request, Response } from "express";
import _, { get, split } from "lodash";
import Product from "../model/product.model";
import { createProduct, getAllProduct } from "../service/product.service";
import productPermission from "../utils/product"

export default async function createProductHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");
    const body = req.body;
    const product = await createProduct({ ...body, user: userId });

    return res.send(product);
}

export async function getProductHandler(req: Request, res: Response) {
    try {
        const userSubscriptionType = 'basic';

        const getFeildObject = await productPermission('products',userSubscriptionType);
        let getAllProduct = await Product.find({},getFeildObject);

        // const refineProduct = await refineBySubscription(getAllProduct, userSubscriptionType);

        res.status(200).json({
            status: 'success',
            statusCode:200, 
            results: getAllProduct
        });

    } catch (error: any) {
        res.status(500).json({
            status: 'error',
            statusCode:500,
            error: error.message
        });
    }
}

// const refineBySubscription = async (products: any, subscriptionType: string) => {
//     const data = await findSubscriptionFeilds(subscriptionType);
//     if (data) {
//         let productData: any = [];
//         _.forEach(products, function (product) {
//             productData.push(_.pick(product, data.fields));
//         });
//         return productData;
//     } else {
//         return [];
//     }
// }

// const findSubscriptionFeilds = async (subscriptionType: String) => {
//     return _.find(productPermission, (info) => {
//         return info && info.subscriptionType === subscriptionType;
//     });
// };