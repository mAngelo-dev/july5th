import { Analytics } from "@vercel/analytics/react"
import Image from 'next/image';

export default function App() {
    return (
        <>
            <Analytics/>
            <main className='flex justify-center items-center min-h-screen flex-col relative'>
                <Image src='/pictures/sunctisz.jpg' alt='Loading jpg' width={400} height={300} priority/>
                <h2 className='mt-4 text-3xl'>sunctisz</h2>
                <h1 className='mb-4 text-7xl'>We are dating, that&apos;s it!</h1>
            </main>
        </>
    );
}
