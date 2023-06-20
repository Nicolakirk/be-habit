const { fetchFrequencies } = require("../models/frequency.models");


exports.getFrequency = (req, res) =>{
    fetchFrequencies().then((output)=>{
        res.status(200).send({ frequency: output });
    })
    .catch((err)=>{
        next( err);
    })
};