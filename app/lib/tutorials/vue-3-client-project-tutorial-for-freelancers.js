export const vue3ClientProjectTutorialForFreelancers = {
    title: "Vue 3 Client Project Tutorial for Freelance Developers",
    description: "Build an end-to-end client appointment booking app in Vue 3, Vite, and Pinia with form validation, accessibility, scoping briefs, and client handovers.",
    slug: "vue-3-client-project-tutorial-for-freelancers",
    publishedAt: "2026-11-13T10:30:00+05:30",
    type: "static",
    author: "Ramkumar Khubchandani",
    createdAt: "2026-11-13T10:30:00+05:30",
    readTime: "18 min read",
    difficulty: "Intermediate to Advanced",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2560&auto=format&fit=crop",
    tags: ["Vue.js", "Vue 3", "Vite", "Pinia", "Freelancing", "Client Projects", "Accessibility"],
    keywords: [
        "vue 3 client project tutorial for freelancers",
        "vue 3 tutorial for freelancers",
        "build client appointment app vue 3",
        "vue 3 pinia vite tutorial",
        "vue 3 accessible form validation",
        "freelance frontend project handover",
        "vuejs client development guide"
    ],
    primaryCta: {
        label: "Hire Vue.js Developer",
        href: "/hire/vuejs-developer"
    },
    relatedPosts: [
        "how-to-hire-a-vuejs-consultant",
        "svelte-5-interview-questions",
        "react-vs-signals"
    ],
    toc: [
        { id: "project-scoping-setup", label: "01. Scoping the Client Brief & Initial Vite + Vue 3 Setup" },
        { id: "pinia-state-model", label: "02. Pinia Store: Reactive Booking State & Validation Engine" },
        { id: "appointment-form-component", label: "03. Building the Accessible Appointment Form Component" },
        { id: "api-integration-submission", label: "04. API Integration, Error Handling & Confirmation Screen" },
        { id: "accessibility-audit", label: "05. Keyboard Accessibility & Screen-Reader Verification" },
        { id: "deployment-handover-checklist", label: "06. Production Deployment & Client Handover Deliverables" },
        { id: "freelance-vue-consulting", label: "07. Professional Vue.js Client Development" }
    ],
    content: `
    <div class="space-y-12 font-sans text-gray-800 dark:text-gray-200">
        
        <header class="border-l-8 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 pl-8 py-6 mb-8 rounded-r-2xl shadow-sm">
            <h1 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight mb-3">
                Vue 3 Client Project Tutorial: Build and Hand Over a Production Booking App
            </h1>
            <p class="text-base text-emerald-900 dark:text-emerald-200 font-light leading-relaxed">
                As a freelance developer, building client websites is only half the battle. Delivering a project that earns repeat business and five-star reviews requires disciplined scoping, modular Single File Components (SFCs), reactive state management with Pinia, strict WCAG accessibility standards, and a turnkey client handover runbook. In this complete end-to-end tutorial, we will build <strong>Lumina Wellness Studio</strong>, a production appointment request and consultation booking application built with Vue 3, Vite, and Pinia. Explore our <a href="/hire/vuejs-developer" class="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline">freelance Vue.js consultants</a> and 1-on-1 <a href="/mentors/vue-mentors-in-online" class="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline">online Vue.js mentors</a>.
            </p>
        </header>

        <!-- 01. Scoping & Setup -->
        <section id="project-scoping-setup" class="scroll-mt-32">
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-3 dark:border-gray-800">
                01. Scoping the Client Brief & Initial Vite + Vue 3 Setup
            </h2>
            <div class="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                    Before installing npm packages or opening VS Code, successful freelancers lock in the project scope in writing. Scope creep—unplanned requests for custom payment gateways, multi-calendar synchronization, or customer dashboards—is the number one reason freelance projects run late and unprofitable.
                </p>

                <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm my-4">
                    <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">The Client Brief: Lumina Wellness Studio</h3>
                    <p class="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3">
                        The client runs an upscale wellness and physical therapy studio in Manhattan. They need a fast, mobile-friendly appointment booking portal where patients choose treatment packages, select appointment slots, calculate deposits, and receive instant confirmation without waiting on phone calls.
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                        <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40">
                            <span class="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">In-Scope Deliverables</span>
                            <ul class="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                                <li>Treatment selection card grid (Physical Therapy, Acupuncture, Sports Massage).</li>
                                <li>Interactive calendar date picker with weekend surge calculations.</li>
                                <li>Validated appointment form with ARIA accessibility tags.</li>
                                <li>Asynchronous mock API submission with simulated network delay.</li>
                                <li>Printable/shareable booking confirmation modal.</li>
                            </ul>
                        </div>
                        <div class="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40">
                            <span class="font-bold text-rose-800 dark:text-rose-300 block mb-1">Explicitly Out-of-Scope</span>
                            <ul class="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                                <li>Credit card merchant processing (deposits paid via clinic reception).</li>
                                <li>User login portals or patient medical history vaults.</li>
                                <li>Automated two-way Google Calendar synchronization.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="my-6">
                    <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Freelance Estimation & Milestone Framework</h3>
                    <p class="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3">
                        When pitching a small business client, present your estimate broken down by component milestones rather than quoting a vague single lump sum. This transparent breakdown establishes credibility. If you are advising clients transitioning from legacy codebases or deciding between agency retainers versus solo specialists, refer to our strategic guide on <a href="/blogs/how-to-hire-a-vuejs-consultant" class="text-emerald-700 dark:text-emerald-400 font-semibold underline">hiring a Vue.js consultant</a>:
                    </p>
                    <div class="overflow-x-auto">
                        <table class="w-full text-xs text-left border-collapse border border-slate-200 dark:border-slate-800">
                            <thead class="bg-slate-100 dark:bg-slate-900 font-bold text-slate-900 dark:text-white">
                                <tr>
                                    <th class="p-3 border border-slate-200 dark:border-slate-800">Sprint Phase</th>
                                    <th class="p-3 border border-slate-200 dark:border-slate-800">Key Deliverables</th>
                                    <th class="p-3 border border-slate-200 dark:border-slate-800">Estimated Effort</th>
                                    <th class="p-3 border border-slate-200 dark:border-slate-800">Client Sign-Off Criteria</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                                <tr>
                                    <td class="p-3 font-semibold">1. UI Design & Scaffolding</td>
                                    <td class="p-3">Vite setup, Tailwind CSS theme matching client branding, mobile layout</td>
                                    <td class="p-3">8–12 hours</td>
                                    <td class="p-3">Client approves staging preview on mobile and desktop browsers</td>
                                </tr>
                                <tr>
                                    <td class="p-3 font-semibold">2. State & Dynamic Pricing</td>
                                    <td class="p-3">Pinia booking store, weekend surcharges, deposit calculations</td>
                                    <td class="p-3">10–14 hours</td>
                                    <td class="p-3">Passing unit tests for all pricing tiers and weekend dates</td>
                                </tr>
                                <tr>
                                    <td class="p-3 font-semibold">3. Form Validation & API</td>
                                    <td class="p-3">Accessible form inputs, error handling, mock API submission webhook</td>
                                    <td class="p-3">8–12 hours</td>
                                    <td class="p-3">Form correctly rejects invalid inputs and emits webhook payloads</td>
                                </tr>
                                <tr>
                                    <td class="p-3 font-semibold">4. QA, Deployment & Handover</td>
                                    <td class="p-3">Lighthouse audit, Vercel/Netlify hosting, custom domain SSL, runbook</td>
                                    <td class="p-3">6–8 hours</td>
                                    <td class="p-3">100% Core Web Vitals score, final DNS pointing, Loom recording delivered</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p>
                    We initialize the application using modern Vite tooling according to <a href="https://vuejs.org/guide/scaling-up/sfc.html" target="_blank" rel="noopener noreferrer" class="text-emerald-600 dark:text-emerald-400 font-semibold underline">official Vue.js SFC standards</a>:
                </p>
                <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs font-mono my-3 border border-slate-800 leading-relaxed"><code class="language-bash"># Initialize modern Vue 3 project with Vite
npm create vite@latest lumina-booking-app -- --template vue
cd lumina-booking-app

# Install state management
npm install pinia

# Run development server
npm run dev</code></pre>
            </div>
        </section>

        <!-- 02. Pinia State Model -->
        <section id="pinia-state-model" class="scroll-mt-32">
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-3 dark:border-gray-800">
                02. Pinia Store: Reactive Booking State & Validation Engine
            </h2>
            <div class="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                    Rather than scattering form state across separate component local scopes, we centralize our business logic inside a clean <a href="https://pinia.vuejs.org/core-concepts" target="_blank" rel="noopener noreferrer" class="text-emerald-600 dark:text-emerald-400 font-semibold underline">Pinia setup store</a> (<code>src/stores/booking.js</code>). This ensures that pricing formulas, selected appointment dates, and error states remain synchronized and testable. For a deep comparison of Vue's fine-grained dependency tracking versus other state paradigms, explore our analysis of <a href="/blogs/react-vs-signals" class="text-emerald-700 dark:text-emerald-400 font-semibold underline">React vs Signals reactivity</a>.
                </p>

                <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs font-mono my-3 border border-slate-800 leading-relaxed"><code class="language-javascript">// src/stores/booking.js - Reactive Booking State Machine
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useBookingStore = defineStore('booking', () => {
  // Available Service Packages
  const services = ref([
    { id: 'physio', name: 'Physical Therapy Assessment', duration: '60 min', basePrice: 180 },
    { id: 'acupuncture', name: 'Targeted Acupuncture & Dry Needling', duration: '45 min', basePrice: 140 },
    { id: 'massage', name: 'Deep Tissue Recovery Massage', duration: '60 min', basePrice: 160 }
  ]);

  // Selected state
  const selectedServiceId = ref('physio');
  const appointmentDate = ref('');
  const clientName = ref('');
  const clientEmail = ref('');
  const clientPhone = ref('');
  const notes = ref('');

  // Status flags
  const isSubmitting = ref(false);
  const submissionError = ref(null);
  const confirmedBooking = ref(null);

  // Computed: Selected Service Object
  const currentService = computed(() => {
    return services.value.find(s => s.id === selectedServiceId.value) || services.value[0];
  });

  // Computed: Price Calculation with Weekend Surcharge (10%)
  const pricingQuote = computed(() => {
    const base = currentService.value.basePrice;
    if (!appointmentDate.value) {
      return { basePrice: base, surcharge: 0, finalPrice: base, depositRequired: Math.round(base * 0.25) };
    }

    const dateObj = new Date(appointmentDate.value);
    const day = dateObj.getUTCDay();
    const isWeekend = day === 0 || day === 6;
    const surcharge = isWeekend ? Math.round(base * 0.10) : 0;
    const finalPrice = base + surcharge;
    const depositRequired = Math.round(finalPrice * 0.25);

    return {
      basePrice: base,
      surcharge,
      isWeekend,
      finalPrice,
      depositRequired
    };
  });

  // Action: Submit Appointment
  async function submitAppointment() {
    isSubmitting.value = true;
    submissionError.value = null;

    try {
      // Simulate real-world asynchronous API POST request
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock confirmation payload
      confirmedBooking.value = {
        confirmationCode: 'LUM-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        serviceName: currentService.value.name,
        date: appointmentDate.value,
        clientName: clientName.value.trim(),
        clientEmail: clientEmail.value.trim(),
        depositAmount: pricingQuote.value.depositRequired,
        createdAt: new Date().toISOString()
      };

      return true;
    } catch (err) {
      submissionError.value = 'Failed to submit appointment. Please verify your connection.';
      return false;
    } finally {
      isSubmitting.value = false;
    }
  }

  function resetForm() {
    confirmedBooking.value = null;
    appointmentDate.value = '';
    clientName.value = '';
    clientEmail.value = '';
    clientPhone.value = '';
    notes.value = '';
  }

  return {
    services,
    selectedServiceId,
    appointmentDate,
    clientName,
    clientEmail,
    clientPhone,
    notes,
    isSubmitting,
    submissionError,
    confirmedBooking,
    currentService,
    pricingQuote,
    submitAppointment,
    resetForm
  };
});</code></pre>
            </div>
        </section>

        <!-- 03. Form Component -->
        <section id="appointment-form-component" class="scroll-mt-32">
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-3 dark:border-gray-800">
                03. Building the Accessible Appointment Form Component
            </h2>
            <div class="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                    Next, we construct <code>src/components/BookingForm.vue</code> using Vue 3's <code>&lt;script setup&gt;</code> syntax. This component features live input validation, ARIA labels for accessibility, and dynamic price previews:
                </p>

                <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs font-mono my-3 border border-slate-800 leading-relaxed"><code class="language-html">&lt;!-- src/components/BookingForm.vue --&gt;
&lt;script setup&gt;
import { ref } from 'vue';
import { useBookingStore } from '@/stores/booking';

const store = useBookingStore();
const errors = ref({});

function validateInputs() {
  const errs = {};
  if (!store.clientName || store.clientName.trim().length &lt; 2) {
    errs.clientName = 'Please enter your full name (minimum 2 characters).';
  }
  if (!store.clientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.clientEmail)) {
    errs.clientEmail = 'Please provide a valid email address for confirmation.';
  }
  if (!store.appointmentDate) {
    errs.appointmentDate = 'Please select a preferred appointment date.';
  }
  errors.value = errs;
  return Object.keys(errs).length === 0;
}

async function handleSubmit() {
  if (!validateInputs()) return;
  await store.submitAppointment();
}
&lt;/script&gt;

&lt;template&gt;
  &lt;form @submit.prevent="handleSubmit" novalidate class="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"&gt;
    &lt;h2 class="text-xl font-bold text-slate-900 dark:text-white"&gt;Book Your Treatment&lt;/h2&gt;

    &lt;!-- Service Selection --&gt;
    &lt;div&gt;
      &lt;label for="service-select" class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"&gt;
        Select Treatment Package
      &lt;/label&gt;
      &lt;select id="service-select" v-model="store.selectedServiceId" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"&gt;
        &lt;option v-for="s in store.services" :key="s.id" :value="s.id"&gt;
          {{ s.name }} ({{ s.duration }}) - \${{ s.basePrice }}
        &lt;/option&gt;
      &lt;/select&gt;
    &lt;/div&gt;

    &lt;!-- Date Picker --&gt;
    &lt;div&gt;
      &lt;label for="booking-date" class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"&gt;
        Appointment Date
      &lt;/label&gt;
      &lt;input
        id="booking-date"
        type="date"
        v-model="store.appointmentDate"
        aria-describedby="date-error"
        :aria-invalid="Boolean(errors.appointmentDate)"
        class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
      /&gt;
      &lt;p v-if="errors.appointmentDate" id="date-error" class="text-xs text-rose-600 dark:text-rose-400 mt-1"&gt;
        {{ errors.appointmentDate }}
      &lt;/p&gt;
    &lt;/div&gt;

    &lt;!-- Dynamic Pricing Summary Card --&gt;
    &lt;div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5"&gt;
      &lt;div class="flex justify-between"&gt;
        &lt;span class="text-slate-600 dark:text-slate-400"&gt;Base Package Fee:&lt;/span&gt;
        &lt;span class="font-bold text-slate-900 dark:text-white"&gt;\${{ store.pricingQuote.basePrice }}&lt;/span&gt;
      &lt;/div&gt;
      &lt;div v-if="store.pricingQuote.isWeekend" class="flex justify-between text-amber-600 dark:text-amber-400"&gt;
        &lt;span&gt;Weekend Surcharge (+10%):&lt;/span&gt;
        &lt;span class="font-bold"&gt;+\${{ store.pricingQuote.surcharge }}&lt;/span&gt;
      &lt;/div&gt;
      &lt;div class="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-1.5 font-bold text-sm text-slate-900 dark:text-white"&gt;
        &lt;span&gt;Total Service Fee:&lt;/span&gt;
        &lt;span&gt;\${{ store.pricingQuote.finalPrice }}&lt;/span&gt;
      &lt;/div&gt;
      &lt;div class="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold pt-1"&gt;
        &lt;span&gt;25% Deposit Required at Reception:&lt;/span&gt;
        &lt;span&gt;\${{ store.pricingQuote.depositRequired }}&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;

    &lt;!-- Contact Fields --&gt;
    &lt;div class="grid grid-cols-1 md:grid-cols-2 gap-4"&gt;
      &lt;div&gt;
        &lt;label for="client-name" class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1"&gt;Your Name&lt;/label&gt;
        &lt;input id="client-name" type="text" v-model="store.clientName" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm" placeholder="Alice Smith" /&gt;
        &lt;p v-if="errors.clientName" class="text-xs text-rose-600 mt-1"&gt;{{ errors.clientName }}&lt;/p&gt;
      &lt;/div&gt;
      &lt;div&gt;
        &lt;label for="client-email" class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1"&gt;Email Address&lt;/label&gt;
        &lt;input id="client-email" type="email" v-model="store.clientEmail" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm" placeholder="alice@example.com" /&gt;
        &lt;p v-if="errors.clientEmail" class="text-xs text-rose-600 mt-1"&gt;{{ errors.clientEmail }}&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;

    &lt;!-- Submit Button --&gt;
    &lt;button type="submit" :disabled="store.isSubmitting" class="w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold text-sm shadow-md transition-colors"&gt;
      &lt;span v-if="store.isSubmitting"&gt;Submitting Reservation...&lt;/span&gt;
      &lt;span v-else&gt;Confirm Appointment Request&lt;/span&gt;
    &lt;/button&gt;
  &lt;/form&gt;
&lt;/template&gt;</code></pre>
            </div>
        </section>

        <!-- 04. API Integration & Confirmation -->
        <section id="api-integration-submission" class="scroll-mt-32">
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-3 dark:border-gray-800">
                04. API Integration, Error Handling & Confirmation Screen
            </h2>
            <div class="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                    When the appointment form completes successfully, the application transitions to an accessible confirmation receipt modal displaying the generated booking reference code (<code>LUM-XXXXXX</code>) and instructions for the 25% reception deposit.
                </p>
                <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                    <div class="flex items-center gap-3">
                        <span class="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xl">✓</span>
                        <div>
                            <h3 class="text-base font-bold text-slate-900 dark:text-white">Booking Confirmed: LUM-798XA2</h3>
                            <p class="text-xs text-slate-500">Physical Therapy Assessment • Saturday, Nov 21, 2026</p>
                        </div>
                    </div>
                    <p class="text-xs md:text-sm text-slate-700 dark:text-slate-300">
                        A confirmation receipt has been sent to the patient's email. Reception receives the webhook immediately via the clinic's internal dispatch system, eliminating manual phone calls.
                    </p>
                </div>

                <h3 class="text-lg font-bold text-gray-900 dark:text-white mt-6">Confirmation Receipt Modal: BookingModal.vue</h3>
                <p>
                    Here is the accompanying modal component (<code>src/components/BookingModal.vue</code>) with focus trap support, keyboard escape dismissal, and print triggers:
                </p>
                <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs font-mono my-3 border border-slate-800 leading-relaxed"><code class="language-html">&lt;!-- src/components/BookingModal.vue --&gt;
&lt;script setup&gt;
import { onMounted, onUnmounted } from 'vue';
import { useBookingStore } from '@/stores/booking';

const store = useBookingStore();

function handleKeydown(e) {
  if (e.key === 'Escape') {
    store.resetForm();
  }
}

onMounted(() =&gt; {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() =&gt; {
  window.removeEventListener('keydown', handleKeydown);
});
&lt;/script&gt;

&lt;template&gt;
  &lt;div v-if="store.confirmedBooking" role="dialog" aria-modal="true" aria-labelledby="modal-title" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4"&gt;
    &lt;div class="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4"&gt;
      &lt;div class="flex items-center justify-between border-b pb-3 dark:border-slate-800"&gt;
        &lt;h3 id="modal-title" class="text-lg font-bold text-slate-900 dark:text-white"&gt;Appointment Request Received&lt;/h3&gt;
        &lt;button @click="store.resetForm()" aria-label="Close confirmation dialog" class="text-slate-500 hover:text-slate-900 dark:hover:text-white text-lg font-bold"&gt;✕&lt;/button&gt;
      &lt;/div&gt;

      &lt;div class="space-y-2 text-xs md:text-sm text-slate-700 dark:text-slate-300"&gt;
        &lt;p&gt;&lt;strong&gt;Confirmation Code:&lt;/strong&gt; &lt;span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold"&gt;{{ store.confirmedBooking.confirmationCode }}&lt;/span&gt;&lt;/p&gt;
        &lt;p&gt;&lt;strong&gt;Service:&lt;/strong&gt; {{ store.confirmedBooking.serviceName }}&lt;/p&gt;
        &lt;p&gt;&lt;strong&gt;Scheduled Date:&lt;/strong&gt; {{ store.confirmedBooking.date }}&lt;/p&gt;
        &lt;p&gt;&lt;strong&gt;Deposit Due on Arrival:&lt;/strong&gt; \${{ store.confirmedBooking.depositAmount }}&lt;/p&gt;
      &lt;/div&gt;

      &lt;div class="flex gap-3 pt-3"&gt;
        &lt;button onclick="window.print()" class="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"&gt;
          Print Receipt
        &lt;/button&gt;
        &lt;button @click="store.resetForm()" class="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white transition-colors"&gt;
          Done
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
            </div>
        </section>

        <!-- 05. Accessibility Audit -->
        <section id="accessibility-audit" class="scroll-mt-32">
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-3 dark:border-gray-800">
                05. Keyboard Accessibility & Screen-Reader Verification
            </h2>
            <div class="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                    Professional freelance deliverables must comply with standard WCAG 2.1 AA accessibility guidelines. Business clients are legally liable if their booking sites exclude disabled users. Implement these verification steps before client handover:
                </p>
                <ul class="list-disc pl-5 space-y-2 text-xs md:text-sm">
                    <li><strong>Full Keyboard Navigation:</strong> Press the <code>Tab</code> key from the top of the page to verify that all form inputs, select options, and submit buttons display visible focus rings.</li>
                    <li><strong>Programmatic Error Association:</strong> Use <code>aria-describedby="date-error"</code> so screen readers announce validation error messages when focus lands on an invalid field.</li>
                    <li><strong>Color Contrast Ratios:</strong> Verify that text colors maintain at least 4.5:1 contrast against light and dark background cards.</li>
                </ul>

                <div class="my-6">
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Automated Component Accessibility Test with Vitest</h3>
                    <p class="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Freelancers who include passing automated unit and accessibility tests stand out from competing bidders. Here is an automated test verifying our booking form's accessibility attributes using <code>@vue/test-utils</code>:
                    </p>
                    <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs font-mono border border-slate-800 leading-relaxed"><code class="language-javascript">// tests/BookingForm.spec.js - Automated A11y & Validation Test
import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import BookingForm from '@/components/BookingForm.vue';

describe('BookingForm.vue Accessibility & Validation', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders required accessible form controls with proper ARIA attributes', () => {
    const wrapper = mount(BookingForm);
    const dateInput = wrapper.find('input[type="date"]');

    expect(dateInput.exists()).toBe(true);
    expect(dateInput.attributes('id')).toBe('booking-date');
    expect(dateInput.attributes('aria-describedby')).toBe('date-error');
  });

  it('displays descriptive error messages when submitted with empty fields', async () => {
    const wrapper = mount(BookingForm);
    await wrapper.find('form').trigger('submit.prevent');

    const errorParagraph = wrapper.find('#date-error');
    expect(errorParagraph.exists()).toBe(true);
    expect(errorParagraph.text()).toContain('Please select a preferred appointment date');
  });
});</code></pre>
                </div>
            </div>
        </section>

        <!-- 06. Deployment Checklist & Handover -->
        <section id="deployment-handover-checklist" class="scroll-mt-32">
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-3 dark:border-gray-800">
                06. Production Deployment & Client Handover Deliverables
            </h2>
            <div class="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                    Never hand over a project by simply sending a raw zip file over email. High-earning freelancers deliver a professional handover package that builds client confidence and guarantees smooth production operation:
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                    <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h4 class="font-bold text-gray-900 dark:text-white text-sm">1. Production Build & Hosting</h4>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Deploy the static Vite build (<code>npm run build</code>) to Vercel, Netlify, or AWS CloudFront with custom domain DNS routing and automated SSL certificates.</p>
                    </div>
                    <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h4 class="font-bold text-gray-900 dark:text-white text-sm">2. 10-Minute Video Walkthrough</h4>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Record a Loom video walking the business owner through how appointments are submitted, how pricing rules are updated, and where confirmation webhooks arrive.</p>
                    </div>
                    <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h4 class="font-bold text-gray-900 dark:text-white text-sm">3. Maintenance Runbook (README)</h4>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Deliver a clear README documenting local setup, npm dependency updates, environment variables, and emergency contact procedures.</p>
                    </div>
                    <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h4 class="font-bold text-gray-900 dark:text-white text-sm">4. 30-Day Warranty Period</h4>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Provide a written 30-day bug fix guarantee covering any defects against the original scope document, giving the client total peace of mind.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 07. Author Support & Consulting CTA -->
        <section id="freelance-vue-consulting" class="scroll-mt-32">
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-3 dark:border-gray-800">
                07. Professional Vue.js Client Development
            </h2>
            <div class="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                    Building high-converting client applications with Vue 3 combines the speed of modern reactive stores with the simplicity of Single File Components. By combining disciplined scoping, accessible forms, and professional handover documentation, you position your freelance business as a trusted, high-value technology partner.
                </p>
                <p class="italic text-xs md:text-sm text-slate-600 dark:text-slate-400 border-l-4 border-emerald-500 pl-4 py-1">
                    Disclosure: I build Vue 3 applications and provide architecture consulting at OutlineDev, but this tutorial provides a universal blueprint you can use to deliver projects for your own freelance clients.
                </p>
            </div>
        </section>

        <!-- Footer Call-to-Action -->
        <footer class="border-t pt-8 mt-12 dark:border-gray-800">
            <div class="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-6 md:p-8 rounded-2xl border border-emerald-200 dark:border-emerald-900/30">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Need an Experienced Vue.js Developer for Your Client Build?</h3>
                <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    Whether you need a dedicated engineer to build an interactive client portal or an architect to audit your Vue 3 migration, schedule an intro call to review your project scope and milestones.
                </p>
                <div class="flex flex-wrap items-center gap-4">
                    <a href="/hire/vuejs-developer" class="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors">
                        Hire an Experienced Vue.js Developer
                    </a>
                    <a href="/mentors/vue-mentors-in-online" class="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">
                        Explore 1-on-1 Vue.js Mentorship &rarr;
                    </a>
                </div>
            </div>
        </footer>

    </div>
`
};
