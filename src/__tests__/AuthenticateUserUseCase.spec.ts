import cryptogram from "@config/cryptogram";
import bcrypt from "bcrypt";
import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { AuthenticateUserUseCase } from "@modules/users/useCases/AuthenticateUserUseCase";
import { CreateUserUseCase } from "@modules/users/useCases/CreateUserUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository
    );

    const password = await bcrypt.hash("tungs", cryptogram.hashSaltRounds);
    await createUserUseCase.execute({
      name: "User Test",
      email: "usertest@email.com",
      password,
    });
  });

  it("Should be able to Sign in with a valid credentails", async () => {
    const login = await authenticateUserUseCase.execute({
      email: "usertest@email.com",
      password: "tungs",
    });

    console.log(login);

    expect(login).toBeTruthy();
  });
});
