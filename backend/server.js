import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import petroutes from './routes/petroutes.js'
import userroutes from './routes/userroutes.js'
import connecttodb from './db.js'

const port = process.env.PORT||8080;
dotenv.config();

app.use(express.json())
app.use(cors())
app.use(cookieParser());

app.use("/api/pet", petroutes);
app.use("/api/user",userroutes);

app.listen(port, ()=>{
    connecttodb();
    console.log(`server is listening on port${port}`)
});