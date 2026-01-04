"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/app/components/Header';
import { Layers, Database, Globe, Server, Cloud, Cpu, Lock, CheckCircle, AlertTriangle, Play, Sparkles, Trophy, ArrowRight, ArrowLeft, MessageSquare, CreditCard, Clock, Activity, Edit3, Search, Video, MapPin, MousePointer, Trash2, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

const COMPONENTS = [
    { id: 'client', label: 'Client', icon: Globe, color: 'text-blue-500' },
    { id: 'lb', label: 'Load Balancer', icon: Layers, color: 'text-indigo-500' },
    { id: 'server', label: 'App Server', icon: Server, color: 'text-green-500' },
    { id: 'db', label: 'Database', icon: Database, color: 'text-orange-500' },
    { id: 'cache', label: 'Cache', icon: Cpu, color: 'text-red-500' },
    { id: 'cdn', label: 'CDN', icon: Cloud, color: 'text-sky-500' },
    { id: 'auth', label: 'Auth Service', icon: Lock, color: 'text-yellow-500' },
];

const CHALLENGES = [
    { id: 'netflix', title: 'Design Netflix', level: 'L5 (Senior)', icon: Play, desc: 'Scalable video streaming architecture', brief: 'Design a system that supports 10M+ concurrent viewers streaming video globally. Focus on CDN strategy for content delivery, adaptive bitrate streaming for varying network conditions, and database sharding for user metadata. Consider how to handle peak traffic during new releases.', solution: { items: [{ id: 'c1', type: 'client', x: 50, y: 300 }, { id: 'lb1', type: 'lb', x: 250, y: 300 }, { id: 's1', type: 'server', x: 450, y: 200 }, { id: 's2', type: 'server', x: 450, y: 400 }, { id: 'cdn1', type: 'cdn', x: 600, y: 50 }, { id: 'db1', type: 'db', x: 700, y: 200 }, { id: 'cache1', type: 'cache', x: 700, y: 400 }], connections: [{ from: 'c1', to: 'lb1' }, { from: 'c1', to: 'cdn1' }, { from: 'lb1', to: 's1' }, { from: 'lb1', to: 's2' }, { from: 's1', to: 'db1' }, { from: 's2', to: 'cache1' }], explanation: ["CDN delivers video directly to users, reducing latency and offloading servers", "Microservices split: API Server (s1) handles metadata/auth, Playback Server (s2) handles DRM/manifests", "Redis cache handles 95% of read traffic for user profiles and viewing history", "Database sharding by UserID to handle 10M+ concurrent users"] } },
    { id: 'uber', title: 'Design Uber', level: 'L6 (Staff)', icon: Globe, desc: 'Real-time ride-sharing platform', brief: 'Build a system for matching riders with drivers in under 200ms. Implement QuadTree or Geohash-based spatial indexing for efficient proximity searches. Handle real-time location updates from millions of drivers via WebSockets. Ensure ACID compliance for payment transactions.', solution: { items: [{ id: 'riders', type: 'client', x: 50, y: 250 }, { id: 'lb1', type: 'lb', x: 250, y: 250 }, { id: 's_match', type: 'server', x: 450, y: 150 }, { id: 's_trip', type: 'server', x: 450, y: 350 }, { id: 'db_geo', type: 'db', x: 700, y: 150 }, { id: 'cache', type: 'cache', x: 700, y: 350 }], connections: [{ from: 'riders', to: 'lb1' }, { from: 'lb1', to: 's_match' }, { from: 'lb1', to: 's_trip' }, { from: 's_match', to: 'db_geo' }, { from: 's_trip', to: 'cache' }], explanation: ["QuadTree spatial indexing finds nearest drivers in O(logN) time with 200ms latency", "WebSocket connections maintain real-time location updates from millions of drivers", "Matching Service (s_match) handles proximity search, Trip Service (s_trip) manages ride lifecycle", "Redis cache stores active driver locations with 30-second TTL for fast lookups", "PostgreSQL with PostGIS extension handles geospatial queries and payment ACID transactions", "Kafka streams process location updates asynchronously to avoid blocking"] } },
    { id: 'whatsapp', title: 'Design WhatsApp', level: 'L5 (Senior)', icon: MessageSquare, desc: 'End-to-end encrypted messaging', brief: 'Create a chat system supporting 100k concurrent WebSocket connections per server. Implement message queues (Kafka) for async delivery and offline message storage. Use Cassandra for message history due to high write throughput. Handle presence (online/offline) status efficiently.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 250 }, { id: 'lb', type: 'lb', x: 250, y: 250 }, { id: 'gateway', type: 'server', x: 450, y: 150 }, { id: 's_msg', type: 'server', x: 450, y: 350 }, { id: 'db', type: 'db', x: 700, y: 250 }, { id: 'cache', type: 'cache', x: 700, y: 450 }], connections: [{ from: 'u1', to: 'lb' }, { from: 'lb', to: 'gateway' }, { from: 'gateway', to: 's_msg' }, { from: 's_msg', to: 'db' }, { from: 'gateway', to: 'cache' }], explanation: ["WebSocket Gateway maintains 100k persistent connections per server for real-time delivery", "Message Service handles encryption, storage, and delivery with Kafka for async processing", "Cassandra stores message history with partition key (user_id, timestamp) for high write throughput", "Redis cache handles online/offline presence with TTL keys (5-minute expiry)", "Kafka message queue ensures delivery to offline users when they reconnect", "End-to-end encryption using Signal Protocol with perfect forward secrecy"] } },
    { id: 'twitter', title: 'Design Twitter Feed', level: 'L6 (Staff)', icon: Cloud, desc: 'Social media timeline system', brief: 'Design timeline generation with fan-out-on-write vs fan-out-on-read trade-offs. Handle celebrities with 100M+ followers efficiently (hybrid approach). Cache pre-computed timelines in Redis. Use message queues for async fan-out to avoid blocking writes.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 250 }, { id: 'lb1', type: 'lb', x: 250, y: 250 }, { id: 's_write', type: 'server', x: 450, y: 150 }, { id: 's_read', type: 'server', x: 450, y: 350 }, { id: 'cache', type: 'cache', x: 700, y: 250 }, { id: 'db', type: 'db', x: 700, y: 450 }], connections: [{ from: 'u1', to: 'lb1' }, { from: 'lb1', to: 's_write' }, { from: 'lb1', to: 's_read' }, { from: 's_write', to: 'cache' }, { from: 's_read', to: 'cache' }, { from: 's_read', to: 'db' }], explanation: ["Hybrid fan-out: fan-out-on-write for normal users (<1000 followers), fan-out-on-read for celebrities", "Write Service pushes tweets to follower timelines asynchronously via Kafka", "Redis caches pre-computed timelines for O(1) read performance (95% cache hit rate)", "Read Service merges celebrity tweets on-demand to avoid fan-out explosion", "Cassandra stores tweets with partition key (user_id, timestamp) for fast retrieval", "Kafka handles async fan-out to avoid blocking tweet creation (eventual consistency)"] } },
    { id: 'instagram', title: 'Design Instagram', level: 'L5 (Senior)', icon: Database, desc: 'Photo sharing platform', brief: 'Handle petabytes of image data using object storage (S3). Implement CDN for global image delivery. Shard user metadata by UserID or PhotoID. Design async workers for thumbnail generation and filters. Consider storage costs and retrieval latency trade-offs.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 250 }, { id: 'cdn', type: 'cdn', x: 250, y: 50 }, { id: 'lb1', type: 'lb', x: 250, y: 250 }, { id: 's_media', type: 'server', x: 450, y: 200 }, { id: 's_worker', type: 'server', x: 450, y: 400 }, { id: 'db', type: 'db', x: 700, y: 200 }, { id: 'cache', type: 'cache', x: 700, y: 400 }], connections: [{ from: 'u1', to: 'cdn' }, { from: 'u1', to: 'lb1' }, { from: 'lb1', to: 's_media' }, { from: 's_media', to: 'db' }, { from: 's_media', to: 's_worker' }, { from: 's_worker', to: 'cache' }], explanation: ["S3 stores images as immutable blobs with 99.999999999% durability", "CDN caches popular images globally reducing latency from 500ms to 50ms", "Async workers generate thumbnails offline using message queues (SQS/Kafka)", "PostgreSQL sharded by UserID stores metadata (likes, comments, followers)", "Redis cache handles 95% of read traffic for user profiles and viewing history", "Multipart upload enables resumable uploads for large videos (>100MB)"] } },
    { id: 'tinyurl', title: 'Design TinyURL', level: 'L4 (Mid)', icon: Globe, desc: 'URL shortening service', brief: 'Generate unique short keys using Base62 encoding. Implement Key Generation Service (KGS) to pre-generate keys and avoid collisions. Cache short-to-long URL mappings in Redis (LRU). Decide between 301 (permanent) vs 302 (temporary) redirects based on analytics needs.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 200 }, { id: 'lb1', type: 'lb', x: 250, y: 200 }, { id: 's_app', type: 'server', x: 450, y: 200 }, { id: 'db', type: 'db', x: 650, y: 200 }], connections: [{ from: 'u1', to: 'lb1' }, { from: 'lb1', to: 's_app' }, { from: 's_app', to: 'db' }], explanation: ["KGS pre-generates Base62 keys to avoid collisions", "Redis caches URL mappings (100:1 read/write ratio)", "NoSQL DB for high write throughput"] } },
    { id: 'drive', title: 'Design Google Drive', level: 'L5 (Senior)', icon: Cloud, desc: 'Cloud file storage and sync', brief: 'Implement block-level file chunking (4MB chunks) for efficient uploads. Use content-addressable storage (SHA-256 hashing) for deduplication. Design metadata service for folder structures with ACID guarantees. Handle sync conflicts and version control.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 250 }, { id: 'lb1', type: 'lb', x: 200, y: 250 }, { id: 's_block', type: 'server', x: 400, y: 150 }, { id: 's3', type: 'db', x: 600, y: 150 }], connections: [{ from: 'u1', to: 'lb1' }, { from: 'lb1', to: 's_block' }, { from: 's_block', to: 's3' }], explanation: ["4MB chunks enable differential sync", "SHA-256 hashing deduplicates identical files", "Metadata DB ensures folder consistency"] } },
    { id: 'crawler', title: 'Design Web Crawler', level: 'L6 (Staff)', icon: Globe, desc: 'Distributed web crawler', brief: 'Build a politeness-aware crawler respecting robots.txt. Implement URL frontier with priority queues (Kafka). Use Bloom filters for duplicate detection at scale. Design DNS resolver cache to avoid bottlenecks. Handle content fingerprinting for mirror detection.', solution: { items: [{ id: 'seed', type: 'client', x: 50, y: 250 }, { id: 'frontier', type: 'server', x: 250, y: 250 }, { id: 'worker', type: 'server', x: 450, y: 250 }, { id: 's3', type: 'db', x: 650, y: 250 }], connections: [{ from: 'seed', to: 'frontier' }, { from: 'frontier', to: 'worker' }, { from: 'worker', to: 's3' }], explanation: ["URL frontier ensures politeness (rate limiting per domain)", "Bloom filter checks for duplicate URLs probabilistically", "DNS cache reduces lookup latency"] } },
    { id: 'ticketmaster', title: 'Design Ticketmaster', level: 'L5 (Senior)', icon: Lock, desc: 'High-traffic booking system', brief: 'Handle thundering herd problem when tickets go on sale (1M users at 10 AM). Implement waiting room queue (leaky bucket). Use distributed locks (Redis) for seat selection with TTL. Ensure ACID transactions for final booking. Consider multi-region challenges.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 250 }, { id: 'lb1', type: 'lb', x: 200, y: 250 }, { id: 'queue', type: 'server', x: 400, y: 50 }, { id: 's_book', type: 'server', x: 400, y: 250 }], connections: [{ from: 'u1', to: 'lb1' }, { from: 'lb1', to: 'queue' }], explanation: ["Waiting room queue controls traffic flow", "Redis distributed locks prevent double-booking", "SQL DB runs in serializable isolation"] } },
    { id: 'rate-limiter', title: 'Design Rate Limiter', level: 'L4 (Mid)', icon: AlertTriangle, desc: 'API abuse prevention', brief: 'Implement token bucket or leaky bucket algorithm. Use Redis Lua scripts for atomic check-and-increment operations. Design sidecar pattern (Envoy/Nginx) for low latency. Balance between global consistency vs local speed (eventual consistency trade-off).', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 200 }, { id: 'lb1', type: 'lb', x: 200, y: 200 }, { id: 'redis', type: 'cache', x: 400, y: 350 }, { id: 's_limit', type: 'server', x: 400, y: 200 }], connections: [{ from: 'u1', to: 'lb1' }, { from: 'lb1', to: 's_limit' }, { from: 's_limit', to: 'redis' }], explanation: ["Token bucket allows bursts but caps sustained rate", "Redis INCR provides atomic operations", "Sidecar pattern minimizes latency"] } },
    { id: 'leaderboard', title: 'Design Leaderboard', level: 'L4 (Mid)', icon: Trophy, desc: 'Real-time gaming scores', brief: 'Use Redis Sorted Sets (ZSET) for O(logN) score updates and rank queries. Handle millions of score updates per second. Implement write-through caching with async persistence to SQL. Consider sharding strategies (by score range vs user ID).', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 200 }, { id: 'lb1', type: 'lb', x: 250, y: 200 }, { id: 's_score', type: 'server', x: 450, y: 200 }, { id: 'redis', type: 'cache', x: 650, y: 100 }], connections: [{ from: 'u1', to: 'lb1' }, { from: 'lb1', to: 's_score' }, { from: 's_score', to: 'redis' }], explanation: ["Redis ZSET enables O(logN) rank lookups", "Write-through cache with async SQL persistence", "Shard by score range for global leaderboards"] } },
    { id: 'notification', title: 'Design Notification System', level: 'L5 (Senior)', icon: Sparkles, desc: 'Multi-channel push notifications', brief: 'Support email, SMS, and push notifications via pluggable providers (Twilio, FCM, APNS). Ensure idempotency to prevent duplicate sends. Use message queues to decouple triggers from delivery. Implement priority levels (OTP high, marketing low).', solution: { items: [{ id: 's_trigger', type: 'server', x: 50, y: 200 }, { id: 'mq', type: 'server', x: 250, y: 200 }, { id: 'workers', type: 'server', x: 450, y: 200 }, { id: 'fcm', type: 'cloud', x: 700, y: 150 }], connections: [{ from: 's_trigger', to: 'mq' }, { from: 'mq', to: 'workers' }, { from: 'workers', to: 'fcm' }], explanation: ["Queue decouples triggers from delivery", "Idempotency keys prevent duplicate sends", "Adapter pattern supports multiple providers"] } },
    { id: 's3', title: 'Design S3 Object Store', level: 'L6 (Staff)', icon: Database, desc: 'Petabyte-scale blob storage', brief: 'Achieve 11 9s durability using erasure coding (Reed-Solomon) instead of full replication. Separate data plane (streaming bytes) from control plane (metadata). Implement multipart uploads for large files. Design for strong consistency on new objects.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 200 }, { id: 'lb1', type: 'lb', x: 200, y: 200 }, { id: 's_api', type: 'server', x: 400, y: 100 }, { id: 's_data', type: 'server', x: 400, y: 300 }], connections: [{ from: 'u1', to: 'lb1' }, { from: 'lb1', to: 's_api' }, { from: 'lb1', to: 's_data' }], explanation: ["Data/control plane separation for scalability", "Erasure coding achieves durability with 1.5x overhead", "Multipart uploads enable parallel transfers"] } },
    { id: 'payment', title: 'Design Payment Gateway', level: 'L6 (Staff)', icon: CreditCard, desc: 'Fault-tolerant payment processing', brief: 'Zero tolerance for data loss. Implement idempotency keys for retry safety. Use double-entry ledger accounting (every debit has a credit). Design state machine (Created → Authorized → Captured). Implement reconciliation jobs to detect discrepancies.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 200 }, { id: 'api', type: 'server', x: 200, y: 200 }, { id: 'db_ledger', type: 'db', x: 200, y: 350 }, { id: 'psp', type: 'cloud', x: 450, y: 200 }], connections: [{ from: 'u1', to: 'api' }, { from: 'api', to: 'db_ledger' }, { from: 'api', to: 'psp' }], explanation: ["Idempotency keys prevent double-charging", "Double-entry ledger ensures balance integrity", "State machine enforces strict transitions"] } },
    { id: 'scheduler', title: 'Design Distributed Cron', level: 'L5 (Senior)', icon: Clock, desc: 'Cluster-wide job scheduler', brief: 'Use leader election (Raft/Paxos via ZooKeeper/Etcd) to ensure only one master triggers jobs. Implement timing wheel for high-precision scheduling. Decouple scheduler from executor using message queues. Handle missed jobs on system restart.', solution: { items: [{ id: 'db_jobs', type: 'db', x: 400, y: 50 }, { id: 's_leader', type: 'server', x: 250, y: 200 }, { id: 'zk', type: 'server', x: 100, y: 100 }, { id: 'q_tasks', type: 'server', x: 250, y: 350 }], connections: [{ from: 's_leader', to: 'zk' }, { from: 's_leader', to: 'db_jobs' }, { from: 's_leader', to: 'q_tasks' }], explanation: ["Leader election prevents duplicate job execution", "Timing wheel algorithm for precision", "Queue decouples scheduling from execution"] } },
    { id: 'metrics', title: 'Design Metrics System', level: 'L5 (Senior)', icon: Activity, desc: 'Monitoring like Datadog/Prometheus', brief: 'Handle heavy write load using time-series databases (InfluxDB/Prometheus). Choose between pull (scraping) vs push (agent) models. Implement downsampling (1s → 1min → 1hr) for long-term storage. Support multi-dimensional tagging for queries.', solution: { items: [{ id: 'app', type: 'client', x: 50, y: 200 }, { id: 'lb', type: 'lb', x: 200, y: 200 }, { id: 'kafka', type: 'server', x: 400, y: 200 }, { id: 'tsdb', type: 'db', x: 600, y: 200 }], connections: [{ from: 'app', to: 'lb' }, { from: 'lb', to: 'kafka' }, { from: 'kafka', to: 'tsdb' }], explanation: ["Time-series DB optimized for append-only writes", "Pull model easier for health monitoring", "Downsampling reduces storage costs"] } },
    { id: 'collab', title: 'Design Google Docs', level: 'L6 (Staff)', icon: Edit3, desc: 'Real-time collaborative editing', brief: 'Implement Operational Transformation (OT) or CRDTs to handle concurrent edits. Maintain WebSocket connections for real-time sync. Use session stickiness or Redis Pub/Sub for multi-server coordination. Snapshot documents periodically to S3.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 150 }, { id: 'u2', type: 'client', x: 50, y: 350 }, { id: 'lb', type: 'lb', x: 200, y: 250 }, { id: 's_collab', type: 'server', x: 400, y: 250 }], connections: [{ from: 'u1', to: 'lb' }, { from: 'u2', to: 'lb' }, { from: 'lb', to: 's_collab' }], explanation: ["Operational Transform resolves concurrent edits", "WebSockets push changes in real-time", "Session stickiness ensures same-server routing"] } },
    { id: 'search', title: 'Design Typeahead Search', level: 'L5 (Senior)', icon: Search, desc: 'Autocomplete suggestions', brief: 'Use Trie (prefix tree) data structure where each node stores top-N suggestions. Pre-compute rankings using MapReduce on search logs. Cache frequent prefixes in Redis/CDN for <20ms latency. Implement browser-side caching for recent queries.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 200 }, { id: 'lb', type: 'lb', x: 200, y: 200 }, { id: 's_sugg', type: 'server', x: 400, y: 200 }, { id: 'redis', type: 'cache', x: 600, y: 200 }], connections: [{ from: 'u1', to: 'lb' }, { from: 'lb', to: 's_sugg' }, { from: 's_sugg', to: 'redis' }], explanation: ["Trie structure enables prefix-based lookups", "Pre-computed rankings from search logs", "Edge caching reduces latency"] } },
    { id: 'zoom', title: 'Design Zoom/Teams', level: 'L6 (Staff)', icon: Video, desc: 'Video conferencing platform', brief: 'Use WebRTC for peer-to-peer media. Choose SFU (Selective Forwarding Unit) over MCU for scalability. Send video/audio over UDP to avoid TCP head-of-line blocking. Implement adaptive bitrate based on network conditions. Handle NAT traversal with STUN/TURN.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 100 }, { id: 'u2', type: 'client', x: 50, y: 400 }, { id: 's_sig', type: 'server', x: 250, y: 250 }, { id: 'sfu', type: 'server', x: 500, y: 250 }], connections: [{ from: 'u1', to: 's_sig' }, { from: 'u2', to: 's_sig' }, { from: 'u1', to: 'sfu' }, { from: 'u2', to: 'sfu' }], explanation: ["UDP preferred over TCP for video (packet loss OK)", "SFU forwards streams without mixing (scalable)", "Adaptive bitrate adjusts to network quality"] } },
    { id: 'yelp', title: 'Design Yelp/Maps', level: 'L5 (Senior)', icon: MapPin, desc: 'Location-based search', brief: 'Implement geohashing or QuadTrees for proximity queries. Static data (restaurants) allows aggressive caching unlike dynamic data (Uber drivers). Use PostGIS extension or MongoDB $near operator. Shard by geohash to keep local businesses on same shard.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 250 }, { id: 'lb', type: 'lb', x: 200, y: 250 }, { id: 's_read', type: 'server', x: 400, y: 150 }, { id: 'db_geo', type: 'db', x: 600, y: 150 }], connections: [{ from: 'u1', to: 'lb' }, { from: 'lb', to: 's_read' }, { from: 's_read', to: 'db_geo' }], explanation: ["Geohashing groups nearby locations", "Static data enables aggressive caching", "PostGIS handles spatial queries efficiently"] } },
    { id: 'cache-sys', title: 'Design Distributed Cache', level: 'L6 (Staff)', icon: Server, desc: 'Redis/Memcached cluster', brief: 'Implement consistent hashing to minimize key reshuffling on node changes. Use virtual nodes (~1000 per physical node) for load balancing. Implement gossip protocol for failure detection. Design LRU eviction using double-linked list + hash map.', solution: { items: [{ id: 'client', type: 'client', x: 50, y: 200 }, { id: 'proxy', type: 'lb', x: 200, y: 200 }, { id: 'node1', type: 'cache', x: 450, y: 100 }, { id: 'node2', type: 'cache', x: 450, y: 250 }], connections: [{ from: 'client', to: 'proxy' }, { from: 'proxy', to: 'node1' }, { from: 'proxy', to: 'node2' }], explanation: ["Consistent hashing minimizes key redistribution", "Virtual nodes balance load across physical nodes", "Gossip protocol detects failures"] } },
    { id: 'kv', title: 'Design Key-Value Store', level: 'L6 (Staff)', icon: Database, desc: 'Dynamo-style distributed DB', brief: 'Implement leaderless replication (any node accepts writes). Use tunable consistency (W + R > N for strong, W=1 for high availability). Resolve conflicts with vector clocks. Implement hinted handoff for temporary failures. Use Merkle trees for anti-entropy.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 200 }, { id: 'lb', type: 'lb', x: 200, y: 200 }, { id: 'n1', type: 'server', x: 400, y: 100 }, { id: 'n2', type: 'server', x: 400, y: 250 }], connections: [{ from: 'u1', to: 'lb' }, { from: 'lb', to: 'n1' }, { from: 'n1', to: 'n2' }], explanation: ["Leaderless replication for high availability", "Tunable consistency via quorum (W, R, N)", "Vector clocks resolve concurrent writes"] } },
    { id: 'chat-stream', title: 'Design Twitch Chat', level: 'L6 (Staff)', icon: MessageSquare, desc: 'High-volume live chat', brief: 'Broadcast messages to 1M concurrent viewers using tree of edge servers. Implement rate limiting (slow mode) to prevent spam. Use Redis Pub/Sub for fanout. Drop messages if chat moves too fast (eventual consistency). Batch WebSocket messages client-side.', solution: { items: [{ id: 'u_write', type: 'client', x: 50, y: 150 }, { id: 'u_read', type: 'client', x: 50, y: 350 }, { id: 'lb', type: 'lb', x: 200, y: 250 }, { id: 's_chat', type: 'server', x: 400, y: 250 }], connections: [{ from: 'u_write', to: 'lb' }, { from: 'lb', to: 's_chat' }], explanation: ["Tree of edge servers for fanout", "Rate limiting prevents spam", "Client batching reduces browser freeze"] } },
    { id: 'ads', title: 'Design Ad Click System', level: 'L6 (Staff)', icon: MousePointer, desc: 'Real-time click aggregation', brief: 'Use Lambda architecture: speed layer (Flink) for real-time dashboards, batch layer (Hadoop) for accurate billing. Implement fraud detection (IP blacklists, click patterns). Ensure exactly-once semantics for billing using idempotent IDs. Store raw logs in data lake.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 200 }, { id: 'lb', type: 'lb', x: 200, y: 200 }, { id: 'kafka', type: 'server', x: 350, y: 200 }, { id: 'storm', type: 'server', x: 500, y: 100 }], connections: [{ from: 'u1', to: 'lb' }, { from: 'lb', to: 'kafka' }, { from: 'kafka', to: 'storm' }], explanation: ["Lambda architecture: speed + batch layers", "Fraud detection filters bad clicks", "Exactly-once semantics for billing"] } }
];

export default function SystemDesignPage() {
    const [view, setView] = useState('lobby');
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [selectedBrief, setSelectedBrief] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [canvasItems, setCanvasItems] = useState([]);
    const [connections, setConnections] = useState([]);
    const [connectMode, setConnectMode] = useState(false);
    const [connectSource, setConnectSource] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const canvasRef = useRef(null);

    const openBriefing = (challenge) => {
        setSelectedBrief(challenge);
        setView('briefing');
    };

    const startChallenge = () => {
        setActiveChallenge(selectedBrief);
        setCanvasItems([]);
        setConnections([]);
        setView('canvas');
    };

    const addToCanvas = (type) => {
        const comp = COMPONENTS.find(c => c.id === type);
        setCanvasItems(prev => [...prev, {
            id: `${type}-${Date.now()}`,
            type, label: comp.label,
            x: 100 + Math.random() * 50,
            y: 100 + Math.random() * 50,
        }]);
    };

    const handleDelete = (id) => {
        // Remove the component
        setCanvasItems(prev => prev.filter(item => item.id !== id));
        // Remove any connections involving this component
        setConnections(prev => prev.filter(conn => conn.from !== id && conn.to !== id));
    };

    const handleItemClick = (id) => {
        if (!connectMode) return;
        if (!connectSource) {
            setConnectSource(id);
        } else {
            if (connectSource !== id) {
                setConnections(prev => [...prev, { from: connectSource, to: id }]);
            }
            setConnectSource(null);
        }
    };

    const autoSolve = () => {
        if (!activeChallenge?.solution) return;

        // Map solution items to include labels from COMPONENTS
        const itemsWithLabels = activeChallenge.solution.items.map(item => {
            const comp = COMPONENTS.find(c => c.id === item.type);
            return {
                ...item,
                label: comp?.label || item.type
            };
        });

        setCanvasItems(itemsWithLabels);
        setConnections(activeChallenge.solution.connections);
        setFeedback({
            type: 'explanation',
            score: 100,
            text: "Optimal Solution Generated",
            explanation: activeChallenge.solution.explanation || []
        });
    };

    const validateDesign = () => {
        if (canvasItems.length === 0) {
            setFeedback({
                type: 'analysis',
                score: 0,
                text: 'No Design Found',
                explanation: ['Canvas is empty. Add components to start designing your system.']
            });
            return;
        }

        // Analyze the design
        const hasLoadBalancer = canvasItems.some(item => item.type === 'lb');
        const hasDatabase = canvasItems.some(item => item.type === 'db');
        const hasCache = canvasItems.some(item => item.type === 'cache');
        const hasCDN = canvasItems.some(item => item.type === 'cdn');
        const hasMultipleServers = canvasItems.filter(item => item.type === 'server').length > 1;

        const feedback = [];
        let score = 50; // Base score

        // Check for load balancer
        if (hasLoadBalancer) {
            feedback.push('✅ Load Balancer detected - Good for distributing traffic');
            score += 15;
        } else {
            feedback.push('⚠️ Missing Load Balancer - Single point of failure risk');
        }

        // Check for caching
        if (hasCache) {
            feedback.push('✅ Cache layer present - Reduces database load and improves latency');
            score += 15;
        } else {
            feedback.push('💡 Consider adding Redis cache to reduce database queries by 80-90%');
        }

        // Check for CDN
        if (hasCDN && activeChallenge?.id === 'netflix') {
            feedback.push('✅ CDN for video delivery - Essential for global streaming');
            score += 10;
        }

        // Check for database
        if (hasDatabase) {
            feedback.push('✅ Database included - Persistent storage configured');
            score += 10;
        } else {
            feedback.push('⚠️ No database detected - Where will you store data?');
        }

        // Check for horizontal scaling
        if (hasMultipleServers) {
            feedback.push('✅ Multiple app servers - Horizontal scaling for high availability');
            score += 10;
        } else {
            feedback.push('💡 Add multiple app servers behind LB for redundancy');
        }

        // Check connections
        if (connections.length > 0) {
            feedback.push(`✅ ${connections.length} connection(s) defined - Data flow is mapped`);
            score += Math.min(connections.length * 5, 20);
        } else {
            feedback.push('⚠️ No connections - Components are isolated');
        }

        setFeedback({
            type: 'analysis',
            score: Math.min(score, 100),
            text: score >= 80 ? 'Excellent Design!' : score >= 60 ? 'Good Design' : 'Needs Improvement',
            explanation: feedback
        });
    };

    const getCenter = (id) => {
        const item = canvasItems.find(i => i.id === id);
        if (!item) return { x: 0, y: 0 };
        // Return actual center of the 120px wide component
        return { x: item.x + 60, y: item.y + 50 };
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-slate-900 dark:text-white">
            <Header />
            <main className="pt-24 px-4 pb-10 min-h-screen">
                {view === 'lobby' && (
                    <div className="max-w-7xl mx-auto">
                        <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-primary mb-8">
                            <ArrowLeft size={20} /> Back to Dashboard
                        </Link>
                        <h1 className="text-5xl font-black mb-12">System Design <span className="text-orange-500">Arena</span></h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {CHALLENGES.map(c => (
                                <div key={c.id} onClick={() => openBriefing(c)} className="bg-white dark:bg-dark-800 p-6 rounded-2xl border hover:border-orange-500 cursor-pointer">
                                    <div className="flex justify-between mb-4">
                                        <div className="p-3 bg-gray-50 rounded-xl"><c.icon className="text-orange-500" /></div>
                                        <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded">{c.level}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{c.title}</h3>
                                    <p className="text-sm text-gray-500">{c.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'briefing' && selectedBrief && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                        <div className="bg-white dark:bg-dark-900 max-w-2xl w-full p-8 rounded-3xl">
                            <button onClick={() => setView('lobby')} className="absolute top-4 right-4">✕</button>
                            <h2 className="text-3xl font-black mb-4">{selectedBrief.title}</h2>
                            <p className="text-lg mb-8">{selectedBrief.brief}</p>
                            <button onClick={startChallenge} className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold">Start Designing</button>
                        </div>
                    </div>
                )}

                {view === 'canvas' && (
                    <div className="flex flex-col h-full">
                        <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto w-full">
                            <div>
                                <button onClick={() => setView('lobby')} className="text-sm text-gray-500 mb-1">← Back</button>
                                <h1 className="text-2xl font-bold">{activeChallenge?.title}</h1>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => setConnectMode(!connectMode)} className={`px-4 py-2 rounded-lg font-bold transition-all ${connectMode ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-200 dark:bg-dark-700'}`}>
                                    <LinkIcon size={16} className="inline mr-2" /> {connectMode ? 'Connecting...' : 'Connect Mode'}
                                </button>
                                <button onClick={validateDesign} className="px-4 py-2 rounded-lg font-bold bg-green-600 text-white hover:bg-green-700 transition-all shadow-lg">
                                    <CheckCircle size={16} className="inline mr-2" /> Validate Design
                                </button>
                                <button onClick={autoSolve} className="px-4 py-2 rounded-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg">
                                    <Sparkles size={16} className="inline mr-2" /> ✨ AI Design
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-6 h-[75vh] max-w-7xl mx-auto w-full">
                            {/* TOOLBAR */}
                            <div className="w-64 bg-white dark:bg-dark-800 rounded-2xl border border-gray-200 dark:border-dark-700 p-4 shadow-xl overflow-y-auto">
                                <h3 className="text-xs font-bold text-gray-400 uppercase mb-4">Components</h3>
                                <div className="space-y-2">
                                    {COMPONENTS.map(c => (
                                        <div
                                            key={c.id}
                                            onClick={() => addToCanvas(c.id)}
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 cursor-pointer border border-transparent hover:border-brand-primary transition-all active:scale-95"
                                        >
                                            <c.icon size={20} className={c.color} />
                                            <span className="font-medium text-sm">{c.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
                                    <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-2">💡 Quick Tips:</p>
                                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                        <li>• Click components to add</li>
                                        <li>• Drag to reposition</li>
                                        <li>• Connect mode to link</li>
                                        <li>• Right-click to delete</li>
                                    </ul>
                                </div>
                            </div>

                            {/* MAIN CANVAS */}
                            <div
                                ref={canvasRef}
                                className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-900 dark:to-dark-800 rounded-2xl border-2 border-gray-200 dark:border-dark-700 shadow-inner relative overflow-hidden"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
                                    backgroundSize: '20px 20px'
                                }}
                                onMouseMove={(e) => {
                                    if (canvasRef.current) {
                                        const rect = canvasRef.current.getBoundingClientRect();
                                        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                                    }
                                }}
                            >
                                {/* SVG Layer for Connections */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                    <defs>
                                        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                            <polygon points="0 0, 10 3, 0 6" fill="#6366f1" />
                                        </marker>
                                        <marker id="arrowhead-active" markerWidth="12" markerHeight="12" refX="10" refY="3" orient="auto">
                                            <polygon points="0 0, 12 3, 0 6" fill="#f59e0b" />
                                        </marker>
                                    </defs>

                                    {/* Permanent Connections */}
                                    {connections.map((conn, i) => {
                                        const from = getCenter(conn.from);
                                        const to = getCenter(conn.to);
                                        const isHovered = false; // You can add hover detection later

                                        return (
                                            <g key={i}>
                                                <line
                                                    x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                                                    stroke="#6366f1"
                                                    strokeWidth="3"
                                                    markerEnd="url(#arrowhead)"
                                                    className="transition-all"
                                                />
                                                {/* Connection label */}
                                                <text
                                                    x={(from.x + to.x) / 2}
                                                    y={(from.y + to.y) / 2 - 10}
                                                    fill="#6366f1"
                                                    fontSize="10"
                                                    fontWeight="bold"
                                                    textAnchor="middle"
                                                    className="pointer-events-none"
                                                >
                                                    {i + 1}
                                                </text>
                                            </g>
                                        );
                                    })}

                                    {/* Rubber Band Line (while connecting) */}
                                    {connectMode && connectSource && (
                                        <g>
                                            <line
                                                x1={getCenter(connectSource).x}
                                                y1={getCenter(connectSource).y}
                                                x2={mousePos.x}
                                                y2={mousePos.y}
                                                stroke="#f59e0b"
                                                strokeWidth="3"
                                                strokeDasharray="8,4"
                                                markerEnd="url(#arrowhead-active)"
                                                className="animate-pulse"
                                            />
                                            <circle
                                                cx={mousePos.x}
                                                cy={mousePos.y}
                                                r="6"
                                                fill="#f59e0b"
                                                className="animate-ping"
                                            />
                                        </g>
                                    )}
                                </svg>

                                {/* Component Cards */}
                                {canvasItems.map((item, itemIndex) => {
                                    const compData = COMPONENTS.find(c => c.id === item.type) || {};
                                    const Icon = compData.icon || Server;
                                    const isSource = connectSource === item.id;

                                    return (
                                        <motion.div
                                            key={item.id}
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{
                                                scale: 1,
                                                opacity: 1
                                            }}
                                            style={{
                                                position: 'absolute',
                                                left: item.x,
                                                top: item.y,
                                                cursor: 'move'
                                            }}
                                            onMouseDown={(e) => {
                                                // Only drag on left-click
                                                if (e.button !== 0) return;
                                                e.preventDefault();
                                                const startX = e.clientX - item.x;
                                                const startY = e.clientY - item.y;

                                                const handleMouseMove = (moveEvent) => {
                                                    const newX = moveEvent.clientX - startX;
                                                    const newY = moveEvent.clientY - startY;

                                                    const newItems = [...canvasItems];
                                                    newItems[itemIndex] = {
                                                        ...newItems[itemIndex],
                                                        x: Math.max(0, newX),
                                                        y: Math.max(0, newY)
                                                    };
                                                    setCanvasItems(newItems);
                                                };

                                                const handleMouseUp = () => {
                                                    document.removeEventListener('mousemove', handleMouseMove);
                                                    document.removeEventListener('mouseup', handleMouseUp);
                                                };

                                                document.addEventListener('mousemove', handleMouseMove);
                                                document.addEventListener('mouseup', handleMouseUp);
                                            }}
                                            onClick={(e) => {
                                                if (e.target.closest('button')) return;
                                                handleItemClick(item.id);
                                            }}
                                            onContextMenu={(e) => {
                                                e.preventDefault();
                                                handleDelete(item.id);
                                            }}
                                            className={`w-[140px] p-4 rounded-2xl border-2 bg-white dark:bg-dark-800 flex flex-col items-center gap-3 transition-all shadow-xl hover:shadow-2xl ${isSource
                                                ? 'border-orange-400 ring-4 ring-orange-300 dark:ring-orange-600 shadow-orange-500/50'
                                                : 'border-gray-300 dark:border-dark-600 hover:border-brand-primary'
                                                }`}
                                        >
                                            {/* Glow effect for selected */}
                                            {isSource && (
                                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/20 to-red-400/20 animate-pulse" />
                                            )}

                                            <div className={`relative p-3 rounded-xl ${compData.bg || 'bg-gray-100'}`}>
                                                <Icon className={compData.color} size={28} />
                                                <div className={`absolute inset-0 rounded-xl blur-xl opacity-50 ${compData.bg}`} />
                                            </div>

                                            <span className="text-xs font-bold text-center leading-tight text-gray-800 dark:text-gray-200 relative z-10">
                                                {item.label}
                                            </span>

                                            {/* Drag indicator */}
                                            <div className="absolute top-2 right-2 opacity-30 hover:opacity-100 transition-opacity pointer-events-none">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                    <circle cx="4" cy="4" r="1.5" />
                                                    <circle cx="4" cy="8" r="1.5" />
                                                    <circle cx="4" cy="12" r="1.5" />
                                                    <circle cx="8" cy="4" r="1.5" />
                                                    <circle cx="8" cy="8" r="1.5" />
                                                    <circle cx="8" cy="12" r="1.5" />
                                                </svg>
                                            </div>

                                            {/* Delete button */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(item.id);
                                                }}
                                                className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-all shadow-lg hover:scale-110 z-10"
                                            >
                                                <Trash2 size={14} />
                                            </button>

                                            {/* Connection indicator */}
                                            {isSource && (
                                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                                                    → Click target
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })}

                                {/* Empty State */}
                                {canvasItems.length === 0 && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="text-center">
                                            <div className="text-6xl mb-4 opacity-20">🎨</div>
                                            <p className="text-gray-400 font-medium">Click components from the sidebar to start designing</p>
                                            <p className="text-gray-300 text-sm mt-2">Or click "✨ AI Design" for an optimal solution</p>
                                        </div>
                                    </div>
                                )}

                                {/* Connection Mode Overlay */}
                                {connectMode && (
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-3 animate-pulse">
                                        <LinkIcon size={20} />
                                        <span className="font-bold">
                                            {connectSource ? 'Click target component to connect' : 'Click source component to start'}
                                        </span>
                                    </div>
                                )}
                            </div>
                            {feedback && (
                                <motion.div initial={{ x: 300 }} animate={{ x: 0 }} className="absolute right-10 top-24 w-80 bg-white p-6 rounded-2xl shadow-2xl z-50">
                                    <h3 className="font-bold text-lg mb-2">System Walkthrough</h3>
                                    <div className="space-y-2">
                                        {feedback.explanation?.map((step, i) => (
                                            <div key={i} className="text-sm p-3 bg-blue-50 rounded-lg">{step}</div>
                                        ))}
                                    </div>
                                    <button onClick={() => setFeedback(null)} className="w-full mt-4 py-2 bg-gray-100 rounded-lg text-xs font-bold">Dismiss</button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
