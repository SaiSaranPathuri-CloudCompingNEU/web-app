
const express =  require('express');
// const { nextTick } = require('process');
const app = express();
const port = 3000;
const fs = require('fs');
const bcrypt = require("bcrypt");
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
require('dotenv').config();
const path = require("path");
const logger = require('./logger.js');
// const StatsD = require('node-statsd');
// const statsd = new StatsD({ host: "localhost", port: 8125 });

const db = require('./models');
const errorHandler = require('./middleware/error');
// const bodyparser = require('body-parser');
const multer = require('multer');

const user_routes = require ('./routes/users');

const {uploadFile, getFileStream} =  require("./s3");




app.use(express.json());

app.use('',user_routes );


( async ()=> {
  try{
    await db.sequelize.sync();}
    catch(e){
      logger.warn("database connection failed");
    }
})();

  app.listen(port, () => {
    console.log(process.env.HOST);
    console.log(process.env.USER);
    logger.info("server running");
    console.log(`Example app listening on port ${port}`)
  });

// app.get('/images/:key', (req,res)=>{
// const key = req.params.key;
// const readStream =  getFileStream(key);

// readStream.pipe(res);
// return 
// });

  // app.post("/upload/:id", upload.single('image') , async (req,res)=>{

  //   const file = req.file
   
  //   const result = await uploadFile(file);
  //   await unlinkFile(file.path);
  //   console.log(result);

  //  return  res.status(201).json({imagePath: `/images/${result?.Key}`});
  //   })

module.exports = app;