import jwt from "jsonwebtoken";
import crypto from "@config/cryptogram";
import { User } from "@modules/users/infra/typeorm/entities/User";

const createRefreshTokenData = (token: string, user: User) => {
  const { id } = user;

  const payload = {
    user_id: id,
    token,
  };

  const refreshToken = jwt.sign(payload, crypto.jwt.privateKey, {
    algorithm: "RS256",
    expiresIn: "7d",
  });

  return refreshToken;
};

export { createRefreshTokenData };
