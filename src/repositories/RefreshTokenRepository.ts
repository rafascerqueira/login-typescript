import { EntityRepository, Repository } from "typeorm";
import { RefreshToken } from "@modules/users/infra/typeorm/entities/RefreshToken";

@EntityRepository(RefreshToken)
class RefreshTokenRepository extends Repository<RefreshToken> {}

export { RefreshTokenRepository };
