import { Router } from "express";
import { getPost } from "../controllers/post";

const postRoute = Router();

postRoute.get("/:year/:month/:title", getPost);

export { postRoute };
