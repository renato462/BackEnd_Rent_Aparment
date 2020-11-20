const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../model/user');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/googleVerify');


exports.login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        // Verificar email
        const usuarioDB = await User.findOne({ email });

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password);
        // 
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }
        console.log(usuarioDB);
        // Generar el TOKEN - JWT
        const token = await generateJWT( usuarioDB.id, usuarioDB.email, usuarioDB.name, usuarioDB.img);


        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


exports.googleSignIn = async( req, res = response ) => {
    const googleToken = req.body.token;
    try {
        const { name, given_name, family_name, email, picture  } = await googleVerify( googleToken );
        const usuarioDB = await User.findOne({ email });
        let usuario;

        if ( !usuarioDB ) {
            // si no existe el usuario
            usuario = new User({
                name: given_name,
                lastName: family_name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // existe usuario  
            usuario = usuarioDB;
            usuario.google = true;
        }   
        // Guardar en DB
        await usuario.save();
        
        // Generar el TOKEN - JWT
        const token = await generateJWT( usuario.id, usuario.email, usuario.name, usuario.img);
        
        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto',
            
        });
    }
}


exports.renewToken = async(req, res = response) => {

   
    const uid = req.uid;
    
    // Generar el TOKEN - JWT
    const token = await generateJWT( uid );

    const user = await User.findById(uid);

    res.json({
        ok: true,
        token,
        user
    });

}


