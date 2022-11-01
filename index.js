const express = require("express");
const app = express();
const product = require("./api/product");
const randomquote = require("./api/randomquote");
const get10quotes = require("./api/get10quotes");
const newpost = require("./api/newpost");
const login = require("./api/login");
const register = require("./api/register");
// const like = require("./api/like");

app.use(express.json({ extended: false }));

app.use("/api/product", product);
app.use("/api/randomquote", randomquote);
app.use("/api/get10quotes", get10quotes);
app.use("/api/newpost", newpost);
app.use("/api/login", login);
app.use("/api/register", register);
// app.use("/api/like", like);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
