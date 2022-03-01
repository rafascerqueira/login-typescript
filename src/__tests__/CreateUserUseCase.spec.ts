import cryptogram from "@config/cryptogram";
import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "@modules/users/useCases/CreateUserUseCase";
import { AppError } from "@shared/errors/AppError";
import bcrypt from "bcrypt";

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("Should be able to create a new user", async () => {
    const password = await bcrypt.hash("tungs", cryptogram.hashSaltRounds);
    const user = await createUserUseCase.execute({
      name: "User Test",
      email: "usertest@email.com",
      password,
    });

    expect(user).toBeTruthy();
  });

  it("Should not be able to create a new user when it exists", async () => {
    expect(async () => {
      const password = await bcrypt.hash("tungs", cryptogram.hashSaltRounds);
      await createUserUseCase.execute({
        name: "User Test",
        email: "usertest@email.com",
        password,
      });

      const user = await createUserUseCase.execute({
        name: "Other user",
        email: "usertest@email.com",
        password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
