const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
async function connect() {
    try {
        // await mongoose.connect('mongodb+srv://taquyet:bntS6AYm0vzxFN31@ttssaomai.k3pxdhe.mongodb.net/?retryWrites=true&w=majority');
        await mongoose.connect('mongodb://127.0.0.1:27017/TTS_BE_SAOMAI');
        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect failure', error);
    }
}

// const mysql = require('mysql')

// const connect = () =>{
//     try {
//         const connection = mysql.createConnection({
//             host: 'localhost',
//             port: 3306,
//             database: 'shoestore',
//             user: 'root',
//             password: ''
//         })
        
//         connection.connect((err) => {
//             if (err) {
//                 console.error('Error connecting: ' + err.stack);
//                 return;
//             }
        
//             console.log('Connected as id ' + connection.threadId);
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }


module.exports = { connect };
