import { NextFunction, Request, Response } from "express";

export const asyncHandler = (afn: (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
      return Promise.resolve(afn(req, res, next)).catch(next);
  };
};

export const errorHandler = (
  err: Error | undefined,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[ErrorStack]: ${err?.stack}`);

  res.status(500).json({ error: `
    Internal server error
    Error: ${err?.message}
  `, });

  next();
};