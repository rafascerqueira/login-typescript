import dayjs from "dayjs";
import { decode } from "../services/token";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "@repositories/UserRepository";
import { RefreshTokenRepository } from "@repositories/RefreshTokenRepository";
import { User } from "@modules/users/infra/typeorm/entities/User";

interface IRefreshToken {
  user: User;
  expires_in: Date;
}

const createRefreshTokenData = async (
  token: string
): Promise<IRefreshToken> => {
  try {
    if (!token) throw new Error("invalid token or not provided");
    const payload = decode(token);

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({ where: { id: payload.id } });

    if (!user) throw new Error("User was not found!");

    const refreshTokenData = {
      user,
      expires_in: dayjs().add(7, "days"),
    };

    const refreshTokenRepository = getCustomRepository(RefreshTokenRepository);

    const refreshToken = refreshTokenRepository.create(refreshTokenData);
    await refreshTokenRepository.save(refreshToken);

    return refreshToken;
  } catch (error) {
    return error;
  }
};

export { createRefreshTokenData };
