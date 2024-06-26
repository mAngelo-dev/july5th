'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Link from "next/link";
import Image from "next/image";
import { differenceInMilliseconds, intervalToDuration } from "date-fns";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
    const [timeLeft, setTimeLeft] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const targetDate = new Date('July 5, 2024 14:05:00');

        function calculateTimeLeft() {
            const now = new Date();
            const diff = differenceInMilliseconds(targetDate, now);
            if (diff <= 0) {
                return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
            }
            return intervalToDuration({ start: now, end: targetDate });
        }

        const interval = setInterval(() => {
            const calculatedTimeLeft = calculateTimeLeft();
            setTimeLeft(calculatedTimeLeft);
            setIsLoaded(true);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const toggleAudio = useCallback(async () => {
        const audio = document.getElementById('audio');
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                await audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    }, [isPlaying]);

    if (!isLoaded) {
        return (
            <main className='flex justify-center items-center min-h-screen'>
                <div className='text-center'>
                    <h1 className='text-7xl mb-4 animate-bounce'>Loading...</h1>
                </div>
            </main>
        );
    }

    const { months = 0, days = 0, hours = 0, minutes = 0, seconds = 0 } = timeLeft;

    return (
        <>
            <Analytics />
            <main className='flex justify-center items-center min-h-screen flex-col relative'>
                <button
                    onClick={toggleAudio}
                    className='absolute top-2 right-2 p-2 text-black rounded-full'
                >
                    {isPlaying ? '⏸️' : '▶️'}
                </button>
                <p id="sunbringer"><Link href={'/gallery'}> 🌙 & ☀️</Link></p>
                <Image src='/bulb.gif' alt='Loading GIF' width={256} height={256} priority />
                <audio id='audio' src='/music/Bromeliad.mp3' className='hidden' loop />
                <h1 className='mb-4 text-7xl'>Hi, Julie! <Link href={'/secret'}>💕</Link></h1>
                <div id="countdown" className='text-4xl'>
                    {months > 0 && `${months}m `}
                    {days > 0 && `${days}d `}
                    {hours > 0 && `${hours}h `}
                    {minutes > 0 && `${minutes}m `}
                    {seconds > 0 && `${seconds}s`}
                    {months === 0 && days === 0 && hours === 0 && minutes === 0 && seconds === 0 && <p>Estou chegando...</p>}
                </div>
                {months === 0 && days === 0 && hours === 0 && minutes === 0 && seconds === 0 && (
                    <Link id='proposal' href={'/proposal'}>💍</Link>
                )}
            </main>
        </>
    );
}
