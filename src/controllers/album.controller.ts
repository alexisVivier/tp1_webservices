import Album from '../models/album.model';

var express = require('express');
var router = express.Router();

// Home page route.
router.get('/', function (req: any, res: any) {
  Album.find().then(albums => res.send(albums))
})

// About page route.
router.get('/:id', function (req: any, res: any) {
  Album.findById<Album>(req.params.id, { includes: ['user', 'photo'] })
    .then(album => {
      res.send(album)
    })
    .catch(err => {
      console.error(err)
    })
})

// Post album
router.post('/', function(req: any, res:any) {
  const album = new Album(req.body)
  Album.create(album)
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    console.error(err.toJSON())
  })
});

// Patch album
router.patch('/:id', (req: any, res:any) => {
  Album.updateById(req.params.id, req.body)
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    console.error(err.toJSON())
  })
})

// Delete album
router.delete('/:id', (req: any, res: any) => {
  Album.deleteById(req.params.id)
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    console.error(err.toJSON())
  })
})

export default router;