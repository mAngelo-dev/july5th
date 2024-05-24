"use client";
import React, { useEffect, useState } from 'react';
import Link from "next/link";

export default function Home() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        function calculateTimeLeft() {
            const targetDate = new Date('July 5, 2024 15:00:00').getTime();
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
            const timeLeft = calculateTimeLeft();
            if (timeLeft) {
                setTimeLeft(timeLeft);
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <main className='flex justify-center items-center min-h-screen'>
            <div className='text-center'>
                <h1 className='text-3xl mb-4'>Hi, Julie! <Link href={'/secret'}>💕</Link></h1>
                <div id="countdown" className='text-xl'>
                    {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                </div>
            </div>
        </main>
    );
}
