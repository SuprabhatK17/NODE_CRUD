
// require('./models/db');

const mongoose = require('mongoose')    //to use mongoose
const url = 'mongodb://localhost:27017/CRUD';

 const express = require ('express')     //to use express  
 const app = express()       // to start express

app.set('view engine','ejs');

var User = require('./models/index.js');
var bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));


// const employeeController = require('./controllers/employeeController')

// //function to connect database
mongoose.connect(url,{ userNewUrlParser:true })
const con = mongoose.connection

con.once('open',function(){
   console.log('connected')
 });



// app.use('/employee',employeeController);


app.get('/',function(req,res){
    res.render('insert');
});

// import module
app.post('/insert',function(req,res){
    var user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })

    user.save(()=>{
        res.send("<h1>data send</h1>");
    });
});

app.get('/data',function(req,res){
    User.find({},function(err,result){
        res.render('data',{users:result});
    });

    
});

app.get('/delete/:id',async function(req,res){

    await User.findByIdAndDelete(req.params.id);

    res.redirect('/data');
});

app.get('/update/:id',function(req,res){
    User.findById(req.params.id,function(err,result){
        res.render('update',{users:result});
    });
});

app.post('/update/:id',async function(req,res){

    await User.findByIdAndUpdate(req.params.id,req.body); //req body will get the param id data and update function will modify the data

    res.redirect('/data');
});



const server = app.listen(3000,function() {
    console.log('Express server started at port : 3000');
 });








