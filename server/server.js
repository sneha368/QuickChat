import express from 'express';
import cors from 'cors';
import http from 'http';//http for socket.io
import {connectDb}  from './lib/db.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const server = http.createServer(app);//create server using http

app.use(express.json({limit: '50mb'}));
app.use(cors());

app.use('/api/status', (req, res) => {
  res.send({status: 'Server is running'});
});

app.use('/api/auth',userRouter);
app.use("/api/messages",messageRouter);


//connect to mongoDB
await connectDb();
const PORT = process.env.PORT || 5000;          
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}   );

//Socket.io setup
