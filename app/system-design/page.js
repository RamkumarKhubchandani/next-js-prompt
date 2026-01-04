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
    { id: 'queue', label: 'Message Queue', icon: MessageSquare, color: 'text-purple-500' },
    { id: 'gateway', label: 'API Gateway', icon: ArrowRight, color: 'text-pink-500' },
    { id: 'search', label: 'Search Engine', icon: Search, color: 'text-teal-500' },
    { id: 'storage', label: 'Object Storage', icon: Database, color: 'text-amber-500' },
    { id: 'analytics', label: 'Analytics', icon: Activity, color: 'text-cyan-500' },
    { id: 'monitor', label: 'Monitoring', icon: Activity, color: 'text-lime-500' },
    { id: 'firewall', label: 'Firewall', icon: Lock, color: 'text-rose-500' },
    { id: 'dns', label: 'DNS Server', icon: Globe, color: 'text-violet-500' },
    { id: 'worker', label: 'Worker', icon: Cpu, color: 'text-emerald-500' },
    { id: 'proxy', label: 'Proxy', icon: ArrowRight, color: 'text-fuchsia-500' },
];

const CHALLENGES = [
    { id: 'netflix', title: 'Design Netflix', level: 'L5 (Senior)', icon: Play, desc: 'Scalable video streaming architecture', brief: 'Design a system that supports 10M+ concurrent viewers streaming video globally. Focus on CDN strategy for content delivery, adaptive bitrate streaming for varying network conditions, and database sharding for user metadata. Consider how to handle peak traffic during new releases.', solution: { items: [{ id: 'c1', type: 'client', x: 50, y: 300 }, { id: 'lb1', type: 'lb', x: 250, y: 300 }, { id: 's1', type: 'server', x: 450, y: 200 }, { id: 's2', type: 'server', x: 450, y: 400 }, { id: 'cdn1', type: 'cdn', x: 600, y: 50 }, { id: 'db1', type: 'db', x: 700, y: 200 }, { id: 'cache1', type: 'cache', x: 700, y: 400 }], connections: [{ from: 'c1', to: 'lb1' }, { from: 'c1', to: 'cdn1' }, { from: 'lb1', to: 's1' }, { from: 'lb1', to: 's2' }, { from: 's1', to: 'db1' }, { from: 's2', to: 'cache1' }], explanation: ["CDN delivers video directly to users, reducing latency and offloading servers", "Microservices split: API Server (s1) handles metadata/auth, Playback Server (s2) handles DRM/manifests", "Redis cache handles 95% of read traffic for user profiles and viewing history", "Database sharding by UserID to handle 10M+ concurrent users"] } },
    { id: 'uber', title: 'Design Uber', level: 'L6 (Staff)', icon: Globe, desc: 'Real-time ride-sharing platform', brief: 'Build a system for matching riders with drivers in under 200ms. Implement QuadTree or Geohash-based spatial indexing for efficient proximity searches. Handle real-time location updates from millions of drivers via WebSockets. Ensure ACID compliance for payment transactions.', solution: { items: [{ id: 'riders', type: 'client', x: 50, y: 250 }, { id: 'lb1', type: 'lb', x: 250, y: 250 }, { id: 's_match', type: 'server', x: 450, y: 150 }, { id: 's_trip', type: 'server', x: 450, y: 350 }, { id: 'db_geo', type: 'db', x: 700, y: 150 }, { id: 'cache', type: 'cache', x: 700, y: 350 }], connections: [{ from: 'riders', to: 'lb1' }, { from: 'lb1', to: 's_match' }, { from: 'lb1', to: 's_trip' }, { from: 's_match', to: 'db_geo' }, { from: 's_trip', to: 'cache' }], explanation: ["QuadTree spatial indexing finds nearest drivers in O(logN) time with 200ms latency", "WebSocket connections maintain real-time location updates from millions of drivers", "Matching Service (s_match) handles proximity search, Trip Service (s_trip) manages ride lifecycle", "Redis cache stores active driver locations with 30-second TTL for fast lookups", "PostgreSQL with PostGIS extension handles geospatial queries and payment ACID transactions", "Kafka streams process location updates asynchronously to avoid blocking"] } },
    { id: 'whatsapp', title: 'Design WhatsApp', level: 'L5 (Senior)', icon: MessageSquare, desc: 'End-to-end encrypted messaging', brief: 'Create a chat system supporting 100k concurrent WebSocket connections per server. Implement message queues (Kafka) for async delivery and offline message storage. Use Cassandra for message history due to high write throughput. Handle presence (online/offline) status efficiently.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 250 }, { id: 'lb', type: 'lb', x: 250, y: 250 }, { id: 'gateway', type: 'server', x: 450, y: 150 }, { id: 's_msg', type: 'server', x: 450, y: 350 }, { id: 'db', type: 'db', x: 700, y: 250 }, { id: 'cache', type: 'cache', x: 700, y: 450 }], connections: [{ from: 'u1', to: 'lb' }, { from: 'lb', to: 'gateway' }, { from: 'gateway', to: 's_msg' }, { from: 's_msg', to: 'db' }, { from: 'gateway', to: 'cache' }], explanation: ["WebSocket Gateway maintains 100k persistent connections per server for real-time delivery", "Message Service handles encryption, storage, and delivery with Kafka for async processing", "Cassandra stores message history with partition key (user_id, timestamp) for high write throughput", "Redis cache handles online/offline presence with TTL keys (5-minute expiry)", "Kafka message queue ensures delivery to offline users when they reconnect", "End-to-end encryption using Signal Protocol with perfect forward secrecy"] } },
    { id: 'twitter', title: 'Design Twitter Feed', level: 'L6 (Staff)', icon: Cloud, desc: 'Social media timeline system', brief: 'Design timeline generation with fan-out-on-write vs fan-out-on-read trade-offs. Handle celebrities with 100M+ followers efficiently (hybrid approach). Cache pre-computed timelines in Redis. Use message queues for async fan-out to avoid blocking writes.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 250 }, { id: 'lb1', type: 'lb', x: 250, y: 250 }, { id: 's_write', type: 'server', x: 450, y: 150 }, { id: 's_read', type: 'server', x: 450, y: 350 }, { id: 'cache', type: 'cache', x: 700, y: 250 }, { id: 'db', type: 'db', x: 700, y: 450 }], connections: [{ from: 'u1', to: 'lb1' }, { from: 'lb1', to: 's_write' }, { from: 'lb1', to: 's_read' }, { from: 's_write', to: 'cache' }, { from: 's_read', to: 'cache' }, { from: 's_read', to: 'db' }], explanation: ["Hybrid fan-out: fan-out-on-write for normal users (<1000 followers), fan-out-on-read for celebrities", "Write Service pushes tweets to follower timelines asynchronously via Kafka", "Redis caches pre-computed timelines for O(1) read performance (95% cache hit rate)", "Read Service merges celebrity tweets on-demand to avoid fan-out explosion", "Cassandra stores tweets with partition key (user_id, timestamp) for fast retrieval", "Kafka handles async fan-out to avoid blocking tweet creation (eventual consistency)"] } },
    { id: 'instagram', title: 'Design Instagram', level: 'L5 (Senior)', icon: Database, desc: 'Photo sharing platform', brief: 'Handle petabytes of image data using object storage (S3). Implement CDN for global image delivery. Shard user metadata by UserID or PhotoID. Design async workers for thumbnail generation and filters. Consider storage costs and retrieval latency trade-offs.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 250 }, { id: 'cdn', type: 'cdn', x: 250, y: 50 }, { id: 'lb1', type: 'lb', x: 250, y: 250 }, { id: 's_media', type: 'server', x: 450, y: 200 }, { id: 's_worker', type: 'server', x: 450, y: 400 }, { id: 'db', type: 'db', x: 700, y: 200 }, { id: 'cache', type: 'cache', x: 700, y: 400 }], connections: [{ from: 'u1', to: 'cdn' }, { from: 'u1', to: 'lb1' }, { from: 'lb1', to: 's_media' }, { from: 's_media', to: 'db' }, { from: 's_media', to: 's_worker' }, { from: 's_worker', to: 'cache' }], explanation: ["S3 stores images as immutable blobs with 99.999999999% durability", "CDN caches popular images globally reducing latency from 500ms to 50ms", "Async workers generate thumbnails offline using message queues (SQS/Kafka)", "PostgreSQL sharded by UserID stores metadata (likes, comments, followers)", "Redis cache handles 95% of read traffic for user profiles and viewing history", "Multipart upload enables resumable uploads for large videos (>100MB)"] } },
    { id: 'tinyurl', title: 'Design TinyURL', level: 'L4 (Mid)', icon: Globe, desc: 'URL shortening service', brief: 'Generate unique short keys using Base62 encoding. Implement Key Generation Service (KGS) to pre-generate keys and avoid collisions. Cache short-to-long URL mappings in Redis (LRU). Decide between 301 (permanent) vs 302 (temporary) redirects based on analytics needs.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 250 }, { id: 'lb1', type: 'lb', x: 250, y: 250 }, { id: 's_app', type: 'server', x: 450, y: 150 }, { id: 's_kgs', type: 'server', x: 450, y: 350 }, { id: 'cache', type: 'cache', x: 700, y: 250 }, { id: 'db', type: 'db', x: 700, y: 450 }], connections: [{ from: 'u1', to: 'lb1' }, { from: 'lb1', to: 's_app' }, { from: 's_app', to: 's_kgs' }, { from: 's_app', to: 'cache' }, { from: 's_app', to: 'db' }], explanation: ["Key Generation Service (KGS) pre-generates 1 billion Base62 keys to avoid collisions and race conditions", "Redis cache stores URL mappings with 100:1 read/write ratio achieving 99% cache hit rate", "Use 301 redirect for permanent URLs (SEO benefit) vs 302 for analytics tracking", "NoSQL database (Cassandra) handles high write throughput for URL creation", "Rate limiting prevents abuse - max 10 URLs per user per hour", "Bloom filter checks for custom alias availability in O(1) time"] } },
    { id: 'drive', title: 'Design Google Drive', level: 'L5 (Senior)', icon: Cloud, desc: 'Cloud file storage and sync', brief: 'Implement block-level file chunking (4MB chunks) for efficient uploads. Use content-addressable storage (SHA-256 hashing) for deduplication. Design metadata service for folder structures with ACID guarantees. Handle sync conflicts and version control.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 250 }, { id: 'lb1', type: 'lb', x: 250, y: 250 }, { id: 's_meta', type: 'server', x: 450, y: 150 }, { id: 's_block', type: 'server', x: 450, y: 350 }, { id: 'db_meta', type: 'db', x: 700, y: 150 }, { id: 's3', type: 'cdn', x: 700, y: 350 }, { id: 'cache', type: 'cache', x: 700, y: 550 }], connections: [{ from: 'u1', to: 'lb1' }, { from: 'lb1', to: 's_meta' }, { from: 'lb1', to: 's_block' }, { from: 's_meta', to: 'db_meta' }, { from: 's_block', to: 's3' }, { from: 's_meta', to: 'cache' }], explanation: ["4MB block-level chunking enables differential sync - only changed blocks upload", "SHA-256 content-addressable storage deduplicates identical files saving 40% storage", "Metadata Service with PostgreSQL ensures ACID guarantees for folder operations", "S3 stores encrypted blocks with 99.999999999% durability using erasure coding", "Redis cache stores file metadata and recent access patterns for instant folder listing", "Conflict resolution: Last-Write-Wins with version history for 30 days", "WebSocket notifications push real-time sync events to all connected devices"] } },
    { id: 'crawler', title: 'Design Web Crawler', level: 'L6 (Staff)', icon: Globe, desc: 'Distributed web crawler', brief: 'Build a politeness-aware crawler respecting robots.txt. Implement URL frontier with priority queues (Kafka). Use Bloom filters for duplicate detection at scale. Design DNS resolver cache to avoid bottlenecks. Handle content fingerprinting for mirror detection.', solution: { items: [{ id: 'seed', type: 'client', x: 50, y: 250 }, { id: 'frontier', type: 'server', x: 250, y: 150 }, { id: 'worker', type: 'server', x: 450, y: 250 }, { id: 'dns', type: 'cache', x: 250, y: 350 }, { id: 's3', type: 'cdn', x: 700, y: 250 }, { id: 'db', type: 'db', x: 700, y: 450 }], connections: [{ from: 'seed', to: 'frontier' }, { from: 'frontier', to: 'worker' }, { from: 'worker', to: 'dns' }, { from: 'worker', to: 's3' }, { from: 'worker', to: 'db' }], explanation: ["URL Frontier with Kafka priority queues ensures politeness - max 1 request/second per domain", "Bloom filter (10 billion URLs) checks for duplicates with 0.1% false positive rate", "DNS cache with 24-hour TTL reduces lookup latency from 100ms to 1ms", "Worker pool of 1000 servers crawls 10,000 pages/second distributed globally", "Content fingerprinting using SimHash detects near-duplicate pages (mirrors)", "S3 stores raw HTML, DB stores extracted metadata and links for indexing", "Robots.txt cache respects crawl-delay and disallow rules per domain"] } },
    { id: 'ticketmaster', title: 'Design Ticketmaster', level: 'L5 (Senior)', icon: Lock, desc: 'High-traffic booking system', brief: 'Handle thundering herd problem when tickets go on sale (1M users at 10 AM). Implement waiting room queue (leaky bucket). Use distributed locks (Redis) for seat selection with TTL. Ensure ACID transactions for final booking. Consider multi-region challenges.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 250 }, { id: 'cdn', type: 'cdn', x: 250, y: 50 }, { id: 'lb1', type: 'lb', x: 250, y: 250 }, { id: 'queue', type: 'server', x: 450, y: 100 }, { id: 's_book', type: 'server', x: 450, y: 300 }, { id: 'cache', type: 'cache', x: 700, y: 200 }, { id: 'db', type: 'db', x: 700, y: 400 }], connections: [{ from: 'u1', to: 'cdn' }, { from: 'u1', to: 'lb1' }, { from: 'lb1', to: 'queue' }, { from: 'queue', to: 's_book' }, { from: 's_book', to: 'cache' }, { from: 's_book', to: 'db' }], explanation: ["Waiting Room Queue with leaky bucket controls traffic - admits 1000 users/second to prevent thundering herd", "CDN serves static assets (seat map, venue images) reducing backend load by 90%", "Redis distributed locks with 5-minute TTL prevent double-booking during seat selection", "PostgreSQL with serializable isolation ensures ACID transactions for payment", "Optimistic locking with version numbers handles concurrent seat selection", "Multi-region deployment with eventual consistency for global ticket sales", "Rate limiting: max 10 seat holds per user to prevent scalping bots"] } },
    { id: 'rate-limiter', title: 'Design Rate Limiter', level: 'L4 (Mid)', icon: AlertTriangle, desc: 'API abuse prevention', brief: 'Implement token bucket or leaky bucket algorithm. Use Redis Lua scripts for atomic check-and-increment operations. Design sidecar pattern (Envoy/Nginx) for low latency. Balance between global consistency vs local speed (eventual consistency trade-off).', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 250 }, { id: 'sidecar', type: 'server', x: 250, y: 150 }, { id: 'lb1', type: 'lb', x: 250, y: 350 }, { id: 's_api', type: 'server', x: 450, y: 250 }, { id: 'redis', type: 'cache', x: 700, y: 250 }], connections: [{ from: 'u1', to: 'sidecar' }, { from: 'sidecar', to: 'redis' }, { from: 'sidecar', to: 'lb1' }, { from: 'lb1', to: 's_api' }], explanation: ["Token bucket algorithm: refills 100 tokens/minute, allows bursts up to 200 requests", "Redis Lua script ensures atomic check-and-decrement in single operation preventing race conditions", "Sidecar pattern (Envoy proxy) adds <1ms latency for rate limit check", "Sliding window log tracks exact request timestamps for precise rate limiting", "Global rate limiting via Redis vs local (per-server) for 10x lower latency trade-off", "429 Too Many Requests with Retry-After header tells client when to retry", "Different limits per user tier: Free (100/min), Pro (1000/min), Enterprise (unlimited)"] } },
    { id: 'leaderboard', title: 'Design Leaderboard', level: 'L4 (Mid)', icon: Trophy, desc: 'Real-time gaming scores', brief: 'Use Redis Sorted Sets (ZSET) for O(logN) score updates and rank queries. Handle millions of score updates per second. Implement write-through caching with async persistence to SQL. Consider sharding strategies (by score range vs user ID).', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 250 }, { id: 'lb1', type: 'lb', x: 250, y: 250 }, { id: 's_score', type: 'server', x: 450, y: 150 }, { id: 's_rank', type: 'server', x: 450, y: 350 }, { id: 'redis', type: 'cache', x: 700, y: 250 }, { id: 'db', type: 'db', x: 700, y: 450 }], connections: [{ from: 'u1', to: 'lb1' }, { from: 'lb1', to: 's_score' }, { from: 'lb1', to: 's_rank' }, { from: 's_score', to: 'redis' }, { from: 's_score', to: 'db' }], explanation: ["Redis Sorted Set (ZSET) enables O(logN) score updates and rank queries at 100k ops/sec", "ZADD updates score, ZRANK gets rank, ZREVRANGE gets top-N in single commands", "Write-through cache: update Redis immediately, async persist to PostgreSQL every 5 minutes", "Shard by game/region for isolation - prevents one game's traffic affecting others", "Lua script ensures atomic increment for score updates preventing lost updates", "Materialized view in SQL for historical analytics and fraud detection", "WebSocket push notifications for real-time rank changes to connected clients"] } },
    { id: 'notification', title: 'Design Notification System', level: 'L5 (Senior)', icon: Sparkles, desc: 'Multi-channel push notifications', brief: 'Support email, SMS, and push notifications via pluggable providers (Twilio, FCM, APNS). Ensure idempotency to prevent duplicate sends. Use message queues to decouple triggers from delivery. Implement priority levels (OTP high, marketing low).', solution: { items: [{ id: 's_trigger', type: 'server', x: 50, y: 250 }, { id: 'mq_high', type: 'server', x: 250, y: 150 }, { id: 'mq_low', type: 'server', x: 250, y: 350 }, { id: 'worker1', type: 'server', x: 450, y: 150 }, { id: 'worker2', type: 'server', x: 450, y: 350 }, { id: 'db', type: 'db', x: 700, y: 250 }], connections: [{ from: 's_trigger', to: 'mq_high' }, { from: 's_trigger', to: 'mq_low' }, { from: 'mq_high', to: 'worker1' }, { from: 'mq_low', to: 'worker2' }, { from: 'worker1', to: 'db' }], explanation: ["Priority queues: High (OTP, alerts) processed in <1s, Low (marketing) in <1min", "Idempotency keys (UUID) stored in Redis with 24h TTL prevent duplicate sends", "Adapter pattern supports multiple providers: Twilio (SMS), SendGrid (email), FCM/APNS (push)", "Dead letter queue captures failed notifications for retry with exponential backoff", "Rate limiting per user: max 10 notifications/hour to prevent spam", "Template engine renders personalized messages with user data", "Delivery tracking: sent, delivered, opened, clicked events stored for analytics"] } },
    { id: 's3', title: 'Design S3 Object Store', level: 'L6 (Staff)', icon: Database, desc: 'Petabyte-scale blob storage', brief: 'Achieve 11 9s durability using erasure coding (Reed-Solomon) instead of full replication. Separate data plane (streaming bytes) from control plane (metadata). Implement multipart uploads for large files. Design for strong consistency on new objects.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 250 }, { id: 'lb_ctrl', type: 'lb', x: 250, y: 150 }, { id: 'lb_data', type: 'lb', x: 250, y: 350 }, { id: 's_meta', type: 'server', x: 450, y: 150 }, { id: 's_data', type: 'server', x: 450, y: 350 }, { id: 'db_meta', type: 'db', x: 700, y: 150 }, { id: 'storage', type: 'cdn', x: 700, y: 350 }], connections: [{ from: 'u1', to: 'lb_ctrl' }, { from: 'u1', to: 'lb_data' }, { from: 'lb_ctrl', to: 's_meta' }, { from: 'lb_data', to: 's_data' }, { from: 's_meta', to: 'db_meta' }, { from: 's_data', to: 'storage' }], explanation: ["Control/Data plane separation: metadata API separate from byte streaming for scalability", "Erasure coding (Reed-Solomon 10+4) achieves 99.999999999% durability with 1.4x overhead vs 3x for replication", "Multipart upload: split large files into 5MB chunks, upload in parallel, then commit", "Strong consistency for new PUTs using version numbers and quorum writes (W=2, R=1, N=3)", "Eventual consistency for updates/deletes to optimize for availability over consistency", "Object versioning keeps all versions with unique IDs for rollback and compliance", "Lifecycle policies auto-delete old versions or move to cheaper Glacier storage after 90 days"] } },
    { id: 'payment', title: 'Design Payment Gateway', level: 'L6 (Staff)', icon: CreditCard, desc: 'Fault-tolerant payment processing', brief: 'Zero tolerance for data loss. Implement idempotency keys for retry safety. Use double-entry ledger accounting (every debit has a credit). Design state machine (Created → Authorized → Captured). Implement reconciliation jobs to detect discrepancies.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 250 }, { id: 'api', type: 'server', x: 250, y: 150 }, { id: 's_ledger', type: 'server', x: 250, y: 350 }, { id: 'db_txn', type: 'db', x: 450, y: 250 }, { id: 'psp', type: 'cdn', x: 700, y: 150 }, { id: 'db_ledger', type: 'db', x: 700, y: 350 }], connections: [{ from: 'u1', to: 'api' }, { from: 'api', to: 'db_txn' }, { from: 'api', to: 'psp' }, { from: 'api', to: 's_ledger' }, { from: 's_ledger', to: 'db_ledger' }], explanation: ["Idempotency keys (client-generated UUID) prevent double-charging on retry - stored 24h", "State machine: Created → Authorized (hold funds) → Captured (charge) → Settled (payout)", "Double-entry ledger: every debit has matching credit ensuring books always balance", "PostgreSQL with serializable isolation + row-level locks prevents race conditions", "Saga pattern for distributed transactions: compensating actions on failure", "Reconciliation job runs daily comparing internal ledger vs PSP (Stripe) statements", "Audit log immutable append-only for compliance (PCI-DSS, SOX) with 7-year retention"] } },
    { id: 'scheduler', title: 'Design Distributed Cron', level: 'L5 (Senior)', icon: Clock, desc: 'Cluster-wide job scheduler', brief: 'Use leader election (Raft/Paxos via ZooKeeper/Etcd) to ensure only one master triggers jobs. Implement timing wheel for high-precision scheduling. Decouple scheduler from executor using message queues. Handle missed jobs on system restart.', solution: { items: [{ id: 'zk', type: 'server', x: 50, y: 150 }, { id: 's_leader', type: 'server', x: 250, y: 250 }, { id: 's_follower', type: 'server', x: 250, y: 400 }, { id: 'db_jobs', type: 'db', x: 450, y: 150 }, { id: 'mq', type: 'server', x: 450, y: 350 }, { id: 'worker', type: 'server', x: 700, y: 350 }], connections: [{ from: 's_leader', to: 'zk' }, { from: 's_follower', to: 'zk' }, { from: 's_leader', to: 'db_jobs' }, { from: 's_leader', to: 'mq' }, { from: 'mq', to: 'worker' }], explanation: ["Leader election via ZooKeeper ensures only one scheduler triggers jobs preventing duplicates", "Timing wheel data structure: 60 buckets for seconds, 60 for minutes - O(1) job scheduling", "Scheduler polls DB every second for due jobs, publishes to Kafka for execution", "Worker pool scales independently from scheduler - add workers without touching scheduler", "Missed job handling: on restart, check last_run timestamp and trigger if overdue", "Job idempotency: workers check Redis before execution to prevent duplicate runs", "Monitoring: track job success rate, duration, and alert on failures or delays"] } },
    { id: 'metrics', title: 'Design Metrics System', level: 'L5 (Senior)', icon: Activity, desc: 'Monitoring like Datadog/Prometheus', brief: 'Handle heavy write load using time-series databases (InfluxDB/Prometheus). Choose between pull (scraping) vs push (agent) models. Implement downsampling (1s → 1min → 1hr) for long-term storage. Support multi-dimensional tagging for queries.', solution: { items: [{ id: 'app', type: 'client', x: 50, y: 250 }, { id: 'agent', type: 'server', x: 250, y: 150 }, { id: 'lb', type: 'lb', x: 250, y: 350 }, { id: 'kafka', type: 'server', x: 450, y: 250 }, { id: 'tsdb', type: 'db', x: 700, y: 150 }, { id: 's_query', type: 'server', x: 700, y: 350 }, { id: 'cache', type: 'cache', x: 700, y: 550 }], connections: [{ from: 'app', to: 'agent' }, { from: 'agent', to: 'lb' }, { from: 'lb', to: 'kafka' }, { from: 'kafka', to: 'tsdb' }, { from: 's_query', to: 'tsdb' }, { from: 's_query', to: 'cache' }], explanation: ["Time-series DB (InfluxDB) optimized for append-only writes handling 1M metrics/sec", "Push model: agents collect metrics every 10s and batch send to reduce network overhead", "Kafka buffers metrics during traffic spikes preventing data loss", "Downsampling: 1s resolution for 7 days, 1min for 30 days, 1hr for 1 year saves 95% storage", "Multi-dimensional tags enable queries like: cpu.usage{host=web1,region=us-east}", "Redis cache stores recent aggregations for dashboard queries <100ms", "Retention policies auto-delete old data: raw (7d), rollup-1m (30d), rollup-1h (1y)", "Alerting engine evaluates rules every 30s and sends notifications via webhooks"] } },
    { id: 'collab', title: 'Design Google Docs', level: 'L6 (Staff)', icon: Edit3, desc: 'Real-time collaborative editing', brief: 'Implement Operational Transformation (OT) or CRDTs to handle concurrent edits. Maintain WebSocket connections for real-time sync. Use session stickiness or Redis Pub/Sub for multi-server coordination. Snapshot documents periodically to S3.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 150 }, { id: 'u2', type: 'client', x: 50, y: 350 }, { id: 'lb', type: 'lb', x: 250, y: 250 }, { id: 's_ws1', type: 'server', x: 450, y: 150 }, { id: 's_ws2', type: 'server', x: 450, y: 350 }, { id: 'redis', type: 'cache', x: 700, y: 250 }, { id: 's3', type: 'cdn', x: 700, y: 450 }], connections: [{ from: 'u1', to: 'lb' }, { from: 'u2', to: 'lb' }, { from: 'lb', to: 's_ws1' }, { from: 'lb', to: 's_ws2' }, { from: 's_ws1', to: 'redis' }, { from: 's_ws2', to: 'redis' }, { from: 's_ws1', to: 's3' }], explanation: ["Operational Transformation (OT) resolves concurrent edits: insert('a',5) + delete(3) → transformed operations", "WebSocket servers maintain 10k persistent connections each for real-time <50ms sync", "Session stickiness (sticky cookies) routes user to same server for connection reuse", "Redis Pub/Sub broadcasts edits across servers when users on different instances", "Document snapshots saved to S3 every 5 minutes for disaster recovery", "Conflict-free Replicated Data Types (CRDTs) alternative: eventual consistency without transform", "Version vector tracks causality: {user1: v5, user2: v3} prevents lost updates", "Presence awareness via heartbeat: show who's editing in real-time"] } },
    { id: 'search', title: 'Design Typeahead Search', level: 'L5 (Senior)', icon: Search, desc: 'Autocomplete suggestions', brief: 'Use Trie (prefix tree) data structure where each node stores top-N suggestions. Pre-compute rankings using MapReduce on search logs. Cache frequent prefixes in Redis/CDN for <20ms latency. Implement browser-side caching for recent queries.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 250 }, { id: 'cdn', type: 'cdn', x: 250, y: 50 }, { id: 'lb', type: 'lb', x: 250, y: 250 }, { id: 's_sugg', type: 'server', x: 450, y: 150 }, { id: 's_rank', type: 'server', x: 450, y: 350 }, { id: 'redis', type: 'cache', x: 700, y: 250 }, { id: 'db', type: 'db', x: 700, y: 450 }], connections: [{ from: 'u1', to: 'cdn' }, { from: 'u1', to: 'lb' }, { from: 'lb', to: 's_sugg' }, { from: 's_sugg', to: 'redis' }, { from: 's_rank', to: 'db' }, { from: 's_rank', to: 'redis' }], explanation: ["Trie data structure: each node stores top-10 suggestions sorted by popularity", "Pre-computed rankings from MapReduce on 1 billion search logs updated daily", "Redis cache stores top 1M prefixes achieving 95% hit rate with <10ms latency", "CDN edge caching for static suggestions (countries, cities) <5ms globally", "Browser localStorage caches user's recent 100 queries for instant offline suggestions", "Fuzzy matching with Levenshtein distance handles typos: 'gogle' → 'google'", "Personalized suggestions using collaborative filtering based on user history", "A/B testing framework measures click-through rate to optimize ranking algorithm"] } },
    { id: 'zoom', title: 'Design Zoom/Teams', level: 'L6 (Staff)', icon: Video, desc: 'Video conferencing platform', brief: 'Use WebRTC for peer-to-peer media. Choose SFU (Selective Forwarding Unit) over MCU for scalability. Send video/audio over UDP to avoid TCP head-of-line blocking. Implement adaptive bitrate based on network conditions. Handle NAT traversal with STUN/TURN.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 100 }, { id: 'u2', type: 'client', x: 50, y: 400 }, { id: 's_signal', type: 'server', x: 250, y: 250 }, { id: 'stun', type: 'server', x: 450, y: 100 }, { id: 'sfu', type: 'server', x: 450, y: 250 }, { id: 'turn', type: 'server', x: 450, y: 400 }, { id: 'db', type: 'db', x: 700, y: 250 }], connections: [{ from: 'u1', to: 's_signal' }, { from: 'u2', to: 's_signal' }, { from: 'u1', to: 'stun' }, { from: 'u1', to: 'sfu' }, { from: 'u2', to: 'sfu' }, { from: 'u1', to: 'turn' }], explanation: ["WebRTC enables peer-to-peer media: browser-to-browser without server relay", "SFU (Selective Forwarding Unit) forwards streams without mixing - scales to 100 participants", "UDP preferred over TCP: packet loss OK for video (skip frames) vs TCP retransmit delays", "Adaptive bitrate: 1080p@30fps (3Mbps) → 720p (1.5Mbps) → 480p (500Kbps) based on bandwidth", "STUN server helps clients discover public IP for NAT traversal", "TURN server relays media when P2P fails (corporate firewalls) - 10% of calls", "Simulcast: send 3 quality layers (1080p, 720p, 480p) - SFU picks best for each receiver", "Jitter buffer (50-200ms) smooths network variations preventing choppy audio"] } },
    { id: 'yelp', title: 'Design Yelp/Maps', level: 'L5 (Senior)', icon: MapPin, desc: 'Location-based search', brief: 'Implement geohashing or QuadTrees for proximity queries. Static data (restaurants) allows aggressive caching unlike dynamic data (Uber drivers). Use PostGIS extension or MongoDB $near operator. Shard by geohash to keep local businesses on same shard.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 250 }, { id: 'cdn', type: 'cdn', x: 250, y: 50 }, { id: 'lb', type: 'lb', x: 250, y: 250 }, { id: 's_search', type: 'server', x: 450, y: 150 }, { id: 's_write', type: 'server', x: 450, y: 350 }, { id: 'db_geo', type: 'db', x: 700, y: 250 }, { id: 'cache', type: 'cache', x: 700, y: 450 }], connections: [{ from: 'u1', to: 'cdn' }, { from: 'u1', to: 'lb' }, { from: 'lb', to: 's_search' }, { from: 'lb', to: 's_write' }, { from: 's_search', to: 'cache' }, { from: 's_search', to: 'db_geo' }, { from: 's_write', to: 'db_geo' }], explanation: ["Geohashing converts lat/lng to string: (37.7749,-122.4194) → '9q8yy' - nearby places share prefix", "QuadTree recursively divides map into 4 quadrants - O(logN) proximity search", "PostgreSQL with PostGIS extension: ST_DWithin(location, point, 5km) finds nearby restaurants", "Shard by geohash prefix: '9q8' (SF), '9q9' (Oakland) keeps local data together", "Redis cache stores popular searches: 'pizza near me in SF' with 1-hour TTL", "Static data enables aggressive caching: restaurant info changes rarely vs Uber driver locations", "Elasticsearch for full-text search: 'italian restaurants with outdoor seating'", "CDN caches restaurant images and static map tiles for fast page loads"] } },
    { id: 'cache-sys', title: 'Design Distributed Cache', level: 'L6 (Staff)', icon: Server, desc: 'Redis/Memcached cluster', brief: 'Implement consistent hashing to minimize key reshuffling on node changes. Use virtual nodes (~1000 per physical node) for load balancing. Implement gossip protocol for failure detection. Design LRU eviction using double-linked list + hash map.', solution: { items: [{ id: 'client', type: 'client', x: 50, y: 250 }, { id: 'proxy', type: 'lb', x: 250, y: 250 }, { id: 'node1', type: 'cache', x: 450, y: 100 }, { id: 'node2', type: 'cache', x: 450, y: 250 }, { id: 'node3', type: 'cache', x: 450, y: 400 }, { id: 's_monitor', type: 'server', x: 700, y: 250 }], connections: [{ from: 'client', to: 'proxy' }, { from: 'proxy', to: 'node1' }, { from: 'proxy', to: 'node2' }, { from: 'proxy', to: 'node3' }, { from: 'node1', to: 'node2' }, { from: 'node2', to: 'node3' }], explanation: ["Consistent hashing: hash(key) maps to ring position - adding node only moves 1/N keys", "Virtual nodes (1000 per physical): better load distribution when nodes have different capacity", "Gossip protocol: nodes ping neighbors every 1s - detect failures in <5s without central coordinator", "LRU eviction: double-linked list (O(1) move to front) + hash map (O(1) lookup)", "Replication factor 3: write to primary + 2 replicas for durability", "Read repair: if replicas have stale data, update them during read", "Proxy layer (Twemproxy) handles sharding logic - clients see single cache", "Monitoring tracks hit rate, latency P99, memory usage, eviction rate"] } },
    { id: 'kv', title: 'Design Key-Value Store', level: 'L6 (Staff)', icon: Database, desc: 'Dynamo-style distributed DB', brief: 'Implement leaderless replication (any node accepts writes). Use tunable consistency (W + R > N for strong, W=1 for high availability). Resolve conflicts with vector clocks. Implement hinted handoff for temporary failures. Use Merkle trees for anti-entropy.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 250 }, { id: 'lb', type: 'lb', x: 250, y: 250 }, { id: 'n1', type: 'server', x: 450, y: 100 }, { id: 'n2', type: 'server', x: 450, y: 250 }, { id: 'n3', type: 'server', x: 450, y: 400 }, { id: 's_coord', type: 'server', x: 700, y: 250 }], connections: [{ from: 'u1', to: 'lb' }, { from: 'lb', to: 'n1' }, { from: 'lb', to: 'n2' }, { from: 'lb', to: 'n3' }, { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' }, { from: 'n1', to: 'n3' }], explanation: ["Leaderless replication: any node accepts writes - no single point of failure", "Tunable consistency: W=2, R=2, N=3 ensures strong consistency (W+R>N)", "High availability mode: W=1, R=1 - faster but may read stale data", "Vector clocks track causality: {A:1, B:2} vs {A:2, B:1} = concurrent conflict", "Conflict resolution: last-write-wins (timestamp) or application-defined merge", "Hinted handoff: if node down, write to another node with hint to replay later", "Merkle trees detect inconsistencies: compare tree hashes to find divergent keys", "Gossip protocol shares membership: nodes learn about cluster topology"] } },
    { id: 'chat-stream', title: 'Design Twitch Chat', level: 'L6 (Staff)', icon: MessageSquare, desc: 'High-volume live chat', brief: 'Broadcast messages to 1M concurrent viewers using tree of edge servers. Implement rate limiting (slow mode) to prevent spam. Use Redis Pub/Sub for fanout. Drop messages if chat moves too fast (eventual consistency). Batch WebSocket messages client-side.', solution: { items: [{ id: 'u_write', type: 'client', x: 50, y: 150 }, { id: 'u_read', type: 'client', x: 50, y: 350 }, { id: 'lb', type: 'lb', x: 250, y: 250 }, { id: 's_ingest', type: 'server', x: 450, y: 150 }, { id: 'redis', type: 'cache', x: 450, y: 350 }, { id: 's_edge1', type: 'server', x: 700, y: 150 }, { id: 's_edge2', type: 'server', x: 700, y: 350 }], connections: [{ from: 'u_write', to: 'lb' }, { from: 'lb', to: 's_ingest' }, { from: 's_ingest', to: 'redis' }, { from: 'redis', to: 's_edge1' }, { from: 'redis', to: 's_edge2' }, { from: 's_edge1', to: 'u_read' }], explanation: ["Tree of edge servers: 1 ingestion server → 100 edge servers → 1M viewers (10k each)", "Redis Pub/Sub broadcasts messages: PUBLISH channel:123 'message' to all subscribers", "Rate limiting (slow mode): max 1 message per 3 seconds per user prevents spam", "Drop messages if >100 msgs/sec: eventual consistency OK for chat (not critical data)", "Client batching: buffer 10 messages or 100ms, send as array reduces WebSocket overhead", "Moderation: ML model flags toxic messages, auto-timeout repeat offenders", "Message persistence: store last 1000 messages in Redis for new viewers joining", "Emote CDN: cache popular emotes/badges on edge for instant rendering"] } },
    { id: 'ads', title: 'Design Ad Click System', level: 'L6 (Staff)', icon: MousePointer, desc: 'Real-time click aggregation', brief: 'Use Lambda architecture: speed layer (Flink) for real-time dashboards, batch layer (Hadoop) for accurate billing. Implement fraud detection (IP blacklists, click patterns). Ensure exactly-once semantics for billing using idempotent IDs. Store raw logs in data lake.', solution: { items: [{ id: 'u1', type: 'client', x: 50, y: 250 }, { id: 'lb', type: 'lb', x: 250, y: 250 }, { id: 'kafka', type: 'server', x: 450, y: 150 }, { id: 's_flink', type: 'server', x: 450, y: 350 }, { id: 's_hadoop', type: 'server', x: 700, y: 150 }, { id: 's3', type: 'cdn', x: 700, y: 350 }, { id: 'db', type: 'db', x: 700, y: 550 }], connections: [{ from: 'u1', to: 'lb' }, { from: 'lb', to: 'kafka' }, { from: 'kafka', to: 's_flink' }, { from: 'kafka', to: 's_hadoop' }, { from: 's_hadoop', to: 's3' }, { from: 's_flink', to: 'db' }], explanation: ["Lambda architecture: Speed layer (Flink) for real-time <1s, Batch layer (Hadoop) for accurate billing", "Kafka stores raw click events: {ad_id, user_id, timestamp, ip, user_agent}", "Flink stream processing: tumbling windows aggregate clicks every 10s for live dashboard", "Hadoop batch job runs hourly: deduplicates, filters fraud, generates billing reports", "Fraud detection: IP blacklist, click frequency >10/min, bot user-agents, click farms", "Exactly-once semantics: idempotent click IDs prevent double-billing on retry", "S3 data lake stores raw logs for 7 years (compliance) partitioned by date", "Reconciliation: compare speed layer vs batch layer, alert on >5% discrepancy"] } }
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

    // AI Tutor Mode States
    const [tutorMode, setTutorMode] = useState(false);
    const [tutorStep, setTutorStep] = useState(0);
    const [tutorPaused, setTutorPaused] = useState(false);
    const [highlightedComponent, setHighlightedComponent] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speechEnabled, setSpeechEnabled] = useState(true);
    const speechSynthRef = useRef(null);

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
        return { x: item.x + 60, y: item.y + 50 };
    };

    // Text-to-Speech Functions
    const speak = (text) => {
        if (!speechEnabled || !text) return;

        // Stop any ongoing speech
        if (speechSynthRef.current) {
            window.speechSynthesis.cancel();
        }

        // Clean text for speech (remove markdown and emojis)
        const cleanText = text
            .replace(/\*\*/g, '') // Remove bold markdown
            .replace(/[🎓👤⚖️🖥️💾⚡🌍🔐🔗📍⏭️💡✅⚠️]/g, '') // Remove emojis
            .replace(/\n/g, '. '); // Replace newlines with pauses

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 0.9; // Slightly slower for clarity
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Try to use a more natural voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice =>
            voice.name.includes('Google') ||
            voice.name.includes('Microsoft') ||
            voice.lang.startsWith('en')
        );
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        speechSynthRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    };

    const stopSpeech = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    const toggleSpeech = () => {
        setSpeechEnabled(!speechEnabled);
        if (speechEnabled) {
            stopSpeech();
        }
    };

    // AI Tutor Mode - Step-by-step teaching
    const startTutorMode = () => {
        setTutorMode(true);
        setTutorStep(0);
        setCanvasItems([]);
        setConnections([]);
        setFeedback(null);
        teachNextStep(0);
    };

    const teachNextStep = (step) => {
        if (!activeChallenge?.solution) return;

        const solution = activeChallenge.solution;
        const totalSteps = solution.items.length + solution.connections.length;

        if (step >= totalSteps) {
            // Tutorial complete
            setFeedback({
                type: 'completion',
                text: '🎓 Tutorial Complete!',
                explanation: [
                    "Congratulations! You've learned how to design " + activeChallenge.title,
                    "Key takeaways:",
                    ...solution.explanation,
                    "💡 Pro Tip: Try building this from scratch to test your understanding!"
                ]
            });
            setTutorMode(false);
            setHighlightedComponent(null);
            return;
        }

        // Add components first, then connections
        if (step < solution.items.length) {
            const item = solution.items[step];
            const comp = COMPONENTS.find(c => c.id === item.type);

            // Add component with label
            const newItem = {
                ...item,
                label: comp?.label || item.type
            };

            setCanvasItems(prev => [...prev, newItem]);
            setHighlightedComponent(item.id);

            // Generate conversational explanation
            const explanations = {
                'client': `Hey there! Let's start with the Client. This represents your users - whether they're on mobile, web, or desktop. Every system starts here because users are who we're building for! Think of this as the entry point where all requests originate. Make sense? Great! Click Next Step when you're ready to add the next component.`,
                'lb': `Awesome! Now we're adding a Load Balancer. Think of this as a traffic cop directing cars at a busy intersection. When millions of users hit your system simultaneously, the Load Balancer distributes requests evenly across multiple servers. This prevents any single server from getting overwhelmed and crashing. Pretty cool, right? Ready for the next one? Hit Next Step!`,
                'server': `Perfect! Now let's add an App Server. This is where the magic happens - your business logic lives here. Authentication, data processing, API endpoints - it all runs on these servers. In production, you'd have multiple servers for redundancy. If one goes down, others keep running. Got it? Click Next Step to continue building!`,
                'db': `Excellent progress! Time for the Database. This is your source of truth - where all persistent data lives permanently. We use SQL databases like PostgreSQL for structured data like users and transactions, or NoSQL like MongoDB for flexibility with documents and logs. Understanding this? Great! Let's move forward - click Next Step!`,
                'cache': `Nice! Here's the Cache, usually Redis. Imagine keeping frequently-used items on your desk instead of walking to the filing cabinet every single time. That's what caching does! It can reduce database load by 80 to 90 percent and make your app lightning fast. Users love speed! Ready to see what's next? Click Next Step!`,
                'cdn': `Fantastic! We're adding a CDN - Content Delivery Network. This caches static assets like images, videos, and CSS files on edge servers worldwide. So whether your user is in Tokyo or New York, they get fast load times because content is served from a server near them. Makes sense? Awesome! Hit Next Step to continue!`,
                'auth': `Almost there! Finally, the Auth Service. Here's a pro tip: Never build authentication yourself from scratch. Use proven solutions like Auth0 or Firebase. This service handles login, tokens, password resets, and security so your main app can focus on features. Trust me on this one! Understanding the importance? Great! Click Next Step!`,
                'queue': `Great choice! Adding a Message Queue like Kafka or RabbitMQ. This is your async communication backbone! When services need to talk without waiting for each other, queues handle it. Think of it like leaving a voicemail instead of waiting on hold. Queues enable decoupling, retry logic, and handling traffic spikes. Following along? Excellent! Click Next Step!`,
                'gateway': `Smart move! Here's the API Gateway. This is your single entry point for all API requests - like a receptionist directing visitors. It handles authentication, rate limiting, request routing, and API versioning. Instead of clients calling 10 different services, they call one gateway. Makes architecture cleaner! Ready for more? Hit Next Step!`,
                'search': `Awesome! Adding a Search Engine like Elasticsearch. This powers your search functionality with full-text search, fuzzy matching, and relevance ranking. Unlike databases optimized for exact lookups, search engines handle typos and rank results by relevance. Think Google-quality search for your app! Understanding? Great! Click Next Step!`,
                'storage': `Perfect! Object Storage like Amazon S3. This stores unstructured data - images, videos, backups, logs. Unlike databases for structured data, object storage is cheap, durable (99.999999999% - eleven nines!), and scales to petabytes. Pay only for what you use! Makes sense? Awesome! Hit Next Step!`,
                'analytics': `Excellent! Analytics service for tracking user behavior and business metrics. This collects events like page views, clicks, purchases and generates insights. Tools like Google Analytics or Mixpanel help you understand what users actually do. Data-driven decisions! Following? Great! Click Next Step!`,
                'monitor': `Nice! Monitoring system like Datadog or Prometheus. This watches your infrastructure 24/7 - CPU usage, memory, request latency, error rates. When something breaks at 3 AM, monitoring alerts you before users notice. Uptime is everything! Understanding the importance? Perfect! Hit Next Step!`,
                'firewall': `Smart addition! Firewall for security. This filters malicious traffic before it reaches your servers - blocking DDoS attacks, SQL injection, XSS attacks. Think of it as a security guard checking IDs at the door. Security is not optional! Ready for the next component? Click Next Step!`,
                'dns': `Great! DNS Server - Domain Name System. This translates human-readable domains like google.com into IP addresses like 142.250.80.46. It's the internet's phonebook! DNS also enables load balancing and failover by routing traffic to healthy servers. Following along? Excellent! Click Next Step!`,
                'worker': `Perfect! Background Worker for async tasks. These handle time-consuming jobs like sending emails, processing images, generating reports - without blocking user requests. Users get instant response while workers chug away in the background. Best of both worlds! Understanding? Great! Hit Next Step!`,
                'proxy': `Awesome! Reverse Proxy like Nginx. This sits in front of your servers handling SSL termination, compression, static file serving, and caching. It's like a super-efficient assistant handling routine tasks so your app servers focus on business logic. Smart architecture! Ready to continue? Click Next Step!`
            };

            const explanation = explanations[item.type] || `Adding ${comp?.label} to the architecture. This component plays an important role in our system design. Ready to continue? Click Next Step!`;

            setFeedback({
                type: 'tutorial',
                text: `Step ${step + 1}/${totalSteps}: Adding ${comp?.label}`,
                explanation: [
                    explanation,
                    `📍 Positioned at (${item.x}, ${item.y}) for optimal visual flow.`
                ]
            });

            // Speak the explanation
            speak(explanation);
        } else {
            // Add connection
            const connIndex = step - solution.items.length;
            const conn = solution.connections[connIndex];

            setConnections(prev => [...prev, conn]);

            const fromItem = solution.items.find(i => i.id === conn.from);
            const toItem = solution.items.find(i => i.id === conn.to);
            const fromComp = COMPONENTS.find(c => c.id === fromItem?.type);
            const toComp = COMPONENTS.find(c => c.id === toItem?.type);

            const connectionText = `Great! Now let's connect ${fromComp?.label} to ${toComp?.label}. This arrow represents the data flow in your system - showing how requests travel from one component to another. In real production systems, these connections might be HTTP REST calls, gRPC for high performance, WebSockets for real-time updates, or message queues like Kafka for async processing. Following along? Excellent! Click Next Step to see the next connection!`;

            setFeedback({
                type: 'tutorial',
                text: `Step ${step + 1}/${totalSteps}: Connecting Components`,
                explanation: [
                    `🔗 Connecting ${fromComp?.label} → ${toComp?.label}`,
                    connectionText
                ]
            });

            // Speak the connection explanation
            speak(connectionText);

        }

        setTutorStep(step + 1);
    };

    const skipTutorial = () => {
        setTutorMode(false);
        setHighlightedComponent(null);
        autoSolve();
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
                                <button onClick={startTutorMode} className="px-5 py-2 rounded-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg">
                                    🎓 AI Tutor
                                </button>
                                <button onClick={autoSolve} className="px-4 py-2 rounded-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg">
                                    <Sparkles size={16} className="inline mr-2" /> ✨ AI Design
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-6 h-[75vh] max-w-7xl mx-auto w-full">
                            {/* TOOLBAR */}
                            <div className="w-64 bg-white dark:bg-dark-800 rounded-2xl border border-gray-200 dark:border-dark-700 shadow-xl flex flex-col h-full">
                                {/* Quick Tips - Fixed at Top */}
                                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-t-2xl border-b border-blue-100 dark:border-blue-900/30">
                                    <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-2">💡 Quick Tips:</p>
                                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                        <li>• Click components to add</li>
                                        <li>• Drag to reposition</li>
                                        <li>• Connect mode to link</li>
                                        <li>• Right-click to delete</li>
                                    </ul>
                                </div>

                                {/* Scrollable Components List */}
                                <div className="flex-1 overflow-y-auto p-4">
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
                                <motion.div initial={{ x: 300 }} animate={{ x: 0 }} className="absolute right-10 top-24 w-96 bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-2xl z-50 border-2 border-gray-200 dark:border-dark-700">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-lg">{tutorMode ? '🎓 AI Tutor' : 'System Walkthrough'}</h3>
                                            {isSpeaking && (
                                                <div className="flex gap-1">
                                                    <div className="w-1 h-4 bg-orange-500 animate-pulse" style={{ animationDelay: '0ms' }}></div>
                                                    <div className="w-1 h-4 bg-orange-500 animate-pulse" style={{ animationDelay: '150ms' }}></div>
                                                    <div className="w-1 h-4 bg-orange-500 animate-pulse" style={{ animationDelay: '300ms' }}></div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {tutorMode && (
                                                <button
                                                    onClick={toggleSpeech}
                                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-all"
                                                    title={speechEnabled ? 'Mute voice' : 'Enable voice'}
                                                >
                                                    {speechEnabled ? '🔊' : '🔇'}
                                                </button>
                                            )}
                                            {tutorMode && activeChallenge?.solution && (
                                                <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full font-bold">
                                                    Step {tutorStep}/{activeChallenge.solution.items.length + activeChallenge.solution.connections.length}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {feedback.text && (
                                        <div className="mb-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                                            <p className="font-bold text-purple-900 dark:text-purple-300">{feedback.text}</p>
                                        </div>
                                    )}

                                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                                        {feedback.explanation?.map((step, i) => (
                                            <div key={i} className="text-sm p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30 leading-relaxed">
                                                {step}
                                            </div>
                                        ))}
                                    </div>

                                    {tutorMode ? (
                                        <div className="flex gap-2 mt-4">
                                            <button
                                                onClick={() => teachNextStep(tutorStep)}
                                                className="flex-1 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-bold hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg"
                                            >
                                                Next Step →
                                            </button>
                                            <button
                                                onClick={skipTutorial}
                                                className="px-4 py-2 bg-gray-200 dark:bg-dark-700 rounded-lg text-xs font-bold hover:bg-gray-300 dark:hover:bg-dark-600 transition-all"
                                            >
                                                Skip
                                            </button>
                                        </div>
                                    ) : (
                                        <button onClick={() => setFeedback(null)} className="w-full mt-4 py-2 bg-gray-100 dark:bg-dark-700 rounded-lg text-xs font-bold hover:bg-gray-200 dark:hover:bg-dark-600 transition-all">
                                            Dismiss
                                        </button>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
