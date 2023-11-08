const express = require('express')
const app = express()
app.use(express.json())
// const auth = require('../auth/auth')
const pemesananController = require('../controllers/pemesanan.controller')

app.get("/getAllPemesanan", pemesananController.getAllPemesanan)
app.post("/", pemesananController.addPemesanan)
app.put("/updatePemesanan/:id", pemesananController.updatePemesanan)
app.post("/findPemesanan", pemesananController.findPemesanan)
app.delete("/:id", pemesananController.deletePemesanan)
module.exports =app