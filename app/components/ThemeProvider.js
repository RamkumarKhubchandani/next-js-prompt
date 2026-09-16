'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useState, useEffect } from 'react'

export function ThemeProvider({ children }) {
  // next-themes handles hydration mismatch by injecting a script in <head>.
  // Defaulting to clean, accessible light mode across all browsers.
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="light" 
      enableSystem={false}
      storageKey="theme"
    >
      {children}
    </NextThemesProvider>
  )
}
