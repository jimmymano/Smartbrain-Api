const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'jimmypost',
      database : 'smartbrain'
    }
});

db.select('*').from('users').then(data=>{
    console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users:[
        {
            id:'123',
            name:'John',
            email:'john@gmail.com',
            password:'cookies',
            entries:0,
            joined: new Date()
        },
        {
            id:'124',
            name:'Sally',
            email:'sally@gmail.com',
            password:'bananas',
            entries:0,
            joined: new Date()
        }
    ]
}

app.get('/',(req,res)=>{
    res.send(database.users)
})

app.post('/signin',(req,res)=>{
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json(database.users[0])
    }else{
        res.status(400).json('error logging in')
    }
})

app.post('/register',(req,res)=>{
    const{email,name,password}=req.body;
    //returning and insert are knex methods
 db('users').returning('*')
 .insert({
 email:email,
 name:name,
 joined: new Date()    
 }).then(user =>{
    res.json(user[0])
 }).catch(err=>res.status(400).json("unable to register"))
  })

app.get('/profile/:id',(req,res)=>{
    const {id} = req.params;
db.select('*').from('users').where({id})
.then(user =>{
if(user.length){
    res.json(user[0])
}else{
    res.status(400).json('Not found')
}
})
.catch(err=>res.status(400).json('error'))
})

app.put('/image', (req,res)=>{
    const {id} = req.body;
db('users').where('id','=',id)
.increment('entries',1)
.returning('entries')
.then(entries=>{
    res.json(entries[0]);
})
.catch(err => res.status(400).json('error'))
})

app.listen('3000', ()=>{
    console.log('app is running on port 3000');
})


/*
route route --> res = this is working
signin route --> POST = success/fail, request responds w success/fail
register -->POST = user, request that responds w new user info
/profile/:userId --> GET, request that will return user information
/image --> PUT --> user, a variable that goes up by 1 whenever a user submits a photo
*/