import User from "../models/user.model";

var express = require("express");
var router = express.Router();

// Get all users
router.get("/", function(req: any, res: any) {
  User.find()
    .then(users => res.send(users))
    .catch(err => console.error(err.toJSON()));
});

// Get user by id
router.get("/:id", function(req: any, res: any) {

  User.findById<User>(req.params.id, { includes: ["album"] })
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      console.error(err.toJSON());
    });
});

// Post user
router.post("/", function(req: any, res: any) {
  const user = new User(req.body);
  User.create(user)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.error(err.toJSON());
    });
});

// Patch user
router.patch("/:id", (req: any, res: any) => {
  User.updateById(req.params.id, req.body)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.error(err.toJSON());
    });
});

// Delete user
router.delete("/:id", (req: any, res: any) => {
  User.deleteById(req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.error(err.toJSON());
    });
});

export default router;
