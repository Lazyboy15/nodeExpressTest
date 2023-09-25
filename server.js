// To look if it ruuing in Production env or Not
// if Defult Node env Not == the Prodution run dotenv env 
if (process.env.NODE_ENV !== 'Prodution'){
    require('dotenv').load() // will Load * FROM .ENV
}

// Conseptes
const express=require('express');
const app=express();
const expressLayouts= require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const mongoos = require('mongoose');
const { error } = require('console');
const db = mongoos.connection;
// const route = app.route();

//Setting 
app.set('view engine','ejs');
app.set('views' , __dirname + '/views');
app.set('layout','layouts/layout');

// Static File Setting
app.use(expressLayouts);
app.use(express.static(`public`));
app.use('/', indexRouter);


// monogo Database
// To Connrct the Data Base By The URL Pram but we dont use the url cuz the Securen and the connection is bee the loca and if we wonna to Deploy it we will be Have a Heuoge Problem
mongoos.connect(process.env.DATABASE_URL,{useNewUrlParser:true}); // cuz mongoose use the old way in connetions 
db.once('open', ()=> console.log(`Connected`));
db.on('error',error => console.error(error));
// PORT LISTIN 
app.listen(process.env.PORT || 3000) // => in This Commanf you ask to Run The Env port Or 3000
