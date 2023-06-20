const db = require("../db/connection");

exports.fetchTopics = () =>{
   
   let selectTopicsQueryString = `SELECT * FROM topics`;
  
   return db.query(selectTopicsQueryString).then((result) => {
   
    return result.rows;
  });
};
