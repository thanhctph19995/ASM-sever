const express = require('express')
const app = express()

app.route('/api')

module.exports = app

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const parser = bodyParser.urlencoded({ extended: true });

app.use(parser);


const Product= require("./models/modelProduct");


const mongoose = require('mongoose');

const uri = 'mongodb+srv://thanhct:main0607@cluster0.rdak5hj.mongodb.net/dbSanPham?retryWrites=true&w=majority';


app.post('/addproduct', async (req, res) => {

    await mongoose.connect(uri);

    console.log('Ket noi db thanh cong!')
  let sp1= {
    masp: req.body.masp,
    tensp: req.body.tensp,
    loaisp: req.body.loaisp,
    price: req.body.price,
    image: req.body.image,
    color: req.body.color
  };

  console.log(req.body)

  let kq = await Product.collection.insertOne(sp1);

  console.log(kq);

  let sanpham = await Product.find();
  res.send(sanpham);
})
app.post('/update/:id' ,async (req, res) => {
  const productId = req.params.id;
  let masp = req.body.masp;
  let tensp = req.body.tensp;
  let loaisp = req.body.loaisp;
  let price = req.body.price;
  let color = req.body.color;

  // Thực hiện lưu dữ liệu vào MongoDB
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { masp, tensp, loaisp, price, color },
      { new: true }
    );
    console.log('Dữ liệu đã được cập nhật:', updatedProduct);
  } catch (error) {
    console.error('Lỗi khi cập nhật dữ liệu:', error);
   
  }
});


app.get('/list', async (req, res) => {

  await mongoose.connect(uri);

  console.log('Ket noi db thanh cong!')

  let sanpham = await Product.find();
  res.send(sanpham);

  //await mongoose.connect(uri);

  //let nvs = await nvModel.find({tuoi: 23});

  //   console.log(nvs)

  //   res.send(nvs);
})