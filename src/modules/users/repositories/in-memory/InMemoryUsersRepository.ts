import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";
import { v4 as uuidV4 } from "uuid";

export class InMemoryUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    const defaultData = {
      id: uuidV4(),
      ...data,
      role: "user",
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    Object.assign(user, defaultData);
    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
}
