const db = require("../db/connection");

exports.fetchFrequencies = () =>{
   
   let selectFrequencyQueryString = `SELECT * FROM frequency`;
  
   return db.query(selectFrequencyQueryString).then((result) => {
 
    return result.rows;
  });
};