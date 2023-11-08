const express = require('express')
const app = express()
app.use(express.json())
// const auth = require('../auth/auth')
const kamarController = require('../controllers/kamar.controller')

app.get("/getAllKamar", kamarController.getAllKamar)
app.post("/", kamarController.addKamar)
app.put("/updateKamar/:id", kamarController.updateKamar)
app.post("/findKamar", kamarController.findKamar)
app.delete("/:id", kamarController.deleteKamar)
module.exports =app