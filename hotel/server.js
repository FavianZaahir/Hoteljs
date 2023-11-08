// const express = require("express") // memanggil library express js
// const bodyParser = require("body-parser") // memanggil library body-parser
// const cors = require("cors") // memanggil library cors
// const app = express()

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(cors())

// app.get("/user", (req,res) => {
// let response = {
// message: "Muhammad Favian Zaahir",
// method: req.method,
// code: res.statusCode
// }

// res.json(response)
// })

// app.listen(8000, () => {
// console.log("Server run on port 8000");
// })

// const express = require("express") 
// const bodyParser = require("body-parser")
// const app = express() 
// const cors = require("cors") 
// const PORT = 8000 
// const userRoute = require('./routes/userRoute.js')
// app.use(cors()) 
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))
// app,use('/user', userRoute)



// app.listen(PORT, () => { 
//     console.log(`Server of hotel runs on port 
// ${PORT}`) 
// })

const express = require('express');
const app = express();
const PORT = 8000;
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require('./routes/user.route');
const kamarRoute = require('./routes/kamar.route')
const pemesananRoute = require('./routes/pemesanan.route');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors()); 
app.use('/user', userRoute); 
app.use('/kamar', kamarRoute);
app.use('/pemesanan', pemesananRoute)

app.listen(PORT,() => {
    console.log('Hotel run on port 8000')
})