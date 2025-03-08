"use client";

import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import DrawingCanvas from './DrawingCanvas';
import Link from 'next/link';

const Hero = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // dynamic background animation
    const animateBackground = () => {
      if (!bgRef.current) return;
      
      const colors = [
        'from-app-blue/20 to-app-purple/20',
        'from-app-pink/20 to-app-purple/20',
        'from-app-blue/20 to-app-pink/20',
        'from-app-indigo/20 to-app-blue/20',
        'from-app-purple/20 to-app-indigo/20'
      ];
      
      let colorIndex = 0;
      
      setInterval(() => {
        const topGradient = bgRef.current?.querySelector('.bg-gradient-top');
        const bottomGradient = bgRef.current?.querySelector('.bg-gradient-bottom');
        
        if (topGradient && bottomGradient) {
          // remove all color classes
          topGradient.className = topGradient.className.replace(/from-[^ ]+ to-[^ ]+/g, '');
          bottomGradient.className = bottomGradient.className.replace(/from-[^ ]+ to-[^ ]+/g, '');
          
          // add new color classes
          colorIndex = (colorIndex + 1) % colors.length;
          const nextColorIndex = (colorIndex + 2) % colors.length;
          
          topGradient.className += ` ${colors[colorIndex]}`;
          bottomGradient.className += ` ${colors[nextColorIndex]}`;
        }
      }, 5000);
    };
    
    animateBackground();
  }, []);

  return (
    <div ref={bgRef} className="relative min-h-screen flex flex-col items-center px-6 overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 -z-10 transition-colors duration-500"></div>
      
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-app-blue/20 to-app-purple/20 blur-3xl rounded-full transform translate-x-1/4 -translate-y-1/4 -z-10 transition-all duration-700 ease-in-out bg-gradient-top"></div>
      
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-app-pink/20 to-app-purple/20 blur-3xl rounded-full transform -translate-x-1/4 translate-y-1/4 -z-10 transition-all duration-700 ease-in-out bg-gradient-bottom"></div>

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center z-20 mb-8">
        <span className="px-4 py-1 text-xs font-medium bg-app-blue/10 text-app-blue rounded-full mb-4 animate-fade-in-up">
          Introducing CanvasFlow
        </span>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          Create, Collaborate, 
          <span className="bg-gradient-to-r from-app-blue via-app-indigo to-app-purple bg-clip-text text-transparent"> Visualize</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          The most intuitive drawing and whiteboarding tool designed for creative minds. Try it below - sketch, illustrate, and collaborate in real-time.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <Link href="/signup">
            <Button size="lg" className="bg-app-blue hover:bg-app-blue/90 text-white rounded-lg px-8">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-app-blue text-app-blue hover:bg-app-blue/10 rounded-lg px-8">
            Watch Demo
          </Button>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto flex-grow rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ease-out animate-scale mb-10"
        style={{ 
          boxShadow: '0 20px 80px -20px rgba(0, 0, 0, 0.1), 0 30px 60px -30px rgba(0, 0, 0, 0.1)',
          minHeight: '60vh'
        }}
      >
        <div className="relative w-full h-full bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 dark:bg-gray-800 flex items-center px-4 z-10">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-app-pink"></div>
              <div className="w-3 h-3 rounded-full bg-app-gray"></div>
              <div className="w-3 h-3 rounded-full bg-app-blue"></div>
            </div>
          </div>
          <div className="pt-8 w-full h-full" style={{ height: 'calc(100% - 8px)' }}>
            <DrawingCanvas />
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-app-gray/50"
        >
          <path d="M12 5v14"></path>
          <path d="m19 12-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;