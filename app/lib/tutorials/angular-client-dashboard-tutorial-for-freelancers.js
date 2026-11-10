export const angularClientDashboardTutorialForFreelancers = {
    title: "Angular Client Dashboard Tutorial for Freelance Devs",
    description: "Build a client reporting dashboard in modern Angular using standalone components, signals, typed HTTP services, lazy routing, and unit tests.",
    slug: "angular-client-dashboard-tutorial-for-freelancers",
    publishedAt: "2026-11-15T11:30:00+05:30",
    type: "static",
    author: "Ramkumar Khubchandani",
    createdAt: "2026-11-15T11:30:00+05:30",
    readTime: "22 min read",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2560&auto=format&fit=crop",
    tags: ["Angular", "Standalone Components", "Signals", "TypeScript", "Freelancing", "Dashboard", "Testing"],
    keywords: [
        "angular client dashboard tutorial for freelancers",
        "angular standalone dashboard tutorial",
        "angular signals tutorial for freelancers",
        "angular typed http service",
        "angular testing standalone component",
        "freelance angular developer project",
        "angular dashboard architecture"
    ],
    primaryCta: {
        label: "Hire Angular Developer",
        href: "/hire/angular-developer"
    },
    relatedPosts: [
        "zoneless-angular",
        "signal-store-mastery",
        "angular-hydration-mastery"
    ],
    toc: [
        { id: "standalone-architecture", label: "01. Architecture & Setup: Standalone Components without NgModules" },
        { id: "signal-state-management", label: "02. Signal Store: Reactive Metrics & Filtering State" },
        { id: "typed-http-service", label: "03. Typed HTTP Service & Functional Interceptors" },
        { id: "dashboard-layout-routing", label: "04. Lazy-Loaded Dashboard Routes & Signal Input Subcomponents" },
        { id: "testing-signals-component", label: "05. Unit Testing Standalone Components & HTTP Services" },
        { id: "client-deployment-handover", label: "06. Production Build Optimization & Client Delivery Runbook" },
        { id: "angular-consulting-support", label: "07. Senior Angular Consulting & Architecture" }
    ],
    content: `
    <div class="space-y-12 font-sans text-gray-800 dark:text-gray-200">
        
        <header class="border-l-8 border-red-500 bg-red-50 dark:bg-red-950/20 pl-8 py-6 mb-8 rounded-r-2xl shadow-sm">
            <h1 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight mb-3">
                Angular Client Dashboard Tutorial: Modern Signals & Standalone Components
            </h1>
            <p class="text-base text-red-900 dark:text-red-200 font-light leading-relaxed">
                Modern Angular has completely evolved. The legacy era of bloated NgModules, complex RxJS subscription leaks, and heavy boilerplate has been replaced by lightweight Standalone Components, fine-grained Signals, functional router guards, and lightning-fast Vite/esbuild builds. For freelance engineers, Angular is an exceptionally lucrative niche: corporate clients gladly pay premium rates for reliable, typed internal dashboards that can scale safely. In this end-to-end tutorial, we will build <strong>Apex Logistics Analytics</strong>, a client reporting dashboard built with modern Angular, Signals, and typed HTTP services. Explore our <a href="/hire/angular-developer" class="text-red-700 dark:text-red-400 font-semibold hover:underline">freelance Angular developers</a> and 1-on-1 <a href="/mentors/angular-mentors-in-online" class="text-red-700 dark:text-red-400 font-semibold hover:underline">online Angular mentors</a>.
            </p>
        </header>

        <!-- 01. Standalone Architecture -->
        <section id="standalone-architecture" class="scroll-mt-32">
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-3 dark:border-gray-800">
                01. Architecture & Setup: Standalone Components without NgModules
            </h2>
            <div class="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                    Historically, pitching Angular to small-to-midsize business clients was difficult due to the cognitive overhead of <code>NgModule</code> declarations. Today, Angular applications are built entirely using <a href="https://angular.dev/guide/components/importing" target="_blank" rel="noopener noreferrer" class="text-red-600 dark:text-red-400 font-semibold underline">standalone components</a>. Every component declares its exact dependencies directly inside its decorator, unlocking tree-shaking and effortless code splitting.
                </p>

                <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm my-4">
                    <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Client Brief: Apex Logistics Freight Dashboard</h3>
                    <p class="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3">
                        The client operates an interstate freight logistics company. They need an internal reporting portal where depot dispatchers track shipment volume, filter transit routes by status (On Time, Delayed, In Transit), calculate daily fuel surcharge averages, and export compliance reports.
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm">
                        <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                            <span class="font-bold text-red-600 dark:text-red-400 block mb-1">Signals Reactivity</span>
                            <p class="text-slate-600 dark:text-slate-400 text-xs">Zero async pipe boilerplate. State mutations notify the UI with fine-grained precision without Zone.js overhead.</p>
                        </div>
                        <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                            <span class="font-bold text-red-600 dark:text-red-400 block mb-1">Typed HttpClient</span>
                            <p class="text-slate-600 dark:text-slate-400 text-xs">All API data models are strictly typed via TypeScript interfaces, catching backend payload mismatches at build time.</p>
                        </div>
                        <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                            <span class="font-bold text-red-600 dark:text-red-400 block mb-1">Lazy Routing</span>
                            <p class="text-slate-600 dark:text-slate-400 text-xs">Heavy chart modules and data tables load asynchronously on-demand using <code>loadComponent</code>.</p>
                        </div>
                    </div>
                </div>

                <p>
                    Let us inspect the lean bootstrap pipeline of a modern standalone Angular application. Instead of an <code>AppModule</code> class, we configure providers through a pure configuration object passed into <code>bootstrapApplication</code>:
                </p>

                <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs font-mono my-3 border border-slate-800 leading-relaxed"><code class="language-typescript">// src/app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    )
  ]
};

// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));</code></pre>

                <p>
                    Notice the modern flags: <code>withFetch()</code> instructs Angular's <code>HttpClient</code> to use the web standard <code>fetch()</code> API under the hood rather than <code>XMLHttpRequest</code>, improving performance and preparing the application for future Server-Side Rendering (SSR). <code>withComponentInputBinding()</code> allows router path parameters and query parameters to bind directly to component signal inputs.
                </p>

                <p>
                    For an in-depth look at zoneless reactivity and signal architectures, read our guides on <a href="/blogs/zoneless-angular" class="text-red-600 dark:text-red-400 font-semibold underline">Zoneless Angular</a> and <a href="/blogs/signal-store-mastery" class="text-red-600 dark:text-red-400 font-semibold underline">SignalStore state management</a>.
                </p>
            </div>
        </section>

        <!-- 02. Signal State Management -->
        <section id="signal-state-management" class="scroll-mt-32">
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-3 dark:border-gray-800">
                02. Signal Store: Reactive Metrics & Filtering State
            </h2>
            <div class="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                    Angular's native <a href="https://angular.dev/guide/signals" target="_blank" rel="noopener noreferrer" class="text-red-600 dark:text-red-400 font-semibold underline">Signals API</a> provides fine-grained reactivity without the cognitive complexity of managing manual RxJS BehaviorSubject subscriptions or calling <code>unsubscribe()</code>. We encapsulate our dashboard metrics in an injectable service:
                </p>

                <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs font-mono my-3 border border-slate-800 leading-relaxed"><code class="language-typescript">// src/app/services/dashboard-state.service.ts
import { Injectable, signal, computed } from '@angular/core';

export interface Shipment {
  id: string;
  trackingNumber: string;
  destination: string;
  carrier: string;
  status: 'DELIVERED' | 'IN_TRANSIT' | 'DELAYED';
  freightFee: number;
  fuelSurcharge: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardStateService {
  // Raw reactive signals
  readonly shipments = signal&lt;Shipment[]&gt;([
    { id: '1', trackingNumber: 'APX-901', destination: 'Chicago, IL', carrier: 'SwiftLine', status: 'IN_TRANSIT', freightFee: 1450, fuelSurcharge: 180 },
    { id: '2', trackingNumber: 'APX-902', destination: 'Dallas, TX', carrier: 'PrimeFreight', status: 'DELAYED', freightFee: 2200, fuelSurcharge: 260 },
    { id: '3', trackingNumber: 'APX-903', destination: 'Seattle, WA', carrier: 'SwiftLine', status: 'DELIVERED', freightFee: 1850, fuelSurcharge: 210 },
    { id: '4', trackingNumber: 'APX-904', destination: 'Atlanta, GA', carrier: 'ApexFleet', status: 'IN_TRANSIT', freightFee: 1100, fuelSurcharge: 130 }
  ]);

  readonly activeFilter = signal&lt;string&gt;('ALL');
  readonly searchQuery = signal&lt;string&gt;('');

  // Computed signal: Filtered list based on search and status
  readonly filteredShipments = computed(() =&gt; {
    const list = this.shipments();
    const filter = this.activeFilter();
    const query = this.searchQuery().toLowerCase().trim();

    return list.filter(item =&gt; {
      const matchesFilter = filter === 'ALL' || item.status === filter;
      const matchesSearch = !query || 
        item.trackingNumber.toLowerCase().includes(query) ||
        item.destination.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  });

  // Computed summary metrics
  readonly totalRevenue = computed(() =&gt; {
    return this.filteredShipments().reduce((sum, s) =&gt; sum + s.freightFee + s.fuelSurcharge, 0);
  });

  readonly delayedCount = computed(() =&gt; {
    return this.shipments().filter(s =&gt; s.status === 'DELAYED').length;
  });

  // Actions
  setFilter(status: string) {
    this.activeFilter.set(status);
  }

  setSearch(query: string) {
    this.searchQuery.set(query);
  }
}</code></pre>
            </div>
        </section>

        <!-- 03. Typed HTTP Service -->
        <section id="typed-http-service" class="scroll-mt-32">
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-3 dark:border-gray-800">
                03. Typed HTTP Service & Functional Interceptors
            </h2>
            <div class="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                    Connecting backend APIs to Angular signals is streamlined using the <code>toSignal()</code> utility from <code>@angular/core/rxjs-interop</code>. This automatically converts Observable streams into reactive signals with built-in subscription management. Furthermore, modern Angular deprecates class-based <code>HttpInterceptor</code> in favor of functional interceptors defined via <code>HttpInterceptorFn</code>.
                </p>

                <p>
                    First, let us examine the functional authentication and telemetry interceptor that appends secure tokens and handles API errors:
                </p>

                <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs font-mono my-3 border border-slate-800 leading-relaxed"><code class="language-typescript">// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Retrieve token securely from storage or environment config
  const authToken = 'session-apex-corp-token-demo';

  // Clone request with authentication header and request ID
  const authReq = req.clone({
    setHeaders: {
      Authorization: \`Bearer \${authToken}\`,
      'X-Client-Trace-Id': crypto.randomUUID()
    }
  });

  return next(authReq).pipe(
    // Automatic retry for transient network dropouts (status 503 or 504)
    retry({
      count: 2,
      delay: 1000
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn('Authentication expired. Redirecting dispatcher to login.');
      } else if (error.status >= 500) {
        console.error('Apex Logistics API internal server error:', error.message);
      }
      return throwError(() => error);
    })
  );
};</code></pre>

                <p>
                    Next, we implement our typed API service that fetches live logistics telemetry from the client's REST microservice:
                </p>

                <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs font-mono my-3 border border-slate-800 leading-relaxed"><code class="language-typescript">// src/app/services/freight-api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';
import { Shipment } from './dashboard-state.service';

@Injectable({
  providedIn: 'root'
})
export class FreightApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.apexlogistics.example/v1/shipments';

  // Fetch live shipments and convert to a signal directly
  readonly remoteShipments = toSignal(
    this.http.get&lt;Shipment[]&gt;(this.apiUrl).pipe(
      catchError(err =&gt; {
        console.error('Failed to fetch remote shipments, fallback to local cache:', err);
        return of([] as Shipment[]);
      })
    ),
    { initialValue: [] as Shipment[] }
  );
}</code></pre>
            </div>
        </section>

        <!-- 04. Dashboard Layout & Routing -->
        <section id="dashboard-layout-routing" class="scroll-mt-32">
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-3 dark:border-gray-800">
                04. Lazy-Loaded Dashboard Routes & Signal Input Subcomponents
            </h2>
            <div class="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                    Modern Angular introduces signal-based inputs via <code>input()</code> and outputs via <code>output()</code>. These replace legacy <code>@Input()</code> and <code>@Output()</code> decorators, guaranteeing compile-time immutability and seamless reactivity.
                </p>

                <p>
                    Here is our reusable <code>MetricCardComponent</code> showcasing signal inputs:
                </p>

                <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs font-mono my-3 border border-slate-800 leading-relaxed"><code class="language-typescript">// src/app/components/metric-card.component.ts
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [CommonModule],
  template: \`
    &lt;div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"&gt;
      &lt;div class="flex items-center justify-between"&gt;
        &lt;span class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"&gt;
          {{ title() }}
        &lt;/span&gt;
        &lt;span class="text-xs px-2 py-0.5 rounded-full font-semibold" [ngClass]="trendColorClass()"&gt;
          {{ trendText() }}
        &lt;/span&gt;
      &lt;/div&gt;
      &lt;div class="text-2xl md:text-3xl font-black mt-2 text-slate-900 dark:text-white"&gt;
        {{ value() }}
      &lt;/div&gt;
      &lt;p class="text-xs text-slate-500 dark:text-slate-400 mt-1"&gt;{{ subtitle() }}&lt;/p&gt;
    &lt;/div&gt;
  \`
})
export class MetricCardComponent {
  // Required signal inputs
  readonly title = input.required&lt;string&gt;();
  readonly value = input.required&lt;string&gt;();
  
  // Optional signal inputs with default fallbacks
  readonly subtitle = input&lt;string&gt;('Updated just now');
  readonly trendText = input&lt;string&gt;('+4.2%');
  readonly isNegative = input&lt;boolean&gt;(false);

  trendColorClass() {
    return this.isNegative()
      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400'
      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400';
  }
}</code></pre>

                <p>
                    Now let us assemble the parent <code>DashboardViewComponent</code> featuring lazy routing, real-time filtering, search bars, and tabular freight displays:
                </p>

                <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs font-mono my-3 border border-slate-800 leading-relaxed"><code class="language-typescript">// src/app/components/dashboard-view.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardStateService } from '../services/dashboard-state.service';
import { MetricCardComponent } from './metric-card.component';

@Component({
  selector: 'app-dashboard-view',
  standalone: true,
  imports: [CommonModule, FormsModule, MetricCardComponent],
  template: \`
    &lt;div class="max-w-6xl mx-auto p-6 space-y-6 font-sans text-slate-900 dark:text-slate-100"&gt;
      &lt;div class="flex flex-col md:flex-row md:items-center justify-between gap-4"&gt;
        &lt;div&gt;
          &lt;h1 class="text-2xl md:text-3xl font-black"&gt;Apex Logistics Fleet Command&lt;/h1&gt;
          &lt;p class="text-xs md:text-sm text-slate-500"&gt;Live interstate tracking and freight revenue analytics&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="flex items-center gap-3"&gt;
          &lt;input
            type="search"
            [ngModel]="state.searchQuery()"
            (ngModelChange)="state.setSearch($event)"
            placeholder="Search tracking or destination..."
            class="p-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-xs bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
          /&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      &lt;!-- Metric Cards Grid with Signal Inputs --&gt;
      &lt;div class="grid grid-cols-1 sm:grid-cols-3 gap-4"&gt;
        &lt;app-metric-card
          title="Total Active Freight"
          [value]="'\\$' + (state.totalRevenue() | number:'1.2-2')"
          subtitle="Net contract revenue"
          trendText="+12.4% vs last week"
        /&gt;
        &lt;app-metric-card
          title="Shipments in Transit"
          [value]="state.filteredShipments().length.toString()"
          subtitle="Active fleet trailers"
          trendText="On Schedule"
        /&gt;
        &lt;app-metric-card
          title="Critical Transit Delays"
          [value]="state.delayedCount().toString()"
          subtitle="Requires dispatcher action"
          trendText="Weather alert"
          [isNegative]="true"
        /&gt;
      &lt;/div&gt;

      &lt;!-- Filter Pills --&gt;
      &lt;div class="flex gap-2"&gt;
        &lt;button
          *ngFor="let tab of ['ALL', 'IN_TRANSIT', 'DELAYED', 'DELIVERED']"
          (click)="state.setFilter(tab)"
          [class.bg-red-600]="state.activeFilter() === tab"
          [class.text-white]="state.activeFilter() === tab"
          class="px-4 py-1.5 rounded-full text-xs font-bold border border-slate-300 dark:border-slate-700 hover:border-red-500 transition-colors"
        &gt;
          {{ tab }}
        &lt;/button&gt;
      &lt;/div&gt;

      &lt;!-- Data Table --&gt;
      &lt;div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"&gt;
        &lt;table class="w-full text-xs text-left"&gt;
          &lt;thead class="bg-slate-50 dark:bg-slate-800/60 font-bold border-b border-slate-200 dark:border-slate-800"&gt;
            &lt;tr&gt;
              &lt;th class="p-3"&gt;Tracking #&lt;/th&gt;
              &lt;th class="p-3"&gt;Destination&lt;/th&gt;
              &lt;th class="p-3"&gt;Carrier&lt;/th&gt;
              &lt;th class="p-3"&gt;Status&lt;/th&gt;
              &lt;th class="p-3 text-right"&gt;Freight Total&lt;/th&gt;
            &lt;/tr&gt;
          &lt;/thead&gt;
          &lt;tbody class="divide-y divide-slate-100 dark:divide-slate-800"&gt;
            &lt;tr *ngFor="let item of state.filteredShipments()"&gt;
              &lt;td class="p-3 font-mono font-bold"&gt;{{ item.trackingNumber }}&lt;/td&gt;
              &lt;td class="p-3"&gt;{{ item.destination }}&lt;/td&gt;
              &lt;td class="p-3"&gt;{{ item.carrier }}&lt;/td&gt;
              &lt;td class="p-3 font-semibold" [ngClass]="{
                'text-emerald-600': item.status === 'DELIVERED',
                'text-amber-600': item.status === 'IN_TRANSIT',
                'text-rose-600': item.status === 'DELAYED'
              }"&gt;{{ item.status }}&lt;/td&gt;
              &lt;td class="p-3 text-right font-bold"&gt;\\\${{ item.freightFee + item.fuelSurcharge | number:'1.2-2' }}&lt;/td&gt;
            &lt;/tr&gt;
          &lt;/tbody&gt;
        &lt;/table&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  \`
})
export class DashboardViewComponent {
  readonly state = inject(DashboardStateService);
}</code></pre>

                <p>
                    Finally, configure lazy loading in your router configuration using modern dynamic <code>import()</code> statements:
                </p>

                <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs font-mono my-3 border border-slate-800 leading-relaxed"><code class="language-typescript">// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'analytics',
    pathMatch: 'full'
  },
  {
    path: 'analytics',
    loadComponent: () => import('./components/dashboard-view.component').then(m => m.DashboardViewComponent),
    title: 'Fleet Analytics | Apex Logistics'
  }
];</code></pre>
            </div>
        </section>

        <!-- 05. Testing Signals Component -->
        <section id="testing-signals-component" class="scroll-mt-32">
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-3 dark:border-gray-800">
                05. Unit Testing Standalone Components & HTTP Services
            </h2>
            <div class="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                    Because signals execute synchronously, testing them with Angular's <code>TestBed</code> is remarkably straightforward and fast. There is no need for fakeAsync tick timers or marble diagrams. Here is a complete unit test suite verifying component rendering and signal state mutations:
                </p>

                <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs font-mono my-3 border border-slate-800 leading-relaxed"><code class="language-typescript">// src/app/components/dashboard-view.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardViewComponent } from './dashboard-view.component';
import { DashboardStateService } from '../services/dashboard-state.service';

describe('DashboardViewComponent Signal State', () => {
  let component: DashboardViewComponent;
  let fixture: ComponentFixture&lt;DashboardViewComponent&gt;;
  let stateService: DashboardStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardViewComponent],
      providers: [DashboardStateService]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardViewComponent);
    component = fixture.componentInstance;
    stateService = TestBed.inject(DashboardStateService);
    fixture.detectChanges();
  });

  it('renders initial list of shipments matching ALL filter', () => {
    expect(component.state.filteredShipments().length).toBe(4);
  });

  it('filters shipments reactively when DELAYED status is selected', () => {
    stateService.setFilter('DELAYED');
    fixture.detectChanges();

    const filtered = component.state.filteredShipments();
    expect(filtered.length).toBe(1);
    expect(filtered[0].trackingNumber).toBe('APX-902');
  });

  it('calculates total revenue correctly across active items', () => {
    stateService.setFilter('DELAYED');
    fixture.detectChanges();

    // APX-902: 2200 + 260 = 2460
    expect(component.state.totalRevenue()).toBe(2460);
  });
});</code></pre>

                <p>
                    Next, we test the HTTP service resilience using Angular's <code>HttpTestingController</code> from <code>@angular/common/http/testing</code> to guarantee that unexpected network errors trigger graceful fallbacks rather than crashing the client dashboard:
                </p>

                <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs font-mono my-3 border border-slate-800 leading-relaxed"><code class="language-typescript">// src/app/services/freight-api.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { FreightApiService } from './freight-api.service';

describe('FreightApiService Network Layer', () => {
  let service: FreightApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FreightApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(FreightApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('gracefully handles backend 500 error and initializes signal with fallback empty array', () => {
    const req = httpMock.expectOne('https://api.apexlogistics.example/v1/shipments');
    expect(req.request.method).toBe('GET');

    // Simulate server crash response
    req.flush('Internal Server Error', { status: 500, statusText: 'Server Error' });

    // Verify signal state recovered safely
    expect(service.remoteShipments()).toEqual([]);
  });
});</code></pre>
            </div>
        </section>

        <!-- 06. Deployment Checklist & Handover -->
        <section id="client-deployment-handover" class="scroll-mt-32">
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-3 dark:border-gray-800">
                06. Production Build Optimization & Client Delivery Runbook
            </h2>
            <div class="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                    Delivering an enterprise dashboard requires a structured delivery runbook that allows the client's internal IT department to deploy and maintain the application with zero ambiguity. Enterprise clients value predictable delivery documentation as much as the code itself.
                </p>

                <p>
                    Below is the turnkey multi-stage <code>Dockerfile</code> and Nginx configuration you provide to the client's DevOps engineers:
                </p>

                <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs font-mono my-3 border border-slate-800 leading-relaxed"><code class="language-dockerfile"># Stage 1: Build Angular application using Node.js LTS
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve optimized static assets via unprivileged Nginx
FROM nginx:1.25-alpine
COPY --from=builder /app/dist/apex-logistics/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Healthcheck to support Kubernetes and cloud container orchestration
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]</code></pre>

                <p>
                    Ensure your Nginx configuration includes HTML5 pushState routing fallbacks so that direct URL bookmarks do not return HTTP 404 errors:
                </p>

                <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs font-mono my-3 border border-slate-800 leading-relaxed"><code class="language-nginx"># nginx.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression for high-throughput enterprise networks
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1000;

    location / {
        # Fall back to index.html for client-side routing
        try_files $uri $uri/ /index.html;
    }

    # Cache immutable static assets for 1 year
    location ~* \.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|ttf|svg)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}</code></pre>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                    <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h4 class="font-bold text-gray-900 dark:text-white text-sm">1. Production Build & Tree Shaking</h4>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Run <code>ng build --configuration production</code> using the modern esbuild/Vite application builder to emit minified JavaScript bundles with differential chunking.</p>
                    </div>
                    <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h4 class="font-bold text-gray-900 dark:text-white text-sm">2. Nginx Docker Containerization</h4>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Deliver a multi-stage <code>Dockerfile</code> that compiles the Angular app in a Node environment and serves static assets via an Alpine Nginx image with gzip/brotli compression.</p>
                    </div>
                    <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h4 class="font-bold text-gray-900 dark:text-white text-sm">3. Environment Configuration Injection</h4>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Configure runtime API base URLs via a dynamic <code>assets/config.json</code> file so the client can swap staging and production backend domains without rebuilding the container.</p>
                    </div>
                    <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h4 class="font-bold text-gray-900 dark:text-white text-sm">4. Architecture Runbook & Code Walkthrough</h4>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Provide 2 hours of recorded video code reviews explaining signal store patterns, component boundaries, and unit test execution for their in-house staff.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 07. Author Support & Consulting CTA -->
        <section id="angular-consulting-support" class="scroll-mt-32">
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-3 dark:border-gray-800">
                07. Senior Angular Consulting & Architecture
            </h2>
            <div class="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                    Modern Angular gives engineering teams enterprise-grade type safety, predictable signal state management, and unparalleled maintenance longevity. By delivering clean standalone components and automated unit test suites, your freelance practice earns the trust of enterprise clients and commands high-value consulting contracts.
                </p>
                <p class="italic text-xs md:text-sm text-slate-600 dark:text-slate-400 border-l-4 border-red-500 pl-4 py-1">
                    Disclosure: I build modern Angular dashboards and provide architecture consulting at OutlineDev, but the techniques and code in this guide apply universally to any freelance client engagement.
                </p>
            </div>
        </section>

        <!-- Footer Call-to-Action -->
        <footer class="border-t pt-8 mt-12 dark:border-gray-800">
            <div class="bg-gradient-to-r from-red-500/10 to-rose-500/10 p-6 md:p-8 rounded-2xl border border-red-200 dark:border-red-900/30">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Need a Senior Angular Engineer for an Enterprise Dashboard?</h3>
                <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    Whether you are building a real-time logistics portal or modernizing legacy NgModules to modern Signals, schedule an intro call to review your architecture and sprint roadmap.
                </p>
                <div class="flex flex-wrap items-center gap-4">
                    <a href="/hire/angular-developer" class="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-colors">
                        Hire an Experienced Angular Developer
                    </a>
                    <a href="/mentors/angular-mentors-in-online" class="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400">
                        Explore 1-on-1 Angular Mentorship &rarr;
                    </a>
                </div>
            </div>
        </footer>

    </div>
`
};
