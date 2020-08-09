let sharp = require('sharp');

let imageHandler = async (req) => {
    let filename = new Date().toDateString() + '-' + req.file.originalname;
    filename = filename.split(' ').join('-'); // removes empty space in file name and replaces with '-'

    // await is used as sharp is asynchronous
    await sharp(req.file.buffer)
        .resize({
            width: 615,
            height: 350
        })
<<<<<<< HEAD:cloudkitchen-ws/utilities/custImageHandler.js
        .toFile('./uploads/images/customer/' + filename); // sharp is used to compress the image and store in the location
=======
        .withMetadata()
        .toFile('./uploads/images/' + filename); // sharp is used to compress the image and store in the location
>>>>>>> 8cccc118ced1ab52570ba0f685c885425f38695d:cloudkitchen-ws/utilities/imageHandler.js
}

module.exports = imageHandler;
