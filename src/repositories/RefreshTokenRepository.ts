import { EntityRepository, Repository } from "typeorm";
import { UserTokens } from "@modules/users/infra/typeorm/entities/UserTokens";

@EntityRepository(UserTokens)
class RefreshTokenRepository extends Repository<UserTokens> {}

export { RefreshTokenRepository };
