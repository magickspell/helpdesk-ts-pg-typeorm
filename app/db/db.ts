import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { resolve } from "path";
import { DataSource } from "typeorm/data-source/DataSource";

const postfix: string = "*.js"; // "*.[j|t]s"
const dataPath: string = resolve(__dirname);

console.log("[resolve(dataPath, 'migrations', '**', postfix)]");
console.log(resolve(dataPath, "migrations", "**", postfix));

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.NODE_ENV === "production" ? process.env.DB_PORT : 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: false,
  logging: true,
  // synchronize: true, // only for dev wo migrations
  namingStrategy: new SnakeNamingStrategy(),
  entities: [
    resolve(dataPath, "../..", "**", `*.entity${postfix}`),
    resolve(dataPath, "../..", "**", `*.view${postfix}`),
  ],
  subscribers: [resolve(dataPath, "**", `*.subscriber${postfix}`)],
  migrations: [resolve(dataPath, "migrations", "**", postfix)],
  migrationsRun: true
})
