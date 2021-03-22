import { NextFunction, Request, Response } from "express";
import { verify } from "./token";

/**
 * Middleware which check authorization to access some routes. Will handle exceptions connection and watch valid of tokens
 */
export default (request: Request, response: Response, next: NextFunction) => {
  const handleAuthError = (name: string, message: string) => {
    response.status(401).json({ error: { name, message } });
  };
  const authHeader = request.headers["authorization"];
  if (!authHeader)
    return handleAuthError(
      "AuthHeaderError",
      "Please, sign in to granted access"
    );

  try {
    const token = authHeader.split(" ")[1];
    if (!token)
      return handleAuthError("UnsetTokenError", "There is no token provided");

    verify(token);
  } catch (error) {
    return response.status(401).json({ error });
  }

  next();
};
