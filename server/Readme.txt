TO ENABLE CORS POLICY :
First method -
// const cors = require('cors')
// var corsOptions = {
//     origin: 'http://localhost:8082',
//     optionsSuccessStatus: 200
// }
// expApp.use(cors(corsOptions));
Seconde method -
// res.header("Access-Control-Allow-Origin", "http://localhost:8082");
// res.header("Access-Control-Allow-Methods", "GET, POST","PUT");

Parse JSON to ARRAY
//var sumData = JSON.parse('['+data+']');

Read Data from file
 fs.readFile('C:/Users/1513717/Desktop/RAJ/Codes/MEAN/TestBank/client/data/summary.json', function (err, data) {
        if (err) console.log(err);
      
}); return sendSuccess(res, data);