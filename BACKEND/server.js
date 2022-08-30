const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('dotenv').config()
const db = require('../BACKEND/Database/db');
const authRoutes = require('../BACKEND/Routes/auth');
const categoryRoutes  = require('../BACKEND/Routes/category');
const productroutes = require('../BACKEND/Routes/product')
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')

app.use(cookieParser())
app.use(cors());
app.use(morgan('dev'));
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())


app.use('/api/auth',authRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/product',productroutes)


const port = process.env.port||5000
db.databaseConnect((err,res)=>{
    if(res=='_'){
        console.log('cant connect to database')
    }else{
        console.log(`sucecssfully connected to database RESTAURANT_MERN`)
    }
})

const server = app.listen(process.env.port,()=>{
    console.log(`connected to port no ${process.env.port}`)
})