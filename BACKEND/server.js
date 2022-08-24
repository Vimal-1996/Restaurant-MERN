const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('dotenv').config()
const db = require('../BACKEND/Database/db');
const authRoutes = require('../BACKEND/Routes/auth');
const categoryRoutes  = require('../BACKEND/Routes/category');
const cookieParser = require('cookie-parser');

app.use(cookieParser())
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());




app.use('/api/auth',authRoutes);
//app.use('/api/category',categoryRoutes);
app.post('/api/category/',(req,res)=>{
    console.log('inside category controller')
    console.log(req)
})

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