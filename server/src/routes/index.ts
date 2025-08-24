import { Express } from "express";
import { postRoutes } from "./postRoutes";

export const routes = (app: Express) => {
  app.use("/api/posts", postRoutes);  
  app.get("/health", (req, res) => {
    res.send({ status: "OK", timestamp: new Date().toISOString() });
  });
};