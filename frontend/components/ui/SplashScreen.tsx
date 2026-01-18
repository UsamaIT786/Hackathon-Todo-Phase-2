'use client';

import { useEffect, useState } from 'react';

export function SplashScreen() {
    const [isVisible, setIsVisible] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        // Prevent scrolling while splash screen is active
        document.body.style.overflow = 'hidden';

        // Min duration for the splash screen to be visible
        const timer = setTimeout(() => {
            setIsVisible(false);
            document.body.style.overflow = 'unset';
        }, 3500); // 3.5 seconds duration

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Handle unmounting after fade out animation
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (!isVisible) {
            timer = setTimeout(() => {
                setShouldRender(false);
            }, 500); // Match transition duration
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isVisible]);

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-dark-DEFAULT transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
        >
            {/* Background Animated Gradient */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
            </div>

            <div className="relative flex flex-col items-center">
                {/* Animated Icon Container */}
                <div className="w-24 h-24 mb-10 relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-3xl animate-ping opacity-75 duration-1000"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-glow-blue animate-float">
                        <svg
                            className="w-12 h-12 text-white drop-shadow-md"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="20,6 9,17 4,12" />
                        </svg>
                    </div>
                </div>

                {/* Sliding Headline */}
                <div className="overflow-hidden">
                    <div className="animate-slide-up-fade flex flex-col items-center gap-2">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Todo Manager
                        </h1>

                        <div className="mt-2 relative overflow-hidden px-4 py-2">
                            <div className="animate-shine absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-primary/10 to-transparent skew-x-[-25deg]"></div>
                            <p className="text-base sm:text-lg font-medium text-gray-secondary dark:text-gray-400">
                                Developed by <span className="text-primary font-semibold">Usama Muzammil</span>
                            </p>
                        </div>

                        {/* Loading Dots */}
                        <div className="flex items-center gap-1.5 mt-4">
                            <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-2.5 h-2.5 bg-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-2.5 h-2.5 bg-accent rounded-full animate-bounce"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
