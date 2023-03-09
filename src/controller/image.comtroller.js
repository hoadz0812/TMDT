const Image = require('../model/image.model')

exports.getImage = (req, res) => {
    console.log(req.params.img);
    Image.getImage(req.params.img, result => {
        res.sendFile(__dirname.replace('\\src\\controller', '\\uploads\\') + result.image);
    })
}

exports.add = (req, res) => {
    req.send("")
}