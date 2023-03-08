const Image = require('../model/image.model')

exports.getImage = (req, res) => {
    Image.getImage(req.params.img, result => {
        res.sendFile(__dirname.replace('src\\controllers','uploads\\') + result.image);
    })
}