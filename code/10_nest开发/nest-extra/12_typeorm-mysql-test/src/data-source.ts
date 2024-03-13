import "reflect-metadata";
import { DataSource } from "typeorm";
// import { User } from "./entity/User";
// import { Aaa } from "./entity/Aaa";
// import { IdCard } from "./entity/IdCard";
// import { Department } from "./entity/Department";
// import { Employee } from "./entity/Employee";
import { Article } from "./entity/Article";
import { Tag } from "./entity/Tag";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Liweiye123456",
  database: "typeorm_test",
  synchronize: true,
  logging: true,
  //   entities: [User, IdCard],
  //   entities: [Department, Employee],
  entities: [Article, Tag],
  migrations: [],
  subscribers: [],
  connectorPackage: "mysql2",
  extra: {
    authPlugin: "sha256_password",
  },
});
