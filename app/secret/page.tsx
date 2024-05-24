"use client";
import React, { useState } from 'react';
import { redirect} from "next/navigation";
import Link from "next/link";

export default function Secret() {
    const [hasClicked, setHasClicked] = useState(false);

    const handleRedirect = (): void => {
        redirect('/');
    };

    return (
        <main className='flex justify-center items-center min-h-screen'>
            <div className='text-center'>
                <h1 className='text-3xl mb-4'>Voce eh curiosa ne?</h1>
                {hasClicked ? (
                    <>
                        <p className='text-xl'>Parabens, voce eh curiosa!</p>
                        <p className='text-xl'>Agora, voce sabe que o segredo eh...</p>
                        <h2 className='text-3xl'>...nao tem segredo! Voce ja sabe que eu te amo</h2>
                        <p>Clica <Link className="text-gray-500 cursor-pointer" href={'/'}>aqui</Link> se vc quiser ver o cronometro de novo</p>
                    </>
                ) : (
                    <button className='bg-black hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded'
                            onClick={() => setHasClicked(true)}>
                        Sim, sou curiosa
                    </button>
                )}
            </div>
        </main>
    );
}
