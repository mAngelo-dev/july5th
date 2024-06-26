'use client';
import React from 'react';

export default function ProposalPage() {
  const handleYes = () => {
      let yesButton = document.getElementById("answerYes");
      let noButton = document.getElementById("answerNo");
      yesButton && (yesButton.innerHTML = "Sim, eu aceito!");
      document.getElementById("proposalName")?.remove()
      document.getElementById("proposalText")?.remove()
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
          <h1 id="proposalName" className="text-7xl mb-4">Juliana,</h1>
          <p id="proposalText" className="text-4xl">Voce quer ser minha namorada?</p>
          <button id="answerYes" className="font-bold py-2 px-4 rounded-md" onClick={handleYes}>
              Sim
          </button>
          <button id="answerNo" className="font-bold py-2 px-4 rounded-md" onClick={handleNo}>
              Nao
          </button>
      </main>
  );
}
