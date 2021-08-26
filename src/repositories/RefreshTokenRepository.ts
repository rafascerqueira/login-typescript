import { EntityRepository, Repository } from "typeorm";
import { RefreshToken } from "../models/RefreshToken";

@EntityRepository(RefreshToken)
class RefreshTokenRepository extends Repository<RefreshToken> {}

export { RefreshTokenRepository };
