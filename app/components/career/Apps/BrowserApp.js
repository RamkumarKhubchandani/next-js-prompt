"use client";
import { SandpackPreview } from "@codesandbox/sandpack-react";
import { RefreshCw, ArrowLeft, ArrowRight, Lock } from 'lucide-react';

export default function BrowserApp() {
    return (
        <div className="h-full flex flex-col bg-gray-100">
            {/* Browser Chrome */}
            <div className="h-10 bg-gray-200 border-b border-gray-300 flex items-center px-2 gap-2">
                <div className="flex gap-1">
                    <button className="p-1.5 hover:bg-gray-300 rounded-full text-gray-500"><ArrowLeft size={12} /></button>
                    <button className="p-1.5 hover:bg-gray-300 rounded-full text-gray-500"><ArrowRight size={12} /></button>
                    <button className="p-1.5 hover:bg-gray-300 rounded-full text-gray-500"><RefreshCw size={12} /></button>
                </div>
                <div className="flex-1 bg-white h-7 rounded-full border border-gray-300 flex items-center px-3 gap-2 text-xs text-gray-600">
                    <Lock size={10} className="text-green-600" />
                    <span>localhost:3000</span>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 relative">
                <SandpackPreview 
                    showOpenInCodeSandbox={false} 
                    showRefreshButton={false}
                    style={{ height: '100%' }}
                />
            </div>
        </div>
    );
}



