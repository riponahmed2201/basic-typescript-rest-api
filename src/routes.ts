import { Express, Request, Response } from "express";
import {
  createPostHandler,
  updatePostHandler,
  getPostHandler,
  getAllPostHandler,
  deletePostHandler,
} from "./controller/post.controller";
import { createUserHandler, getUserList } from "./controller/user.controller";
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { validateRequest, requiresUser } from "./middleware";
import {
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user.schema";
import {
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
} from "./schema/post.schema";

import createProductHandler, {getProductHandler} from "./controller/product.controller";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Register user
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);


  // get user list
  app.get("/api/users", getUserList);


  // Login
  app.post(
    "/api/sessions",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  // Get the user's sessions
  app.get("/api/sessions", requiresUser, getUserSessionsHandler);

  // Logout
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

  // Create a post
  app.post(
    "/api/posts",
    [requiresUser, validateRequest(createPostSchema)],
    createPostHandler
  );

  // Update a post
  app.put(
    "/api/posts/:postId",
    [requiresUser, validateRequest(updatePostSchema)],
    updatePostHandler
  );

  // Get a post
  app.get("/api/posts/:postId", getPostHandler);

  // get all post 
  app.get("/api/posts", getAllPostHandler);

  // Delete a post
  app.delete(
    "/api/posts/:postId",
    [requiresUser, validateRequest(deletePostSchema)],
    deletePostHandler
  );

  // create product
  app.get("/api/products", getProductHandler);
  app.post("/api/products", createProductHandler);
}
