// import "reflect-metadata"
const  express= require('express');
const cors = require('cors');
const dotenv = require("dotenv");

const AppDataSource = require("./config")

const userRoutes=require('./auth/routes')

const  app = express()
app.use(express.json());


app.use(
    cors({
        origin: "*",
    })
);

dotenv.config();


app.use("/auth", userRoutes)

const  port = 5000;

AppDataSource.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((err) => console.log("error", err));
