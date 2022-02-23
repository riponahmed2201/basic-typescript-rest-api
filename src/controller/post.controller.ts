import { Request, Response } from "express";
import { get } from "lodash";
import {
  createPost,
  findPost,
  findAllPost,
  findAndUpdate,
  deletePost,
} from "../service/post.service";

export async function createPostHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const body = req.body;

  const post = await createPost({ ...body, user: userId });

  return res.send(post);
}

export async function updatePostHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const postId = get(req, "params.postId");
  const update = req.body;

  const post = await findPost({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  if (String(post.user) !== userId) {
    return res.sendStatus(401);
  }

  const updatedPost = await findAndUpdate({ postId }, update, { new: true });

  return res.send(updatedPost);
}

// get post by id
export async function getPostHandler(req: Request, res: Response) {
  const postId = get(req, "params.postId");
  const post = await findPost({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  return res.send(post);
}

// getAllPostHandler
export async function getAllPostHandler(req: Request, res: Response) {
  
  return res.send('post');
  // let  query:any = {};
  // for (var key in req.body) { //could also be req.query and req.params
  //   req.body[key] !== "" ? query[key] = req.body[key] : null;
  //   console.log("key is :", req.body[key])
  // }
  //
  // console.log("query ",query);
  // const post = await findAllPost({ query });

  // const result = req.body;
  // var obj = await JSON.parse(result);
  // var keys = await Object.keys(obj);
  // for (var i = 1; i < keys.length; i++) {
  //   console.log(obj[keys[i]]);
  // }

  // const post = await findAllPost({req});

  // if (!post) {
  //   return res.sendStatus(404);
  // }

  // return res.send(post);
}



export async function deletePostHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const postId = get(req, "params.postId");

  const post = await findPost({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  if (String(post.user) !== String(userId)) {
    return res.sendStatus(401);
  }

  await deletePost({ postId });

  return res.sendStatus(200);
}
