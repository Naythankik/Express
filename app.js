const express = require("express");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/index");
const { json } = require("body-parser");

const app = express();
app.use(userRoutes, bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    return res.json({
        message: "Welcome to the shopping list",
    });
});

app.listen(3000, () => {
    console.log("The app is active");
});
