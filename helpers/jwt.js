const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/index');

exports.generateJWT = (id,email,name,img) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id: id,
            email: email,
            name: name,
            img:img
        };
    
        jwt.sign(payload, JWT_KEY,{
            expiresIn: '12h'
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject('No se pudo generar el JWT')
            } else{
                resolve(token);
            }
        })
    });
    
};