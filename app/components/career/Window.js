"use client";
import { motion } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';

export default function Window({ id, title, children, isActive, onClose, onFocus }) {
    return (
        <motion.div
            drag
            dragMomentum={false}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onMouseDown={() => onFocus(id)}
            className={`absolute top-10 left-10 w-[800px] h-[500px] bg-gray-900 rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col ${
                isActive ? 'z-40 ring-1 ring-white/20' : 'z-10 opacity-90'
            }`}
        >
            {/* Window Header */}
            <div className="h-10 bg-gray-800 flex items-center justify-between px-4 border-b border-white/5 cursor-grab active:cursor-grabbing">
                <div className="flex gap-2 group">
                    <button onClick={() => onClose(id)} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center">
                        <X size={8} className="opacity-0 group-hover:opacity-100 text-black" />
                    </button>
                    <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center">
                        <Minus size={8} className="opacity-0 group-hover:opacity-100 text-black" />
                    </button>
                    <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center">
                        <Square size={8} className="opacity-0 group-hover:opacity-100 text-black fill-current" />
                    </button>
                </div>
                <span className="text-sm font-medium text-gray-400 select-none">{title}</span>
                <div className="w-12"></div> {/* Spacer for centering */}
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-hidden relative bg-black">
                {children}
            </div>
        </motion.div>
    );
}

