import { Request } from "express";
import * as log4js from "log4js";

const logger = log4js.getLogger();

export const logApiError = (req: Request, error: any) => {
  logger.error(`API Error - ${req.method} ${req.path}:`, {
    error: error.message,
    stack: error.stack,
    body: req.body,
    params: req.params,
    query: req.query,
  });
};