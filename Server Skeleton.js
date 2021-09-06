//dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');
const saltRounds=10;
//controllers
const register = require('./controllers/register');

const db = knex({...});

db.select('*').from('users').then(data=>{...});

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.post('/signin',(req,res)=>{...})
app.get('/profile/:id',(req,res)=>{...})
app.put('/image', (req,res)=>{...})
app.post('/register',(req,res)=>{...})

app.listen('3000', ()=>{...})



//dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');
const saltRounds=10;
//controllers
const register = require('./controllers/register');

const db = knex({...});

db.select('*').from('users').then(data=>{...});

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.get('/profile/:id',(req,res)=>{...})
app.put('/image', (req,res)=>{...})
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})


app.listen('3000', ()=>{...})
