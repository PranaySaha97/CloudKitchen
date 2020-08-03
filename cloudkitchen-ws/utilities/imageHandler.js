let sharp = require('sharp');

let imageHandler = async (req) => {
    let filename = new Date().toDateString() + req.file.originalname;
    filename = filename.split(' ').join('-');
    await sharp(req.file.buffer)
        .resize({
            width: 615,
            height: 350
        })
        .toFile('./uploads/images/' + filename);
}

module.exports = imageHandler;
