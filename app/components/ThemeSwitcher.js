'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Render a placeholder or nothing to avoid hydration mismatch
    return <div className="w-[70px] h-[34px]" />;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div 
      className="w-[70px] h-[34px] bg-dark-700 dark:bg-dark-800 rounded-full flex items-center p-1 cursor-pointer"
      onClick={toggleTheme}
    >
      <div className="flex justify-between w-full px-1">
        <Sun size={18} className="text-yellow-400" />
        <Moon size={18} className="text-blue-300" />
      </div>
      <motion.div
        className="w-[26px] h-[26px] bg-light-100 rounded-full absolute"
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        style={{
          left: theme === 'light' ? '4px' : 'auto',
          right: theme === 'dark' ? '4px' : 'auto',
        }}
      />
    </div>
  )
}
