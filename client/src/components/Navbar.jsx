import React, { useState, useEffect } from 'react'
import Logo from '../assets/Logo.png'
import { Menu, X, Moon, Sun } from 'lucide-react'

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [darkMode, setDarkMode] = useState(() => {
        // Vérifier la préférence utilisateur au chargement
        return localStorage.getItem('darkMode') === 'true'
    })

    useEffect(() => {
        // Appliquer le mode sombre au document
        if (darkMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('darkMode', 'true')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('darkMode', 'false')
        }
    }, [darkMode])

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-900/95 dark:border-gray-700 px-4 lg:px-0'>
            <div className='max-w-7xl mx-auto flex h-14 items-center'>
                <div className='md:mr-4 flex justify-between w-full'>
                    <a href="#" className='mr-6 flex items-center space-x-2'>
                        <img src={Logo} alt="" className='w-16' />
                    </a>
                    <nav className='md:flex hidden items-center space-x-6 text-lg font-medium'>
                        <a href="#about" className='transition-colors hover:text-foreground/80 text-foreground/60 dark:text-gray-300 dark:hover:text-white'>About</a>
                        <a href="#projects" className='transition-colors hover:text-foreground/80 text-foreground/60 dark:text-gray-300 dark:hover:text-white'>Projects</a>
                        <a href="#testimonials" className='transition-colors hover:text-foreground/80 text-foreground/60 dark:text-gray-300 dark:hover:text-white'>Testimonials</a>
                        <a href="#contact" className='transition-colors hover:text-foreground/80 text-foreground/60 dark:text-gray-300 dark:hover:text-white'>Contact</a>
                    </nav>
                </div>
                <div className='flex items-center gap-4'>
                    <button 
                        onClick={toggleDarkMode}
                        className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'>
                        {darkMode ? (
                            <Sun className='h-5 w-5 text-yellow-400' />
                        ) : (
                            <Moon className='h-5 w-5 text-gray-600' />
                        )}
                    </button>
                    <button 
                        className='inline-flex items-center justify-center rounded-md md:hidden'
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <span className='sr-only'>Open main menu</span>
                        {mobileMenuOpen ? (
                            <X className='h-6 w-6 dark:text-white' />
                        ) : (
                            <Menu className='h-6 w-6 dark:text-white' />
                        )}
                    </button>
                </div>
            </div>
            {mobileMenuOpen && (
                <div className='md:hidden dark:bg-gray-800'>
                    <div className='space-y-1 px-2 pb-3 pt-2'>
                        <a href="#about" className='block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700'>About</a>
                        <a href="#projects" className='block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700'>Project</a>
                        <a href="#testimonials" className='block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700'>Testimonials</a>
                        <a href="#contact" className='block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700'>Contact</a>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Navbar