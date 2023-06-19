const { fetchTopics } = require("../models/topic.models")

exports.getTopics = (req, res) =>{
    fetchTopics().then((output)=>{
        res.status(200).send({ topics: output });
    })
    .catch((err)=>{
        next( err);
    })
};