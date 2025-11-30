"use client";
import { Hash } from 'lucide-react';

export default function SlackApp({ messages = [] }) {
    return (
        <div className="flex h-full text-white font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-[#3F0E40] flex flex-col shrink-0">
                <div className="p-4 border-b border-white/10 font-bold text-lg hover:bg-white/10 cursor-pointer transition flex items-center justify-between">
                    NextCorp <span>▾</span>
                </div>
                <div className="flex-1 overflow-y-auto py-4">
                    <div className="mb-6">
                        <div className="px-4 text-xs text-gray-400 mb-2 flex items-center justify-between group">
                            <span>Channels</span>
                        </div>
                        <div className="space-y-0.5">
                            <div className="px-4 py-1 bg-[#1164A3] text-white flex items-center gap-2 cursor-pointer">
                                <Hash size={14} className="text-gray-300" />
                                <span>general</span>
                            </div>
                            <div className="px-4 py-1 hover:bg-[#350d36] text-gray-300 flex items-center gap-2 cursor-pointer">
                                <Hash size={14} />
                                <span>engineering</span>
                            </div>
                            <div className="px-4 py-1 hover:bg-[#350d36] text-gray-300 flex items-center gap-2 cursor-pointer">
                                <Hash size={14} />
                                <span>design</span>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <div className="px-4 text-xs text-gray-400 mb-2">Direct Messages</div>
                        <div className="space-y-0.5">
                            <div className="px-4 py-1 hover:bg-[#350d36] text-gray-300 flex items-center gap-2 cursor-pointer">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span>CTO (Sarah)</span>
                            </div>
                            <div className="px-4 py-1 hover:bg-[#350d36] text-gray-300 flex items-center gap-2 cursor-pointer">
                                <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                <span>Product Manager</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-white flex flex-col relative min-w-0">
                <div className="h-14 border-b flex items-center px-4 justify-between bg-white shrink-0">
                    <div className="font-bold text-gray-900 flex items-center gap-1">
                        <Hash size={18} className="text-gray-500" />
                        general
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
                    {messages.map((msg, index) => (
                        <div key={index} className="flex gap-4 group">
                            <div className={`w-10 h-10 rounded ${msg.avatarColor || 'bg-gray-500'} flex items-center justify-center text-white font-bold shrink-0 text-sm`}>
                                {msg.sender.charAt(0)}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-baseline gap-2">
                                    <span className="font-bold text-gray-900">{msg.sender}</span>
                                    <span className="text-xs text-gray-500">{msg.time}</span>
                                </div>
                                <p className="text-gray-800 mt-1 leading-relaxed whitespace-pre-line">
                                    {msg.text}
                                </p>
                            </div>
                        </div>
                    ))}
                    
                    {messages.length === 0 && (
                        <div className="text-center text-gray-500 mt-10">
                            No new messages.
                        </div>
                    )}
                </div>

                <div className="p-4 border-t bg-white shrink-0">
                    <div className="border border-gray-300 rounded-lg p-2">
                        <input type="text" placeholder="Message #general" className="w-full outline-none text-gray-700" />
                    </div>
                </div>
            </div>
        </div>
    );
}
