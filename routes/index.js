const express = require("express");

const router = express.Router();

let list = [
    {
        id: 1,
        title: "Create a newsletter",
        order: 1,
        completed: true,
        createdOn: new Date(),
    },
    {
        id: 2,
        title: "Take a cup of coffee",
        order: 2,
        completed: true,
        createdOn: new Date(),
    },
    {
        id: 3,
        title: "write a new article",
        order: 3,
        completed: true,
        createdOn: new Date(),
    },
    {
        id: 4,
        title: "Walk home after lunch",
        order: 4,
        completed: false,
        createdOn: new Date(),
    },
    {
        id: 5,
        title: "Have some dinner",
        order: 5,
        completed: false,
        createdOn: new Date(),
    },
];

let userId = 1;

router
    .route("/shopping")
    .get(function (req, res) {
        return res.json(list);
    })
    .post((req, res) => {
        let newId = list.length + 1;
        let newOrder = list.length + 1;

        let newItem = {
            id: newId,
            title: req.body.title,
            order: newOrder,
            completed: false,
            createdOn: new Date(),
        };

        list.push({
            newItem,
        });

        return res.json({
            message: "Item has been added to the list",
        });
    });

router
    .route("/shopping/:id")
    .get((req, res) => {
        const item = list.find((val) => {
            return val.id == req.params.id;
        });

        return res.json(
            item || {
                result: `Item with id, ${req.params.id} is not found!`,
            }
        );
    })
    .patch((req, res) => {
        let update = list.find((val) => {
            return val.id === req.params.id;
        });
        update.title = req.body.title;
        update.completed = true;
        return res.json({
            message: "The selected item has been updated",
        });
    })
    .delete((req, res) => {
        let del = list.findIndex((val) => {
            return val.id == req.params.id;
        });
        list.splice(del, 1);
        return res.json({
            message: "The list has been deleted",
        });
    });

module.exports = router;
