import express from 'express'
import user from './controllers/user.controller'


import photo from './controllers/photo.controller'
import album from './controllers/album.controller'

const app = express()
const port = 4200

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/user', user)
app.use('/photo', photo)
app.use('/album', album)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))