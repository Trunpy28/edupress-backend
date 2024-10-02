import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './Routes/index.js';

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:3001', // Địa chỉ frontend React
    credentials: true, // Cho phép gửi cookie
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log('Connected to Db Successfully');
    })
    .catch((err)=>{
        console.log(err);
    })

app.listen(process.env.PORT, ()=>{
    console.log('Server is running in port: ' + process.env.PORT);
})