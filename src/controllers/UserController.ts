import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { sign } from "../services/token";
import { createRefreshTokenData } from "../services/refreshToken";
import bcrypt from "bcrypt";

class UserController {
  async index(_: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);

    const userList = await userRepository.find({
      select: ["id", "name", "role"],
    });

    return response.json(userList);
  }

  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const userRepository = getCustomRepository(UserRepository);

    const isThereAnUser = await userRepository.findOne({ email });

    if (isThereAnUser)
      return response.status(400).json({ error: "There is an User" });

    const user = userRepository.create({ name, email, password });

    await userRepository.save(user);

    return response.status(201).json(user);
  }

  async signin(request: Request, response: Response) {
    const { email, password } = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({ email });
    const hiddenParam = await getCustomRepository(UserRepository)
      .createQueryBuilder("users")
      .select("users.password")
      .addSelect("users.password")
      .where("users.email = :email", { email })
      .getOne();

    if (user) {
      const isMatch = await bcrypt.compare(password, hiddenParam.password);

      if (isMatch) {
        const token = sign(user);
        const refreshToken = await createRefreshTokenData(token);
        return response.json({
          success: `Welcome back ${user.name}`,
          token,
          refreshToken,
        });
      } else {
        return response.status(401).json({ loginFail: "invalid password" });
      }
    } else {
      return response.status(404).json({ loginFail: "There is no User" });
    }
  }

  async findOneById(request: Request, response: Response) {
    const id = request.params;

    if (!id)
      return response
        .status(400)
        .json({ idWasNotProvided: "Missing provide the user id" });

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.find({
      select: ["name", "role"],
      where: id,
    });

    if (!user)
      return response
        .status(404)
        .json({ userNotFound: "Cannot find user with id informed" });

    return response.json(user);
  }

  async welcome(_: Request, response: Response) {
    return response.send({ message: "Welcome to Login system!" });
  }
}

export { UserController };
