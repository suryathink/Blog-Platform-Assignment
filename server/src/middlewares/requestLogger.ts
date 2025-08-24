import { Request, Response, NextFunction } from "express";
import * as log4js from "log4js";

const logger = log4js.getLogger();

export const logRequests = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`);
  next();
};