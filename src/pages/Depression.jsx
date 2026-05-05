import neuron from '../assets/neuron.svg'
import NeuronButton from '../components/NeuronButton'
import TekstModul from '../components/TekstModul'

function Depression(){
    return(
        <>
         {/* <img src={neuron} class="frontbg" className="flex w-270 h-480" alt="Neuron 1 billede" /> */}
         <div className="flex gap-12 justify-center items-center h-cover">
      <NeuronButton src={neuron} alt="Valg 1" glowColor="#f59e0b" />
      <NeuronButton src={neuron} alt="Valg 2" glowColor="#3b82f6" />
      <NeuronButton src={neuron} alt="Valg 3" glowColor="#22c55e" />
      <NeuronButton src={neuron} alt="Valg 4" glowColor="#ec4899" />
    </div>

    <TekstModul />
        </>
       
    )
}
export default Depression