import { Router } from "express";
import { getHome } from "../controllers/home";

const homeRoute = Router();

homeRoute.get("/", getHome);

export { homeRoute };
