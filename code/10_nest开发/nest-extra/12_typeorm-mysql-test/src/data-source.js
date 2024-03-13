"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
// import { User } from "./entity/User";
// import { Aaa } from "./entity/Aaa";
// import { IdCard } from "./entity/IdCard";
// import { Department } from "./entity/Department";
// import { Employee } from "./entity/Employee";
var Article_1 = require("./entity/Article");
var Tag_1 = require("./entity/Tag");
exports.AppDataSource = new typeorm_1.DataSource({
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
    entities: [Article_1.Article, Tag_1.Tag],
    migrations: [],
    subscribers: [],
    connectorPackage: "mysql2",
    extra: {
        authPlugin: "sha256_password",
    },
});
