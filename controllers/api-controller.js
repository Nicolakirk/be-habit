const file = require("../endpoints.json");

exports.endpoints =  (req, res, next) => {
    res.status(200).send(file)
    .catch((err)=>{
        next(err);
    })
}