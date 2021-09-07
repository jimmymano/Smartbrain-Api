const { json } = require('body-parser');
const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: 'ec514acc370b4b3caa8fe2e9b1790573'
   });
const handleApiCall = (req,res)=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data =>{
        res.json(data);
    })
    .catch(err =>res.status(400).json('unable to work with api'))
}


const handleImage = (req,res,db)=>{
    const {id} = req.body;
db('users').where('id','=',id)
.increment('entries',1)
.returning('entries')
.then(entries=>{
    res.json(entries[0]);
})
.catch(err => res.status(400).json('error'))
}

module.exports = {handleImage:handleImage, handleApiCall:handleApiCall}