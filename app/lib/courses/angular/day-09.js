export const day09 = {
  day: 9,
  title: "Advanced RxJS: State Management",
  intro: "Don't just subscribe. Compose. Master <strong>combineLatest</strong> for View Models, <strong>scan</strong> for state, and <strong>Subject</strong> for actions.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 9. RxJS isn't just for HTTP. It's a full State Management system if you know how to use it."
      },
      {
        type: "talk",
        message: "We'll build a 'ViewModel' stream that combines all data sources into one. The template then only needs `vm$ | async`."
      },
      {
        type: "challenge",
        instruction: "This code manually updates state. Refactor it to use `scan` to accumulate the total count reactively.",
        buggyCode: `// ❌ Imperative State
count = 0;
increment() {
  this.count++; 
}
decrement() {
  this.count--;
}`,
        solutionCode: `// ✅ Reactive State accumulation
action$ = new Subject<number>();

count$ = this.action$.pipe(
  startWith(0),
  scan((acc, val) => acc + val, 0)
);

increment() { this.action$.next(1); }
decrement() { this.action$.next(-1); }`,
        verifyOutput: "scan",
        successMessage: "Exactly! `scan` is like `Array.reduce` but over time. Perfect for accumulating state.",
        hint: "Use `action$.pipe(scan(...))` to maintain the state manually."
      }
    ]
  },
  content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🎼 1. The ViewModel Pattern</h3>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
Stop defining multiple variables in your component (<code>user</code>, <code>posts</code>, <code>isLoading</code>). Define <strong>ONE</strong> Observable <code>vm$</code> that contains everything.
</p>

<div class="bg-gray-100 dark:bg-dark-800 p-6 rounded-xl border-l-4 border-purple-500 mb-10">
<pre class="text-sm font-mono text-gray-800 dark:text-gray-200">
// component.ts
vm$ = combineLatest({
  user: this.auth.user$,
  posts: this.posts$,
  filter: this.filter.valueChanges
}).pipe(
  map(({user, posts, filter}) => ({
    user,
    visiblePosts: posts.filter(p => p.includes(filter))
  }))
);

// component.html
@if (vm$ | async; as vm) {
  Hello {{ vm.user.name }}!
}
</pre>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🧠 2. Accumulating State (scan)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
Need to keep a running total or history? <code>scan</code> is your friend. It's Redux in a single operator.
</p>

<div class="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-200 dark:border-blue-900/30 mb-8">
    <code class="text-blue-700 dark:text-blue-300 font-bold block mb-2">actions$.pipe( scan((state, action) => newState, initialState) )</code>
    <p class="text-xs text-gray-600 dark:text-gray-400">This is how NgRx/Redux works under the hood!</p>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚡ 3. Polling (timer + switchMap)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
Need live data? Don't use <code>setInterval</code>. Use <code>timer</code> composed with <code>switchMap</code> to fetch fresh data cleanly.
</p>
`,
  code: `import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Subject, combineLatest, timer, map, scan, startWith, switchMap, withLatestFrom, of, shareReplay } from 'rxjs';

// --- TYPES ---
interface Trade {
    type: 'BUY' | 'SELL';
    price: number;
    amount: number;
    timestamp: number;
}

interface MarketTick {
    price: number;
    trend: 'UP' | 'DOWN' | 'FLAT';
}

@Component({
  selector: 'app-crypto-trader',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="max-w-2xl mx-auto bg-gray-950 p-6 rounded-2xl border border-gray-800 shadow-2xl min-h-[500px]" style="background-color: #030712; color: white">
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span class="text-3xl">🚀</span> Crypto Trader Pro
        </h2>

        <!-- LOADING / ERROR / CONTENT -->
        @if (vm$ | async; as vm) {
            
            <!-- HEADER STATS -->
            <div class="grid grid-cols-2 gap-4 mb-8">
                <div class="p-4 rounded-xl bg-gray-900 border border-gray-800">
                    <p class="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Current Price</p>
                    <div class="flex items-end gap-2">
                        <span class="text-3xl font-mono font-bold text-white">
                            \${{ vm.market.price | number:'1.2-2' }}
                        </span>
                        <span class="text-xs mb-1 font-bold px-2 py-0.5 rounded"
                              [class.bg-green-500_20]="vm.market.trend === 'UP'"
                              [class.text-green-400]="vm.market.trend === 'UP'"
                              [class.bg-red-500_20]="vm.market.trend === 'DOWN'"
                              [class.text-red-400]="vm.market.trend === 'DOWN'">
                            {{ vm.market.trend }}
                        </span>
                    </div>
                </div>
                
                <div class="p-4 rounded-xl bg-gray-900 border border-gray-800">
                    <p class="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Your Balance</p>
                    <div class="text-3xl font-mono font-bold text-blue-400">
                        \${{ vm.balance | number:'1.2-2' }}
                    </div>
                    <div class="text-xs text-gray-500 mt-1">
                        Holding: <span class="text-white font-bold">{{ vm.holding | number:'1.4-4' }} BTC</span>
                    </div>
                </div>
            </div>

            <!-- CONTROLS -->
            <div class="grid grid-cols-2 gap-4 mb-8">
                 <button (click)="trade('BUY', vm.market.price)" 
                         [disabled]="vm.balance < vm.market.price"
                         class="p-4 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-lg transition-transform active:scale-95 flex flex-col items-center">
                     <span>BUY 1 BTC</span>
                     <span class="text-xs font-normal opacity-80">Cost: \${{ vm.market.price | number:'1.0-0' }}</span>
                 </button>
                 
                 <button (click)="trade('SELL', vm.market.price)"
                         [disabled]="vm.holding < 1"
                         class="p-4 bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-lg transition-transform active:scale-95 flex flex-col items-center">
                     <span>SELL 1 BTC</span>
                     <span class="text-xs font-normal opacity-80">Value: \${{ vm.market.price | number:'1.0-0' }}</span>
                 </button>
            </div>

            <!-- HISTORY LIST (scan in action) -->
            <div class="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
                <div class="px-4 py-3 bg-gray-900 border-b border-gray-800 flex justify-between items-center">
                    <h3 class="font-bold text-sm text-gray-300">Transaction History</h3>
                    <span class="text-xs text-gray-500">{{ vm.history.length }} trades</span>
                </div>
                <div class="max-h-48 overflow-y-auto p-2 space-y-2">
                    @for (trade of vm.history; track trade.timestamp) {
                        <div class="flex justify-between items-center p-3 rounded-lg bg-black/20 text-sm animate-in slide-in-from-left duration-300">
                            <div class="flex items-center gap-3">
                                <span [class.text-green-400]="trade.type === 'BUY'" 
                                      [class.text-red-400]="trade.type === 'SELL'"
                                      class="font-bold">
                                    {{ trade.type }}
                                </span>
                                <span class="text-gray-500 text-xs">
                                    {{ trade.timestamp | date:'HH:mm:ss' }}
                                </span>
                            </div>
                            <div class="font-mono text-gray-300">
                                @if (trade.type === 'BUY') { - } @else { + }
                                \${{ trade.price | number:'1.0-0' }}
                            </div>
                        </div>
                    } @empty {
                         <div class="p-8 text-center text-gray-500 text-sm italic">
                            No trades yet. Market is moving...
                        </div>
                    }
                </div>
            </div>

        } @else {
            <div class="text-center py-20 text-blue-400 animate-pulse">
                Connect to Exchange...
            </div>
        }
    </div>
  \`
})
export class CryptoTrader {
    // 1. INPUT STREAMS (Actions)
    tradeAction$ = new Subject<{ type: 'BUY' | 'SELL', price: number }>();

    // 2. DATA STREAMS (Source)
    // Simulate WebSocket with polling
    market$ = timer(0, 2000).pipe(
        scan((acc) => {
            const change = (Math.random() - 0.5) * 1000;
            const newPrice = Math.max(100, acc.price + change);
            return {
                price: newPrice,
                trend: change > 0 ? 'UP' : change < 0 ? 'DOWN' : 'FLAT'
            } as MarketTick;
        }, { price: 45000, trend: 'FLAT' } as MarketTick),
        shareReplay(1)
    );

    // 3. STATE STREAMS (Accumulated)
    // Use scan to maintain balance/holding state based on actions
    wallet$ = this.tradeAction$.pipe(
        startWith(null), // Trigger initial state
        scan((state, action) => {
            if (!action) return state;
            
            const newBalance = action.type === 'BUY' 
                ? state.balance - action.price 
                : state.balance + action.price;
                
            const newHolding = action.type === 'BUY'
                ? state.holding + 1
                : state.holding - 1;

            return { 
                balance: newBalance, 
                holding: newHolding,
                history: [{ ...action, amount: 1, timestamp: Date.now() }, ...state.history]
            };
        }, { balance: 100000, holding: 0, history: [] as Trade[] }),
        shareReplay(1)
    );

    // 4. VIEW MODEL (Combined)
    // One stream for the template!
    vm$ = combineLatest({
        market: this.market$,
        wallet: this.wallet$
    }).pipe(
        map(({ market, wallet }) => ({
            market,
            balance: wallet.balance,
            holding: wallet.holding,
            history: wallet.history
        }))
    );

    trade(type: 'BUY' | 'SELL', price: number) {
        this.tradeAction$.next({ type, price });
    }
}`,
  comparison: {
    junior: `// ❌ Managing multiple async values
user: User;
settings: Settings;

ngOnInit() {
  this.user$.subscribe(u => this.user = u);
  this.settings$.subscribe(s => this.settings = s);
}`,
    senior: `// ✅ Single Source of Truth
vm$ = combineLatest({
  user: this.user$,
  settings: this.settings$
});`
  },
  interview: {
    questions: [
      {
        q: "What happens if one Observable in combineLatest hasn't emitted yet?",
        a: "combineLatest will NOT emit anything until *every* source Observable has emitted at least once. Use startWith() to fix this if needed."
      },
      {
        q: "What is a 'Higher Order Observable'?",
        a: "An Observable that emits *other* Observables. Operators like switchMap and mergeMap are used to 'flatten' them into a single stream of values."
      }
    ]
  }
};
