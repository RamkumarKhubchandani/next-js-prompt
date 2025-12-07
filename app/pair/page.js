"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Users, Code, ArrowRight } from 'lucide-react';

export default function PairProgrammingLobby() {
    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false);
    const [joinId, setJoinId] = useState('');

    const createRoom = async () => {
        setIsCreating(true);
        // Generate a random room ID
        const roomId = Math.random().toString(36).substring(2, 8);
        
        // Initialize the room in DB with default code
        try {
            await fetch('/api/rooms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    roomId, 
                    code: `import React from "react";

export default function App() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
          Hello from Room ${roomId}
        </h1>
        <p className="text-gray-400">Type here to sync with friends!</p>
      </div>
    </div>
  );
}` 
                })
            });
        } catch (e) {
            console.error("Failed to create room", e);
        }

        // Redirect
        setTimeout(() => {
            router.push(`/pair/${roomId}`);
        }, 500);
    };

    const handleJoin = () => {
        if (joinId.trim()) {
            router.push(`/pair/${joinId.trim()}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-900 text-white px-4">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
            
            <div className="max-w-2xl w-full">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-block p-4 rounded-full bg-brand-primary/10 mb-6 relative group">
                        <div className="absolute inset-0 bg-brand-primary blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <Users size={48} className="text-brand-primary relative z-10" />
                    </div>
                    <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        DevRooms
                    </h1>
                    <p className="text-xl text-light-300 max-w-lg mx-auto">
                        Real-time collaborative coding environments. Pair program, interview, or teach in a live sandbox.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Create Room */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={createRoom}
                        disabled={isCreating}
                        className="group relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-brand-primary to-blue-600 text-left border border-white/10 shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Code size={100} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-dark-900 mb-2">Start a Session</h3>
                            <p className="text-dark-900/80 mb-6">Create a new room and invite collaborators via link.</p>
                            <div className="inline-flex items-center gap-2 bg-dark-900/20 px-4 py-2 rounded-lg text-dark-900 font-bold group-hover:bg-dark-900/30 transition-colors">
                                {isCreating ? 'Creating...' : 'Create Room'} <ArrowRight size={18} />
                            </div>
                        </div>
                    </motion.button>

                    {/* Join Room */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-8 rounded-2xl bg-dark-800 border border-dark-700 flex flex-col justify-center"
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">Join a Room</h3>
                        <p className="text-light-400 mb-6">Got a code? Enter it below to join an existing session.</p>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                value={joinId}
                                onChange={(e) => setJoinId(e.target.value)}
                                placeholder="e.g. xkcd42" 
                                className="flex-1 bg-dark-900 border border-dark-600 rounded-lg px-4 text-white focus:ring-2 focus:ring-brand-primary outline-none"
                            />
                            <button 
                                onClick={handleJoin}
                                className="px-4 py-3 bg-dark-700 hover:bg-dark-600 text-white rounded-lg font-bold transition-colors"
                            >
                                Join
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
