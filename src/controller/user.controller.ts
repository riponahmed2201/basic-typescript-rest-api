import { Request, Response } from "express";
import { omit, parseInt } from "lodash";
import { createUser, getUserListData } from "../service/user.service";
import log from "../logger";
import User from "../model/user.model";
import { getPagination } from "../helpers/pagination-helper";

export async function createUserHandler(req: Request, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON(), "password"));
    } catch (e: any) {
        log.error(e);
        return res.status(409).send(e.message);
    }
}

export async function getUserList(request: Request, response: Response) {
    try {

        const pagination = await getPagination(request);

        console.log("pagination: ", pagination);

        const userList = await User.find({},{}, pagination);

        return response.status(200).json({
            status: "success",
            statusCode: 200,
            next: userList.length === pagination.limit ? pagination.skip + pagination.limit : null,
            userList
        });

        // const page: number = typeof req.query.page == 'number'? req.query.page :NaN;
        // const limit: number = typeof req.query.limit == 'number' ? req.query.limit : NaN;

        // const page = typeof request.query.page === 'number' ? request.query.page : ((typeof request.query.page === 'string') ? Number.parseInt(request.query.page.toString()) : NaN);
        // const limit = typeof request.query.limit === 'number' ? request.query.limit : ((typeof request.query.limit === 'string') ? Number.parseInt(request.query.limit.toString()) : NaN);

        // const startIndex = (page - 1) * limit;
        // const endIndex = page * limit;

        // let results: any = {};

        // const userList = await User.find();

        // if (endIndex < userList.length) {
        //     results.next = {
        //         page: page + 1,
        //         limit: limit
        //     }
        // }

        // if (startIndex > 0){
        //     results.previous = {
        //         page: page - 1,
        //         limit: limit
        //     }
        // }

        // results.results = userList.slice(startIndex, endIndex);

        // const userList = await User.find({},pagination);

        // return res.status(200).json({
        //     status: "success",
        //     statusCode: 200,
        //     count: results.length,
        //     data: results
        // });

    } catch (e: any) {
        return response.status(409).send(e.message);
    }
}
