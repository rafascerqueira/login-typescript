module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["src/modules/**/entities/*.ts"],
  migrations: ["src/shared/infra/database/typeorm/migrations/*.ts"],
  cli: {
    entitiesDir: "src/modules",
    migrationsDir: "src/shared/infra/database/typeorm/migrations",
  },
};
