import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { sign } from "../services/token";
import bcrypt from "bcrypt";

class UserController {
  async index(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);

    const userList = await userRepository.find();

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
    const userPswd = await getCustomRepository(UserRepository)
      .createQueryBuilder("users")
      .select("users.password")
      .addSelect("users.password")
      .where("users.email = :email", { email })
      .getOne();

    if (user) {
      const isMatch = await bcrypt.compare(password, userPswd.password);

      if (isMatch) {
        const token = sign(user);
        return response.json({
          success: `Welcome back ${user.name}`,
          token,
        });
      } else {
        return response.status(401).json({ loginFail: "invalid password" });
      }
    } else {
      return response.status(404).json({ loginFail: "There is no User" });
    }
  }

  async findOneById(request: Request, response: Response) {
    // Oops! it's too late to code now. Sleep and enjoy
    const { id } = request.params;

    response.json({
      id: `c4129485-1385-4584-8270-${id}`,
      name: "User Test",
      email: "usertest@email.com",
      role: "user",
      created_at: "2021-03-20T19:49:23.476Z",
      updated_at: "2021-03-20T19:49:23.476Z",
    });
    // fin
  }

  async welcome(request: Request, response: Response) {
    return response.send({ message: "Welcome to Login system!" });
  }
}

export { UserController };
