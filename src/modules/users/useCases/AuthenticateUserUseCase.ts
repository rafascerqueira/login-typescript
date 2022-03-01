import { AppError } from "@shared/errors/AppError";
import { createRefreshTokenData } from "@shared/services/refreshToken";
import { sign } from "@shared/services/token";
import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";

type payload = {
  email: string;
  password: string;
};

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ email, password }: payload) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError("Username or password incorrect");

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError("Username or password incorrect");

    const token = sign(user);

    const refresh_token = createRefreshTokenData(token, user);

    const tokenReturn: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refresh_token,
    };

    return tokenReturn;
  }
}
