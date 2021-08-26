import dayjs from "dayjs";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";
import { UserRepository } from "../repositories/UserRepository";
import { createRefreshTokenData } from "../services/refreshToken";

class TokenController {
  async generateRefreshToken(request: Request, response: Response) {
    const [_, token] = request.headers.authorization.split(" ");

    const data = await createRefreshTokenData(token);
    const refreshTokenRepository = getCustomRepository(RefreshTokenRepository);

    const isExpíred = dayjs().isAfter(data.expires_in);

    if (isExpíred) {
      // set invalid refresh token
      await refreshTokenRepository.update(
        { valid: false },
        { user: data.user }
      );
      return response
        .status(401)
        .json({ message: "your session has expired. Please, sign in again" });
    } else {
      const refreshToken = refreshTokenRepository.create({
        user: data.user,
        expires_in: data.expires_in,
      });

      await refreshTokenRepository.save(refreshToken);
      return response.json(refreshToken);
    }
  }

  async closeAllSessions(request: Request, response: Response) {
    const id = request.params.id;

    const refreshTokenRepository = getCustomRepository(RefreshTokenRepository);
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({ where: { id } });
    await refreshTokenRepository.update({ valid: false }, { user: user });

    return response.json({ message: "Close all sesions" });
  }
}

export { TokenController };
