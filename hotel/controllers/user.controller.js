const userModel = require(`../models/index`).user
const Op = require(`sequelize`).Op
// const upload = require('./upload_foto_user').single('foto');
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
const md5 = require('md5')
const SECRET_KEY = "secretcode";
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



// exports.addUser = (request,response) => {
//     let newUser = {
//         nama_user: request.body.nama_user,
//         foto: request.body.foto,
//         email: email,
//         password: request.body.password,
//         role: request.body.role
//     }
// }

exports.getAllUser = async (request, response) => {
    /** call findAll() to get all data */
    let users = await userModel.findAll()
    return response.json({
    success: true,
    data:users,
    message: `All Users have been loaded`
    })
    }

exports.addUser = (request,response) => {
        let Newuser = {
            nama_user: request.body.nama_user,
            foto: request.body.foto,
            email: request.body.email,
            password: md5(request.body.password),
            role: request.body.role
        }
    
        userModel.create(Newuser)
        .then(result => {
            return response.json({
                success: true,
                data:result,
                message: 'ippe user baru'
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
    }

exports.login  = async (request, response) => {
try{
    const params = {
        email: request.body.email,
        password: md5(request.body.password),
    };
    const findUser = await userModel.findOne({where: params});
    if (findUser == null){
        return response.status(400).json({
            message: "takde"
        });
    }

    let tokenPayLoad = {
    id_user: findUser.id,
    email: findUser.email,
    role: findUser.role,
    nama_user: findUser.nama_user,
     };
     tokenPayLoad = JSON.stringify(tokenPayLoad);
     let token = await jsonwebtoken.sign(tokenPayLoad, SECRET_KEY);
     
     return response.status(200).json({
        message:"success login",
        data:{
            token:token,
            id_user: findUser.id_user,
            nama_user: findUser.nama_user,
            email: findUser.email,
            role: findUser.role,
        },
     })
} catch (error) {
    console.log(error);
    return response.status(400).json({
        message: error,
    });
}
}

exports.LoginRegister = async (request, response) => {
    const email = request.body.email;
    let user = await userModel.findAll({
        where: { role: "customer", email: email},
    });
    if (user.length === 0) {
        let newUser = {
            nama_user: request.body.nama_user,
            foto: request.body.linkFoto,
            email: email,
            role: "customer",
        };

        if (newUser.nama_user === "" || newUser.email === ""){
            return response.status(400),json({
                success: false,
                message: "isi tod",
            });
        } else{
            userModel
            .create(newUser)
            .then((result) => {
                return response.json({
                    success: true,
                    data: true,
                    data: result,
                    message: 'new user has been signed'
                });
            })
            .cath((error) => {
                return response.status(400).json({
                    success: false,
                    message: error.message,
                });
            })
        }
    } else {
        return response.json({
            success: true,
            data:user,
            message: 'user baru sudah ada dan berhasil'
        });
    }
};
