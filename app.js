const express = require("express");
const ejs = require('ejs');
const path = require('path');
const session = require('express-session');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: 'keyboard cat',
    resave:false,
    saveUninitialized:false,
    cookie: { maxAge: 60000 }}
))

app.use(express.static(path.join(__dirname,'static')))
app.set('views','views');
app.set('view engine','ejs')


app.get('/',(req,res)=>{
    if (!req.session.rand){
        req.session.rand = Math.floor(Math.random() * 100) + 1;
    }
    res.render('index',{rand:req.session.rand,guess:req.session.guess})
})

app.get('/process',(req,res)=>{
    res.redirect('/');
})
app.post('/process',(req,res)=>{
    if(isNaN(Number(req.body.guess))){res.send('Invalid Entry, Please enter a number next time...')}
    req.session.guess = req.body.guess;
    res.redirect('/');
})


app.listen(8080,()=>{
    console.log('Listening at port 8080')
})