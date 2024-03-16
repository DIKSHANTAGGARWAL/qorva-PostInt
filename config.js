const  { DataSource } = require("typeorm");

const  Tables =  "./models";
// const  dotenv =  "dotenv";
// dotenv.config()
const  AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: "qorva",
    entities: Tables,
    synchronize: true,
});

module.exports= AppDataSource;
