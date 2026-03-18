require('dotenv').config();
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log(`✅ Client connected: ${socket.id}`);

    socket.on('join-room', (roomId) => {
      socket.join(roomId);
      console.log(`👤 Socket ${socket.id} joined room ${roomId}`);
      // Notify others in room
      socket.to(roomId).emit('user-joined', socket.id);
    });

    socket.on('code-change', ({ roomId, code }) => {
      console.log(`📝 Received code change for room ${roomId} from ${socket.id}`);
      // Broadcast to everyone else in the room
      socket.to(roomId).emit('code-update', code);
      console.log(`📡 Broadcasted code update to room ${roomId}`);
    });

    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });

  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
