var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
var UserShema = require('./schema/user');
var adminShema = require('./schema/admin');
var productShema = require('./schema/product');
var CategoryShema = require('./schema/category');
var SubcategoryShema = require('./schema/subcategory');
var isempty = require('is-empty');
const bcrypt = require('bcrypt');
var multer = require('multer');
var path = require('path');
var cors = require('cors');

const app = express()
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))
app.use("*", cors());


var server = http.createServer(app);
let port = 2020;

// file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    // console.log(file,"file****")
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).any();

function RegisterMidilware(req, res, next) {
  let errors = {}

  let emailregex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  let passwordregex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

  if (isempty(req.body.name)) {
    errors.name = "Name is reqiured";
  }

  // if (isempty(req.body.token)) {
  //   errors.token = "token is reqiured";
  // }

  if (isempty(req.body.age)) {
    errors.age = "Age is reqiured";
  }

  if (!emailregex.test(req.body.email)) {
    errors.email = "Email is invalid"
  }

  if (!passwordregex.test(req.body.password)) {
    errors.password = "password is invalid"
  }

  if (!isempty(errors)) {
    return res.status(400).json({ status: false, errors: errors })
  }

  next()
}

function LoginMidilware(req, res, next) {
  let errors = {}

  let emailregex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  let passwordregex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

  if (!emailregex.test(req.body.email)) {
    errors.email = "Email is invalid"
  }

  if (!passwordregex.test(req.body.password)) {
    errors.password = "password is invalid"
  }

  if (!isempty(errors)) {
    return res.status(400).json({ status: false, errors: errors })
  }

  next()
}

app.post("/register", upload, async (req, res) => {
  console.log(req.body, "requset");
  // console.log(req.files, "filesss");

  let errors = {}

  let findData = await UserShema.findOne({ email: req.body.email });
  // console.log(findData, "gfdcvb")

  if (!isempty(findData)) {
    errors.email = "already exists"
  }

  if (!isempty(errors)) {
    return res.status(400).json({ status: false, errors: errors })
  }

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);

  let files = req.files;
  let newArr = []
  await files.map((item) => {
    newArr.push(item.filename)
  })

  // console.log(newArr,"newArr*")
  // console.log(req.body,"reqqqqqqqq bodyyyyyy")
  // console.log(hash,"hashhhhhhhhhhh")

  const newData = new UserShema({
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
    gender: req.body.gender,
    phoneNo: req.body.phoneNo,
    email: req.body.email,
    password: hash,
    image: newArr
  })

  let result = await newData.save()
  return res.status(200).json({ status: true, message: "success", result })
});

app.post("/login", LoginMidilware, async (req, res) => {
  console.log(req.body, "requset");

  let errors = {}

  let findData = await UserShema.findOne({ email: req.body.email });
  console.log(findData, "gfdcvb")

  if (isempty(findData)) {
    errors.email = "email not found"
  }

  let isPass = await bcrypt.compare(req.body.password, findData.password);

  if (!isPass) {
    errors.password = "password is not match"
  }

  if (!isempty(errors)) {
    return res.status(400).json({ status: false, errors: errors })
  }

  return res.status(200).json({ status: true, message: "Login success", token: findData._id })
});

app.post("/getuser", async (req, res) => {
  console.log(req.body, "requset");

  let errors = {}

  let findtoken = await UserShema.findOne({ _id: req.body.token });
  console.log(findtoken, "gfdcvb")

  if (isempty(findtoken)) {
    errors.email = "token not found"
  }

  if (!isempty(errors)) {
    return res.status(400).json({ status: false, errors: errors })
  }

  res.status(200).json({ status: true, result: findtoken });
});

app.post("/adminlogin", async (req, res) => {
  console.log(req.body, "requset");

  let errors = {}

  // let findData = await adminShema.findOne({ email: req.body.email });
  // let passworddata = await adminShema.findOne({ password: req.body.password });
  findData = await adminShema.find({
    $and: [
      {email: req.body.email },
      {password: req.body.password} 
    ]
  });
  console.log(findData, "gfdcvb")

  if (isempty(findData)) {
    errors.email = "email not found"
  }

  if (!isempty(errors)) {
    return res.status(400).json({ status: false, errors: errors })
  }

  return res.status(200).json({ status: true, message: "Login success", token: findData._id })
});

app.post("/setproduct", upload, async (req, res) => {
  console.log(req.body, "requset");
  // console.log(req.files, "filesss");

  let files = req.files;
  let newArr = []
  await files.map((item) => {
    newArr.push(item.filename)
  })

  const newData = new productShema({
    p_name: req.body.p_name,
    price: req.body.price,
    category_id: req.body.category_id,
    subcategory_id: req.body.subcategory_id,
    p_image: newArr
  })

  let result = await newData.save()
  return res.status(200).json({ status: true, message: "success", result })
});

app.post("/getproduct", async (req, res) => {
  
  SearchItem=req.body.searchdata;
  let products;
  
    if (SearchItem) {

      if (!isNaN(Number(SearchItem))) {
        products = await productShema.find({ price: Number(SearchItem) });
      } else {
        products = await productShema.find({ p_name: { $regex: SearchItem, $options: 'i' } });
      }
    }
    
    
    else {
      products = await productShema.find();
    }

    res.status(200).json({ status: true, result: products });

});

app.post("/removeproduct", async (req, res) => {
  let errors = {}
  console.log(req.body, "reqbodyyyyyyy")

  let remove = await productShema.findByIdAndDelete({ _id: req.body.id },
  );
  // if ((req.body.token) !== (remove._id)) {
  //   errors._id = "id not match"
  // }


  // if (!isempty(errors)) { 
  //   return res.status(400).json({ status: false, errors: errors })
  // }
  // console.log(errors, "errorrrrrrrr");

  return res.status(200).json({ status: true, message: "remove success" })
});

app.post("/updateproduct", async (req, res) => {
  let errors = {}

  let update = await productShema.findByIdAndUpdate({ _id: req.body.id },
    {
      $set: {
        p_name: req.body.p_name,
        price: req.body.price,
        p_image: req.body.p_image,
      }
    },
    { new: true }
  );
  console.log(req.body.id, "tokennnnnn");
  console.log(update, "updateupdateupdate");

  // if ((req.body.token) !== (update._id)) {
  //   errors._id = "id not match"
  // }


  // if (!isempty(errors)) {
  //   return res.status(400).json({ status: false, errors: errors })
  // }
  // console.log(errors, "errorrrrrrrr");

  return res.status(200).json({ status: true, message: "update success", update })
});

app.post("/category", async (req, res) => {
  console.log(req.body, "request");

  let errors = {};

  let findData = await CategoryShema.findOne({ category: req.body.category });

  if (findData) {
      errors.category = "Category already exists";
  }

  if (!isempty(errors)) {
      return res.status(400).json({ status: false, errors: errors });
  }

  const newData = new CategoryShema({
      category: req.body.category,
  });

  try {
      let result = await newData.save();
      return res.status(200).json({ status: true, message: "Category created successfully", result });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, message: "Error creating category" });
  }
});

app.post("/subcategory", async (req, res) => {
  console.log(req.body, "request");

  let errors = {};

  let findData = await SubcategoryShema.findOne({ subcategory: req.body.subcategory });

  if (findData) {
      errors.subcategory = "Subcategory already exists";
  }

  if (!isempty(errors)) {
      return res.status(400).json({ status: false, message: "Error", errors: errors });
  }

  
  const newData = new SubcategoryShema({
      subcategory: req.body.subcategory,
      cate_id: req.body.cate_id, 
  });

  try {
      let result = await newData.save();
      return res.status(200).json({ status: true, message: "Subcategory created successfully", result });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, message: "Error creating subcategory" });
  }
});

app.get("/category", async (req, res) => {
  try {
      let categories = await CategoryShema.find();
      return res.status(200).json({ status: true, result: categories });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, message: "Error fetching categories" });
  }
});

app.get("/subcategory", async (req, res) => {
  try {
      const categoryId = req.query.cate_id;
      console.log(categoryId,"categoryIdcategoryId")

      let subcategories;
      if (categoryId) {
          subcategories = await SubcategoryShema.find({ cate_id: categoryId });
      } else {
          subcategories = await SubcategoryShema.find();
      }
    console.log(subcategories,"subcategoriessubcategoriessubcategoriessubcategories")
      return res.status(200).json({ status: true, result: subcategories });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, message: "Error fetching subcategories" });
  }
});


 

server.listen(port, function () {
  console.log(`Server started on this port : ${port}  `);
});

mongoose.connect("mongodb://127.0.0.1:27017/E-Com").then((connection) => {
  console.log(`DB connect on ${connection.connection.host}`);
});


// var token = jwt.sign({ password: req.body.password }, 'Gwyfyurfjhbsefuhssddf');
