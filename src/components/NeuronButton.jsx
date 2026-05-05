import { useState } from 'react'

function NeuronButton({ src, alt, glowColor }) {
  const [selected, setSelected] = useState(false)

  return (
    <button
      onClick={() => setSelected(!selected)}
      className="relative flex items-center justify-center"
    >
      {/* Glow-effekt bag billedet */}
      {!selected && (
        <span
          className="absolute inset-0 rounded-full blur-xl animate-pulse -z-10"
          style={{ backgroundColor: glowColor }}
        />
      )}

      {/* Selve billedet */}
      <img
        src={src}
        alt={alt}
        className={`
          w-64 h-auto transition-all duration-300 cursor-pointer
          ${selected
            ? 'scale-125 ring-4 ring-white rounded-xl'
            : 'scale-100'
          }
        `}
      />
    </button>
  )
}

export default NeuronButton