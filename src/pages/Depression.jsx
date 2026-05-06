import { useState } from 'react'
import neuron from '../assets/neuron.svg'
import NeuronButton from '../components/NeuronButton'
import TekstModul from '../components/TekstModul'


   const buttons = [
  { id: 1, alt: "Valg 1" },
  { id: 2, alt: "Valg 2" },
  { id: 3, alt: "Valg 3" },
  { id: 4, alt: "Valg 4" },
]

function Depression() {
  const [selected, setSelected] = useState(1) // Knap 1 valgt fra start

  return (
    <>
    <div className="flex gap-12 justify-center items-center h-screen">
      {buttons.map((btn) => (
        <NeuronButton
          key={btn.id}
          src={neuron}
          alt={btn.alt}
          selected={selected === btn.id}
          onClick={() => setSelected(btn.id)}
        />
      ))}
    </div>

    <TekstModul />
        </>
       
    )
}
export default Depression