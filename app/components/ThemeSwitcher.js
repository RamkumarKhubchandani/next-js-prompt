'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Render a placeholder to avoid hydration mismatch
    return <div className="w-[70px] h-[34px]" />;
  }

  const currentTheme = resolvedTheme || theme || 'light';

  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      type="button"
      aria-label="Toggle Theme"
      className="relative w-[70px] h-[34px] bg-light-200/80 dark:bg-dark-700 rounded-full flex items-center p-1 cursor-pointer border border-dark-700/10 dark:border-dark-700 focus:outline-none"
      onClick={toggleTheme}
    >
      <div className="flex justify-between w-full px-1">
        <Sun size={18} className="text-yellow-500" />
        <Moon size={18} className="text-blue-400" />
      </div>
      <motion.div
        className="w-[26px] h-[26px] bg-white dark:bg-dark-900 rounded-full absolute shadow-md"
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        style={{
          left: currentTheme === 'light' ? '4px' : 'auto',
          right: currentTheme === 'dark' ? '4px' : 'auto',
        }}
      />
    </button>
  )
}
