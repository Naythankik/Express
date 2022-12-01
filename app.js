const express = require("express");
const app = express();

app.use(express.json());
const Joi = require("joi");
const { reset } = require("nodemon");

let users = [
    {
        id: 1,
        mes: "The first row",
    },
    {
        id: 2,
        mes: "The second row",
    },
    {
        id: 3,
        mes: "The third row",
    },
    {
        id: 4,
        mes: "The fourth row",
    },
    {
        id: 5,
        mes: "The fifth row",
    },
];

app.get("/", (req, res) => {
    res.send(
        "Welcome to the usage of API and validation using JOI,\n Visit the '/users/' to access all of our users"
    );
});
app.get("/users", function (req, res) {
    res.json(users);
});

app.post("/users", (req, res) => {
    let newData = {
        id: users.length + 1,
        mes: req.body.mes,
    };

    users.push(newData);

    res.json({
        message: "The user has been added to the list of all users",
    });
});

app.get("/users/:id", function (req, res) {
    let user = users.find((val) => {
        return val.id == req.params.id;
    });
    if (!user) {
        res.status(403).json({ message: "The request is bad" });
    }
    res.json(user);
});

app.put("/users/:id", (req, res) => {
    let user = users.find((val) => {
        return val.id == req.params.id;
    });

    const schema = Joi.object({
        mes: Joi.string().required(),
    });

    let result = schema.validate(req.body);
    if (result.error) {
        res.status(403).send(result.error.details[0].message);
        return;
    }

    user.mes = req.body.mes;

    res.send("The user has been updated");
});

app.delete("/users/:id", (req, res) => {
    let user = users.findIndex((val) => {
        return val.id == req.params.id;
    });

    //validate the request before processing
    if (user < 0) {
        res.status(403).send(`The user with id, ${req.params.id} is not found`);
    }

    //if found delete user from array of objects
    users.splice(user, 1);
    res.status(200).send(
        `User has been deleted successfully, return to \'/users/\' to view the array of users`
    );
});

const PORT = process.env.PORTS;
app.listen(PORT || 4000, () => {
    console.log("The route is running in the background");
});
