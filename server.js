import app from './app.js';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const httpServer = http.createServer(app);
const io = new SocketIOServer(httpServer);

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
});

app.set('socketio', io);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('🚀 Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
