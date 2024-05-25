"use client";
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";

export default function App() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        function calculateTimeLeft() {
            const targetDate = new Date('July 5, 2024 14:05:00').getTime();
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                return null;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            return { days, hours, minutes, seconds };
        }

        const interval = setInterval(() => {
            const calculatedTimeLeft = calculateTimeLeft();
            if (calculatedTimeLeft) {
                setTimeLeft(calculatedTimeLeft);
                setIsLoaded(true);
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!isLoaded) {
        return (
            <main className='flex justify-center items-center min-h-screen'>
                <div className='text-center'>
                    <h1 className='text-3xl mb-4 animate-bounce'>Loading...</h1>
                </div>
            </main>
        );
    }

    return (
        <main className='flex justify-center items-center min-h-screen flex-col'>
                <Image src='/bulb.gif' alt='Loading GIF' width={64} height={64}/>
                <h1 className='text-3xl mb-4'>Hi, Julie!
                    <Link href={'/secret'}>💕</Link>
                </h1>
                <div id="countdown" className='text-xl'>
                    {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                </div>
        </main>
    );
}
