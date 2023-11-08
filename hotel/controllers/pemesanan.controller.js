const tipe_kamarModel = require(`../models/index`).tipe_kamar
const Op = require(`sequelize`).Op
// const upload = require('./upload_foto_user').single('foto');
const bodyParser = require("body-parser");
const express = require('express');
const { request, response } = require("../routes/kamar.route");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

exports.getAllPemesanan = async (request, response) => {
    let pemesanans = await pemesananModel.findAll()
    return response.json({
        succes:true,
        data:pemesanans,
        message:"kamar loaded"
    })
    }

exports.findPemesanan = async (request, response) => {
    let keyword = request.body.keyword
    let pemesanans = await pemesananModel.findAll({
        where: {
            [Op.or]:[
            {id_user : keyword},
            {nama_pemesan:{[op.substring]:keyword}},
            {email_pemesan:{[Op.substring]: keyword}},
            {tgl_pemesanan:{[Op.substring]: keyword}},
            {tgl_check_in:{[Op.substring]: keyword}},
            {tgl_check_out:{[Op.substring]:keyword}},
            {nama_tamu:{[Op.substring]:keyword}},
            {id_tipe_kamar: keyword},
            {status_pemesanan:{[Op.substring]:keyword}},
            {id_user: keyword}
            ]
        }
    })
    return response.json({
        succes:true,
        data:pemesanans,
        message:'you found stuff'
    })
}

exports.addPemesanan = async (request, response) => {
    let newPemesanan = {
        nomor_pemesananan: request.body.nomor_pemesanan,
        nama_pemesan: request.body.nama_pemesan,
        email_pemesan: request.body.email_pemesan,
        tgl_pemesanan: request.body.tgl_pemesanan,
        tgl_check_in: request.body.tgl_check_in,
        tgl_check_out: request.body.tgl_check_out,
        nama_tamu: request.body.nama_tamu,
        id_tipe_kamar: request.body.id_tipe_kamar,
        id_user: request.body.id_user,
    }
    pemesananModel.create(newPemesanan)
    .then (result => {
        return response.json({
            succes:true,
            data:result,
            message:'Added'
        })
    })
    .catch(error =>{
        return response.json({
            succes:false,
            data:result,
            message:error.message
    })
})
}

exports.updatePemesanan = async (request, response) => {
    let dataPemesanan = {
        nomor_pemesananan: request.body.nomor_pemesanan,
        nama_pemesan: request.body.nama_pemesan,
        email_pemesan: request.body.email_pemesan,
        tgl_pemesanan: request.body.tgl_pemesanan,
        tgl_check_in: request.body.tgl_check_in,
        tgl_check_out: request.body.tgl_check_out,
        nama_tamu: request.body.nama_tamu,
        id_tipe_kamar: request.body.id_tipe_kamar,
        id_user: request.body.id_user,
    }
    let idPemesanan = request.params.id
    pemesananModel.update(dataPemesanan, {where:{id: idPemesanan}})
    .then (result => {
        return response.json({
            succes: true,
            message: 'updated',
        })
    }) 
    .catch(error => {
        return response.json({
            succes:false,
            message:error.message
        })
    })
}

exports.deletePemesanan = (request, response) => {
    let idPemesanan =   request.params.id
    pemesananModel.destroy({where: {id:idPemesanan}})
    .then(result => {
        return response.json({
            succes: true,
            message: 'ambatu explode',
    })
})
}
