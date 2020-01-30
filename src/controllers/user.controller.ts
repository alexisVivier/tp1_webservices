var express = require('express');
var router = express.Router();

// Home page route.
router.get('/', function (req: any, res: any) {
  res.send('All users');
})

// About page route.
router.get('/:id', function (req: any, res: any) {
  res.send(`User : ${req.params.id}`);
})

export default router;