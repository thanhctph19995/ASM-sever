const express = require('express')
const app = express()

app.route('/api')

module.exports = app

// dùng cho postman
//var router = express.Router();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const parser = bodyParser.urlencoded({ extended: true });

app.use(parser);

const Product= require("./models/modelProduct");

const mongoose = require('mongoose');

const uri = 'mongodb+srv://thanhct:main0607@cluster0.rdak5hj.mongodb.net/dbSanPham?retryWrites=true&w=majority';

//const nvModel = require('./nhanvienModel');

app.post('/addproduct', async (req, res) => {

    await mongoose.connect(uri);

    console.log('Ket noi db thanh cong!')

    let sp = {
        masp: req.body.masp,
        tensp: req.body.tensp,
        loaisp: req.body.loaisp,
        price: req.body.price,
        image: req.body.image,
        color: req.body.color
    };

    console.log(req.body)

    let kq = await Product.collection.insertOne(sp);

    console.log(kq);

    let sanphams = await Product.find();
    res.send(sanphams);
})


app.get('/list', async (req, res) => {

    await mongoose.connect(uri);

    console.log('Ket noi db thanh cong!')

    let sanphams = await Product.find();
    res.send(sanphams);

    //await mongoose.connect(uri);

    //let nvs = await nvModel.find({tuoi: 23});

    //   console.log(nvs)

    //   res.send(nvs);
})