var express = require('express');
var router = express.Router();

// Home page route.
router.get('/', function (req: any, res: any) {
  res.send('All photos');
})

// About page route.
router.get('/:id', function (req: any, res: any) {
  res.send(`Photo : ${req.params.id}`);
})

export default router;