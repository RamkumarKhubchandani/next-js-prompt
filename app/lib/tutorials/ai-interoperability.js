export const aiInteroperability = {
    title: "AI-to-AI Interoperability: The Agent Protocol",
    description: "The next API is English. Learn how to build standardized interfaces so your Agent can negotiate with Stripe's Agent, authorize payments, and handle disputes without human intervention.",
    slug: "ai-interoperability",
    category: "AI Engineering",
    type: "static",
    author: "Protocol Engineer",
    createdAt: new Date().toISOString(),
    readTime: "15 min read",
    difficulty: "Expert",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop",
    tags: ["AI Engineering", "Agents", "Interoperability", "Model Context Protocol", "API Design"],
    keywords: ["Agent Protocol", "Model Context Protocol", "AI APIs", "Machine to Machine AI", "MCP"],
    toc: [
        { id: "natural-language-api", label: "01. The Natural Language API" },
        { id: "handshake", label: "02. The Handshake" },
        { id: "mcp", label: "03. Model Context Protocol" },
        { id: "senior-take", label: "04. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Natural Language API -->
        <section id="natural-language-api" class="scroll-mt-32">
             <div class="border-l-8 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    REST is for humans.<br/>English is for Agents.
                </h1>
                <p class="text-xl md:text-2xl text-indigo-800 dark:text-indigo-200 font-light leading-relaxed">
                    When two autonomous agents talk, they don't need a Swagger file. They need a "Goal" and a "Contract".
                    <br/><br/>
                    We are seeing the rise of <strong>Agent-to-Agent (A2A)</strong> protocols where your Travel Agent AI negotiates directly with the Airline Agent AI to rebook a flight.
                </p>
             </div>
        </section>

        <!-- 03. MCP -->
        <section id="mcp" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-indigo-600 dark:text-indigo-500">03.</span>
                Model Context Protocol (MCP)
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    Anthropic's MCP (Model Context Protocol) is winning because it solves the N x M problem. Instead of every AI app building integrations for Google Drive, Slack, and GitHub, we build <strong>one</strong> MCP Server for each service. Any MCP-compliant Agent (Claude, Cursor, etc.) can then connect to it.
                </p>
                <div class="bg-indigo-900/10 border-l-4 border-indigo-500 p-6 my-6 font-mono text-xs md:text-sm">
                    <strong>Architecture:</strong><br/><br/>
                    [🤖 AI Client (Claude)] <br/>
                       &nbsp;&nbsp;&nbsp;⬇️ (JSON-RPC) <br/>
                    [🔌 MCP Host Process] <br/>
                       &nbsp;&nbsp;&nbsp;⬇️ (Stdio / SSE) <br/>
                    [📦 MCP Server (e.g., Stripe Integration)] <br/>
                       &nbsp;&nbsp;&nbsp;⬇️ (HTTP) <br/>
                    [☁️ Actual Stripe API]
                </div>
            </div>
             <div class="bg-gray-900 p-6 rounded-xl border border-gray-800 font-mono text-sm leading-relaxed overflow-x-auto">
                 <div class="text-gray-400 mb-2">// server.ts (The Stripe Agent)</div>
                 <div class="text-purple-400">import</div> {'{'} McpServer, ResourceTemplate {'}'} <div class="text-purple-400">from</div> <span class="text-green-400">"@modelcontextprotocol/sdk"</span>;<br/><br/>
                 
                 <div class="text-purple-400">const</div> server = <div class="text-purple-400">new</div> McpServer({'{'} <br/>
                 &nbsp;&nbsp;name: <span class="text-green-400">"stripe-agent"</span>,<br/>
                 &nbsp;&nbsp;version: <span class="text-green-400">"1.0"</span> <br/>
                 {'}'}); <br/><br/>
                 
                 <span class="text-gray-500">// 1. Expose Tools</span><br/>
                 server.tool(<br/>
                 &nbsp;&nbsp;<span class="text-green-400">"refund_payment"</span>, <br/>
                 &nbsp;&nbsp;{'{'} id: z.string().startsWith("ch_") {'}'}, <br/>
                 &nbsp;&nbsp;<div class="text-purple-400">async</div> ({'{'} id {'}'}) => {'{'} <br/>
                 &nbsp;&nbsp;&nbsp;&nbsp;<div class="text-purple-400">return</div> refund(id); <br/>
                 &nbsp;&nbsp;{'}'}<br/>
                 );<br/><br/>

                 <span class="text-gray-500">// 2. Expose Resources (Read-Only Data)</span><br/>
                 server.resource(<br/>
                 &nbsp;&nbsp;<span class="text-green-400">"payment-logs"</span>,<br/>
                 &nbsp;&nbsp;<span class="text-green-400">"payments://{'{'}id{'}'}/logs"</span>,<br/>
                 &nbsp;&nbsp;<div class="text-purple-400">async</div> (uri, {'{'} id {'}'}) => readLogs(id)<br/>
                 );
            </div>
        </section>

        <!-- 04. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-indigo-600 dark:text-indigo-500">04.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-indigo-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Trust & Auth Delegation</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    Technically, this is solved. The hard part is <strong>Authentication</strong>. 
                    <br/><br/>
                    We need "OAuth for Agents". You shouldn't give your agent your raw Stripe Secret Key. You should grant a scoped token: <code>stripe:refunds:read_write</code>.
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState } from 'react';

// 🤝 Protocol Visualizer

export default function ProtocolDemo() {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState('idle');

    const startNegotiation = async () => {
        setStatus('active');
        setMessages([]);
        
        const sequence = [
            { from: 'Buyer', text: "Handshake: I want to buy Item #99. Capability Check?" },
            { from: 'Seller', text: "ACK. I support MCP v1. Tools: [get_price, purchase]." },
            { from: 'Buyer', text: "Call Tool: get_price(#99)" },
            { from: 'Seller', text: "Result: $50.00" },
            { from: 'Buyer', text: "Negotiate: can we do $45?" },
            { from: 'Seller', text: "Logic: Margin allows >$40. ACCEPT $45." },
            { from: 'Buyer', text: "Call Tool: purchase(#99, $45)" },
            { from: 'Seller', text: "Transaction Complete. Invoice #1024." }
        ];

        for (const msg of sequence) {
            await new Promise(r => setTimeout(r, 1000));
            setMessages(p => [...p, msg]);
        }
        setStatus('done');
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="text-indigo-500">🤝</span> A2A Protocol
                </h3>
                <button 
                    onClick={startNegotiation}
                    disabled={status === 'active'}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold px-6 py-2 rounded-xl transition-all"
                >
                    Start Negotiation
                </button>
            </div>

            <div className="flex gap-4 items-stretch h-[400px]">
                
                {/* Agent A */}
                <div className="w-1/4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 flex flex-col items-center border border-blue-200 dark:border-blue-800">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 text-white">
                        <span className="text-3xl">🤖</span>
                    </div>
                    <div className="font-bold text-blue-700 dark:text-blue-300">Buyer Agent</div>
                    <div className="text-xs text-center text-gray-500 mt-2">Goal: Buy cheaper than $50</div>
                </div>

                {/* Comm Channel */}
                <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 overflow-y-auto space-y-4">
                    {messages.length === 0 && <div className="text-center text-gray-400 mt-20">Secure Channel Empty</div>}
                    {messages.map((m, i) => (
                        <div key={i} className={\`flex \${m.from === 'Buyer' ? 'justify-start' : 'justify-end'}\`}>
                            <div className={\`max-w-[80%] p-3 rounded-xl text-sm \${
                                m.from === 'Buyer' 
                                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded-tl-none' 
                                : 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 rounded-tr-none'
                            }\`}>
                                <div className="text-[10px] font-bold opacity-50 mb-1">{m.from}</div>
                                {m.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Agent B */}
                 <div className="w-1/4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-4 flex flex-col items-center border border-indigo-200 dark:border-indigo-800">
                    <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mb-4 text-white">
                        <span className="text-3xl">🤖</span>
                    </div>
                    <div className="font-bold text-indigo-700 dark:text-indigo-300">Seller Agent</div>
                    <div className="text-xs text-center text-gray-500 mt-2">Goal: Maximize profit (> $40)</div>
                </div>

            </div>
        </div>
    );
}
`
};
