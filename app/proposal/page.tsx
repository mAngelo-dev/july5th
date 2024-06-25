'use client';
import React from 'react';

export default function ProposalPage() {
  const handleYes = () => {
      let yesButton = document.getElementById("answerYes");
      let noButton = document.getElementById("answerNo");
      yesButton && (yesButton.innerHTML = "Sim, eu aceito!");
      noButton && (noButton.remove());
  };

  const handleNo = () => {
      let noButton = document.getElementById("answerNo");
      let yesButton = document.getElementById("answerYes");
      noButton && (noButton.innerHTML = "Nao");
      yesButton && (yesButton.remove());
  };

  return (
    <main className="flex justify-center items-center min-h-screen flex-col relative">
      <h1 className="text-7xl mb-4">Juliana,</h1>
      <p className="text-4xl">Voce quer ser minha namorada?</p>
      <button id="answerYes" className="bg-white text-black font-bold px-10 rounded" onClick={handleYes}>Sim</button>
      <button id="answerNo" className="font-bold py-2 px-4 rounded" onClick={handleNo}>Nao</button>
    </main>
  );
}
