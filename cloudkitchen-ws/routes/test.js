const express = require('express')
const router = express.Router()
const create = require('../model/setupDb');
const multer = require('multer') // used to handle images
const imageHandler = require('../utilities/imageHandler');

// multer image storage setup
let storage = multer.memoryStorage();
let upload = multer({ storage })

router.get('/setupDb', (req, res, next) => {
    create.setupDb().then((data) => {
        res.send(data);
    }).catch(err => {
        next(err);
    })
})

router.post('/imageUpload', upload.single('image'), async (req, res, next) => {
    await imageHandler(req); // sends the request to image handler in utilities
    res.send('upload successful');
})

module.exports = router