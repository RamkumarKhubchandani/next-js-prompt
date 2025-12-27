'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useState, useEffect } from 'react'

export function ThemeProvider({ children }) {
  // next-themes handles hydration mismatch by injecting a script in <head>.
  // We should NOT conditionally render the provider based on mount, 
  // as that prevents the script from running and breaks useTheme context for children during SSR/hydration.
  return <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>{children}</NextThemesProvider>
}
