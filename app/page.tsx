'use client';
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInSeconds } from "date-fns";

export default function App() {
    const [timeLeft, setTimeLeft] = useState({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0,});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        function calculateTimeLeft() {
            const targetDate = new Date('July 5, 2024 14:05:00');
            const now = new Date();

            if (targetDate <= now) {
                return null;
            }

            // Calculate differences
            const months = differenceInMonths(targetDate, now);
            const days = differenceInDays(targetDate, now) % 30;
            const hours = differenceInHours(targetDate, now) % 24;
            const minutes = differenceInMinutes(targetDate, now) % 60;
            const seconds = differenceInSeconds(targetDate, now) % 60;

            return { months, days, hours, minutes, seconds };
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

    useEffect(() => {
        const handleClick = async () => {
            const audio = document.getElementById('audio') as HTMLAudioElement;
            if (audio && audio.paused) {
               await audio.play();
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
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
        <>
            <main className='flex justify-center items-center min-h-screen flex-col'>
                <Image src='/bulb.gif' alt='Loading GIF' width={64} height={64} priority={true}/>
                <audio id='audio' src='/music/Bromeliad.mp3' className='hidden' autoPlay={true} loop/>
                <h1 className='text-3xl mb-4'>Hi, Julie!
                    <Link href={'/secret'}>💕</Link>
                </h1>
                <div id="countdown" className='text-xl'>
                    {timeLeft.months}m {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                </div>
            </main>
        </>
    );
}
