const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const server = express();
server.use(cors());

// Connect to MongoDB using environment variable
mongoose.connect(process.env.CONNECTION_STRING)

const con = mongoose.connection;
con.on("open", () => {
    console.log("connected");
});

server.use(express.json());

const projectRouter = require("./Routes/projects");
server.use("/projects", projectRouter);

const loginRouter = require("./Routes/login");
server.use("/login", loginRouter);

const signupRouter = require("./Routes/signup");
server.use("/signup", signupRouter);

server.listen(8008, () => {
    console.log("Server Running...");
});
