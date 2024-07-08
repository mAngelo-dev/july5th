import { Analytics } from "@vercel/analytics/react"

export default function App() {
    return (
        <>
            <Analytics/>
            <main className='flex justify-center items-center min-h-screen flex-col relative'>
                <h1 className='mb-4 text-7xl'>We are dating, that's it!</h1>
            </main>
        </>
    );
}
