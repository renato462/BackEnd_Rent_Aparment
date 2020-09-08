const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../model/user');
const { generateJWT } = require('../helpers/jwt');


exports.getUsers = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [ users, total ] = await Promise.all([
        User
            .find({}, 'nombre email role google img')
            .skip( desde )
            .limit( 5 ),

            User.countDocuments()
    ]);


    res.json({
        ok: true,
        users,
        total
    });

}

exports.addUser = async(req, res = response) => {

    const { email, password } = req.body; 

    try {

        const existeEmail = await User.findOne({ email });

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const user = new User( req.body );
    
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
    
    
        // Guardar usuario
        await user.save();

        // Generar el TOKEN - JWT
        const token = await generateJWT( user.id );


        res.json({
            ok: true,
            user,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


}


exports.updateUser = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const userId = req.params.id;

    try {

        const usuarioDB = await User.findById( userId );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
        const { password, google, email, ...campos } = req.body;
        
        if ( usuarioDB.email.toString() !== email.toString() ) {
            
            const existeEmail = await User.findOne({ email });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }
        
        campos.email = email;
        console.log(campos);
        const usuarioActualizado = await User.findByIdAndUpdate( userId, campos, { new: true } );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


exports.deleteUser = async(req, res = response ) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await User.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await User.findByIdAndDelete( uid );

        
        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


}

