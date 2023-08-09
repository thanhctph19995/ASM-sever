var express = require('express');
var app = express();
var expresshbs= require('express-handlebars');
var Product= require("./models/modelProduct");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const ApiController = require('./api_app');

app.use('/api', ApiController)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

  mongoose.connect('mongodb+srv://thanhct:main0607@cluster0.rdak5hj.mongodb.net/dbSanPham?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  });

  
app.engine('.hbs', expresshbs.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.get('/danhsach', async(req, res)=>{
  try {
    const data = await Product.find({}).lean();
    
    res.render('home',{
      layout:'listproduct',
      data:data
    });
  } catch (error) {
    console.error('Lỗi lấy dữ liệu:', error);
    res.status(500).json({ error: 'Lỗi lấy dữ liệu' });
  }
  
});


app.post('/addproduct', async(req,res)=>{
  const sp = new Product(req.body);
  try{
      await sp.save();
      
      let listproduct= Product.find().lean();
      res.redirect('/danhsach');

  } catch(error){
      res.status(500).send(error);
  }
  
});

app.get('/addproduct/delete/:id', async (req, res)=>{
try {
  const product=await Product.findByIdAndDelete(req.params.id);
  
  if(!product){
    res.status(404).send("Không tìm thấy sản phẩm");
    res.status(200).send();
  }else{
    res.redirect('/danhsach');
  }
} catch (error) {
  res.status(500).send(error);
}
});

app.post('/updateproduct/update/:id', async (req, res) => {
  const productId = req.params.id;
  const { masp, tensp, loaisp, price, image, color } = req.body;
   console.log(req.body.loaisp);
  // Thực hiện lưu dữ liệu vào MongoDB
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { masp, tensp, loaisp, price, image, color },
      { new: true }
    );
    console.log('Dữ liệu đã được cập nhật:', updatedProduct);
    res.redirect('/danhsach'); // Điều hướng về trang chủ hoặc trang xác nhận
  } catch (error) {
    console.error('Lỗi khi cập nhật dữ liệu:', error);
   
  }
});


app.get('/updateproduct/:id', async(req, res)=>{
    const product=await Product.findById(req.params.id).lean();
    res.render('home',{
      layout:'suasanpham',
      data:product
    });
});
app.get('/dangky', function(req, res){
    res.render('dangky');
});


app.get('/dangnhap', function(req, res){
  res.render('dangnhap');
});

app.get('/addproduct',function(req, res){
    res.render('editoradd');
});



app.listen(8000, function(){
    console.log("Server is running on port 8000");
});