import Photo from '../models/photo.model';

var express = require('express');
var router = express.Router();

// Get all photos
router.get('/', function (req: any, res: any) {
  Photo.find().then(photos => res.send(photos))
})

// Get photo by id
router.get('/:id', function (req: any, res: any) {
  Photo.findById<Photo>(req.params.id, {includes: ['album']})
    .then(user => {
      res.send(user)
    })
    .catch(err => {
      console.error(err.toJSON())
    })
})

// Post photo
router.post('/', function(req: any, res:any) {
  const photo = new Photo(req.body)
  Photo.create(photo)
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    console.error(err.toJSON())
  })
});

// Patch photo
router.patch('/:id', (req: any, res:any) => {
  Photo.updateById(req.params.id, req.body)
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    console.error(err.toJSON())
  })
})

// Delete photo
router.delete('/:id', (req: any, res: any) => {
  Photo.deleteById(req.params.id)
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    console.error(err.toJSON())
  })
})

export default router;