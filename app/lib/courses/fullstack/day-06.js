export const day06 = {
  day: 6,
  title: "WebSockets & Real-time",
  intro: "Socket.io allows bidirectional communication.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>What a WebSocket is (and what it is not).</li>
  <li>Socket.IO vs native WebSockets: when to use which.</li>
  <li>Rooms, events, acknowledgements, and reconnect strategy.</li>
  <li>Scaling real-time systems: sticky sessions, Redis adapter, and backpressure.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Handshake: HTTP → Upgrade → Persistent Connection</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
WebSockets begin as an HTTP request, then the protocol upgrades to a persistent bi-directional channel.
This is why proxies/load balancers must support <code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-1 rounded">Upgrade</code> headers.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
Client                 Server
  │   GET /socket.io     │
  │  Upgrade: websocket  │
  ├─────────────────────▶│
  │  101 Switching Proto │
  │◀─────────────────────┤
  │  (persistent channel)│
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) “Real-time” Patterns</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Chat</span>: room per conversation.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Presence</span>: track online users (be careful with reconnects).</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Notifications</span>: reliable delivery needs ack + retry.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Live dashboards</span>: throttle/aggregate to avoid flooding clients.</li>
</ul>

<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-800 dark:text-red-200 text-sm">
    <span class="text-yellow-600 dark:text-yellow-400 font-bold">Scalability reality:</span> every connected socket consumes RAM.
    At scale, you also need cross-instance pub/sub (Redis, NATS, Kafka) so messages reach the right server.
  </p>
</div>
            `,
  code: `/**
 * Day 6: Socket.IO mini demo (server-side)
 * Install: npm i express socket.io
 * Run: node realtime-server.js
 */

const express = require('express');
const http = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: true, credentials: true },
});

io.on('connection', (socket) => {
  // join a room (e.g., a chatId)
  socket.on('join', ({ roomId }) => {
    socket.join(roomId);
    socket.emit('system', { message: 'joined ' + roomId });
  });

  // event with acknowledgement (reliability)
  socket.on('chat:send', async ({ roomId, text }, ack) => {
    // validate/sanitize in real app
    io.to(roomId).emit('chat:message', { id: Date.now(), text });
    if (typeof ack === 'function') ack({ ok: true });
  });

  socket.on('disconnect', (reason) => {
    // cleanup presence, etc.
    // console.log('disconnect', socket.id, reason);
  });
});

server.listen(3000, () => console.log('realtime on http://localhost:3000'));`,
  comparison: {
    junior: `// ❌ Polling (wasteful)
setInterval(async () => {
  const res = await fetch('/api/messages');
  render(await res.json());
}, 1000);`,
    senior: `// ✅ Push-based real-time (efficient)
socket.emit('join', { roomId: 'chat:123' });
socket.on('chat:message', render);
socket.emit('chat:send', { roomId: 'chat:123', text: 'hi' }, (ack) => {
  if (!ack.ok) console.error('send failed');
});`
  },
  interview: {
    questions: [
      {
        q: "Why do WebSockets complicate horizontal scaling?",
        a: "Because connections are stateful. Requests/events must reach the same instance that holds the socket, or you need a shared pub/sub layer (e.g., Redis adapter) to broadcast across instances."
      },
      {
        q: "Socket.IO vs native WebSocket — difference?",
        a: "Socket.IO adds features on top (reconnects, fallbacks, rooms, acks) and is not the same protocol as raw WebSocket. Native WS is lower-level and lighter when you only need the protocol."
      },
      {
        q: "What are sticky sessions and when do you need them?",
        a: "Load balancer affinity that routes the same client to the same server. Helpful for stateful connections like WebSockets unless you have a shared adapter that removes the requirement."
      }
    ]
  }
};
