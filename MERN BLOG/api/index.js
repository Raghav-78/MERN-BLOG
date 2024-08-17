import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.routes.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import helmet from 'helmet';

dotenv.config();

await mongoose.connect(process.env.MONGO).then(
    ()=>{
        console.log("MongoDB connected!!");
    }).catch((err)=>{
        console.log("MongoDB connection error",err);
    });

    const __dirname=path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
  });

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

  app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "img-src 'self' data: *");
    next();
  });

app.listen(3000,()=>{
    console.log("Server is running on port 3000!!");
});


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname,'/client/dist')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
});

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message||"Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });    
});