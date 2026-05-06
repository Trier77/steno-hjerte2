import { useState } from 'react'

function NeuronButton({ src, alt, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center"
    >
      {/* Pulserende glow — farve skifter ved selected */}
      <span
        className={`
          absolute inset-0 rounded-full blur-xl animate-pulse -z-10
          ${selected ? 'bg-blue-400 scale-140' : 'bg-amber-400 scale-100'}
        `}
      />

      {/* Billede — vokser ved selected, ingen ring */}
      <img
        src={src}
        alt={alt}
        width={270}
        height={480}
        className={`transition-all duration-300 cursor-pointer
          ${selected ? 'scale-140' : 'scale-100'}
        `}
      />
    </button>
  )
}

export default NeuronButton