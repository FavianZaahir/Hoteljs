const kamarModel = require(`../models/index`).kamar
const Op = require(`sequelize`).Op
// const upload = require('./upload_foto_user').single('foto');
const bodyParser = require("body-parser");
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

exports.addKamar = (request,response) => {
    let newKamar = {
        nomor_kamar : request.body.nomor_kamar,
        id_tipe_kamar : request.body.id_tipe_kamar
    }

    kamarModel.create(newKamar)
    .then(result =>{
        return response.json({
            success:true,
            data:result,
            message:"seg new room"
        })
    })
    .catch(error => {
        return response.json({
        success:false,
        message:'no seg:(('
    })
})
}

exports.updateKamar = (request, response) => {
    let dataKamar = {
        nomor_kamar: request.body.nomor_kamar,
        id_tipe_kamar: request.body.id_tipe_kamar
    }
    let id = request.params.id
    kamarModel.update(dataKamar, {where: {id: id } })
    .then(result =>{
        return response.json({
            success:true,
            message: 'data diupdate wir'
        })

    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}

exports.findKamar = async (request,response) => {
    let keyword = request.body.keyword
    let kamars = await kamarModel.findAll({
        where:{
            [Op.or]: [
                {nomor_kamar: keyword},
                {id_tipe_kamar: keyword}
            ]
        }
    })
    return response.json({
        success: true,
        data: kamars,
        message: 'mw ngintip?!'
    })
}
    
exports.getAllKamar = async(request,response) => {
    let kamars = await kamarModel.findAll()
    return response.json({
        success:true,
        data:kamars
    })
}

exports.deleteKamar =  (request,response) => {
    let id = request.params.id
    kamarModel.destroy({where: {id:id}})
    .then(result => {
        return response.json({
            success:true,
            message:'why u destroy me niga'
        })
    })
}