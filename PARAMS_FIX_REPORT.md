# 🐛 BUILD FIX: PARAMS UNWRAPPING

## 🚨 The Issue
Next.js 15 changed how `params` are passed to pages. They are now **Promises** instead of direct objects. Accessing `params.slug` directly causes a warning/error because the promise hasn't resolved yet.

## ✅ The Fix
I updated `app/events/[slug]/page.js` to correctly handle the `params` promise using `React.use()`.

**Code Change:**

```javascript
// Before
export default function EventDetailPage({ params }) {
    const event = eventsData.find(e => e.slug === params.slug);
    ...

// After
import React, { useState, use } from 'react'; // Added 'use' import

export default function EventDetailPage({ params }) {
    const { slug } = use(params); // Unwrapped the promise
    const event = eventsData.find(e => e.slug === slug);
    ...
```

## 🔄 Verification
Refresh the page. The console error should be gone.
