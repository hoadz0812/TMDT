const db = require('../config/db/index')

const Image = image => {
    
}

Image.getImage = (id, result) => {
    db.query(`SELECT  REPLACE(img,img,"${id}")as image FROM product WHERE img like "%${id}%"`, (err, image) => {
        if(err || image.length == 0){
            result(err)
        }else{
            result(image[0])
        }
    })
}

module.exports = Image