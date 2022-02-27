import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { User } from "./User";

@Entity("refresh_tokens")
class RefreshToken {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(() => User, (user) => user.refreshTokens)
  @JoinColumn({ name: "user", referencedColumnName: "id" })
  user: User;

  @Column()
  valid: boolean;

  @Column()
  expires_in: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { RefreshToken };
