import dotenv from "dotenv";

dotenv.config();

export default {
  hashSaltRounds: 10,
  jwt: {
    privateKey: process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLIC_KEY,
  },
};
