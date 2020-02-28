import express from "express";
require("dotenv").config();
import user from "./controllers/user.controller";
import Album from "./models/album.model";

import photo from "./controllers/photo.controller";
import album from "./controllers/album.controller";
import User from "./models/user.model";

console.log(process.env["API_BASE_URL"]);

enum QueryFilterOrder {
  Asc = "asc",
  Desc = "desc"
}

const app = express();
const port = 4200;

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

User.find({ 
    where: {
        id: "3",
        firstName: "Hugo"
    }
 })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
// app.use('/user', user)
// app.use('/photo', photo)
// app.use('/album', album)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
