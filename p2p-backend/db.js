const db = require('mysql2');


let connection = db.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'plans2pick'
  });

// let connection = db.createConnection({
//     host     : 'plans2pick.caldkym4xvzd.ap-south-1.rds.amazonaws.com',
//     user     : 'admin',
//     password : '#*#P2P345',
//     database : 'plans2pick'
//   });


connection.connect( (err)=>{
 if(err){
     console.log('error while connecting')
 }else{
     console.log('mysql connected')
 }
})

module.exports = connection;