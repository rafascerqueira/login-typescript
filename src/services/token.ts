import jwt from "jsonwebtoken";
import { User } from "../models/User";
import crypto from "../config/cryptogram";

const sign = (user: User) => {
  const payload = { id: user.id, role: user.role };
  return jwt.sign(payload, crypto.jwt.privateKey, {
    algorithm: "RS256",
    expiresIn: "30m",
  });
};

const decode = (token: string) => jwt.decode(token);

const verify = (token: string) =>
  jwt.verify(token, crypto.jwt.publicKey, (err: any, data: any) => {
    if (err) throw err;

    return data;
  });

export { sign, verify, decode };
