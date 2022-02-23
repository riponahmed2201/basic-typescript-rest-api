import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Post, { PostDocument } from "../model/post.model";

export function createPost(input: DocumentDefinition<PostDocument>) {
  return Post.create(input);
}


// find single post 
export function findPost(
  query: FilterQuery<PostDocument>,
  options: QueryOptions = { lean: true }
) {
  return Post.findOne(query, {}, options);
}

// findAllPost
export function findAllPost(
  query: FilterQuery<PostDocument>,
  options: QueryOptions = { lean: true }
) {
  return Post.find({}, options);
}


export function findAndUpdate(
  query: FilterQuery<PostDocument>,
  update: UpdateQuery<PostDocument>,
  options: QueryOptions
) {
  return Post.findOneAndUpdate(query, update, options);
}

export function deletePost(query: FilterQuery<PostDocument>) {
  return Post.deleteOne(query);
}
