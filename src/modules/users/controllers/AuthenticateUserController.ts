import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "../useCases/AuthenticateUserUseCase";

export class CreateUserController {
  async execute(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = container.resolve(AuthenticateUserUseCase);

    await user.execute({ email, password });

    return response.json(user);
  }
}
