const express=require('express')
const router=express.Router()
const cors=require("cors")
const create = require('../model/setupDb');
const multer = require('multer')
const imageHandler = require('../utilities/imageHandler');

let storage = multer.memoryStorage();
let upload = multer({ storage })

router.get('/setupDb', (req, res, next) => {
    create.setupDb().then((data)=>{
        res.send(data);
    }).catch(err=>{
        next(err);
    })
})

router.post('/imageUpload', upload.single('image'), async (req, res, next) => {
    await imageHandler(req);
    res.send('upload successful');
})

module.exports = router