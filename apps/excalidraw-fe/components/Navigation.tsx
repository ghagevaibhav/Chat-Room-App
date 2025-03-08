"use client";
import React, { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import Link from 'next/link';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-10',
        {
          'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm': isScrolled,
          'bg-transparent': !isScrolled,
        }
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-6">
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-app-blue to-app-purple bg-clip-text text-transparent">
              Canvas<span className="font-light">Flow</span>
            </h1>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-sm font-medium hover:text-app-blue transition-colors">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-app-blue transition-colors">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-app-blue transition-colors">
              Pricing
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Link href="/signin">
            <Button variant="ghost" className="text-sm font-medium px-5 transition-all hover:bg-app-blue/10 hover:text-app-blue">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="text-sm font-medium px-5 bg-app-blue hover:bg-app-blue/90 transition-all">
              Sign Up
            </Button>
          </Link>
        </div>

        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <button onClick={toggleMobileMenu} className="ml-4">
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground transition-transform duration-300" />
            ) : (
              <Menu className="h-6 w-6 text-foreground transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 top-16 bg-white dark:bg-gray-900 z-40 transform transition-transform duration-300 ease-in-out md:hidden',
          {
            'translate-x-0 opacity-100': isMobileMenuOpen,
            'translate-x-full opacity-0': !isMobileMenuOpen,
          }
        )}
      >
        <div className="flex flex-col p-6 space-y-6">
          <Link 
            href="#features" 
            className="text-lg font-medium hover:text-app-blue transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </Link>
          <Link 
            href="#testimonials" 
            className="text-lg font-medium hover:text-app-blue transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Testimonials
          </Link>
          <Link 
            href="#pricing" 
            className="text-lg font-medium hover:text-app-blue transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Pricing
          </Link>
          <div className="pt-6 border-t border-gray-100">
            <Link 
              href="/signin" 
              className="block mb-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button variant="ghost" className="w-full justify-center text-base">
                Sign In
              </Button>
            </Link>
            <Link 
              href="/signup"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button className="w-full justify-center text-base bg-app-blue hover:bg-app-blue/90">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;