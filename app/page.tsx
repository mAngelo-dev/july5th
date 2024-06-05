'use client';
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInSeconds } from "date-fns";
import { Analytics } from "@vercel/analytics/react"

export default function App() {
    const [timeLeft, setTimeLeft] = useState({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, });
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

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

    const toggleAudio = async () => {
        const audio = document.getElementById('audio') as HTMLAudioElement;
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                await audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

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
            <Analytics/>
            <main className='flex justify-center items-center min-h-screen flex-col relative'>
                <button
                    onClick={toggleAudio}
                    className='absolute top-2 right-2 p-2 text-black rounded-full'
                >
                    {isPlaying ? '⏸️' : '▶️'}
                </button>
                <h1 id="sunbringer"><Link href={'/gallery'}> 🌙 & ☀️</Link></h1>
                <Image src='/bulb.gif' alt='Loading GIF' width={256} height={256} priority={true} />
                <audio id='audio' src='/music/Bromeliad.mp3' className='hidden' loop />
                <h1 className='mb-4 text-7xl'>Hi, Julie!
                    <Link href={'/secret'}>💕</Link>
                </h1>
                <div id="countdown" className='text-4xl'>
                    {timeLeft.months > 0 && `${timeLeft.months}m `}
                    {timeLeft.days > 0 && `${timeLeft.days}d `}
                    {timeLeft.hours > 0 && `${timeLeft.hours}h `}
                    {timeLeft.minutes > 0 && `${timeLeft.minutes}m `}
                    {timeLeft.seconds > 0 && `${timeLeft.seconds}s`}
                </div>
            </main>
        </>
    );
}
