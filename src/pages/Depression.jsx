import neuron1 from '../assets/neuron.svg'
import neuron2 from '../assets/neuron.svg'
import neuron3 from '../assets/neuron.svg'
import neuron4 from '../assets/neuron.svg'
import NeuronButton from '../components/NeuronButton'

function Depression(){
    return(
        // <img src={neuron} class="frontbg" className="flex w-270 h-480" alt="Neuron 1 billede" />
         <div className="flex gap-12 justify-center items-center h-screen">
      <NeuronButton src={neuron1} alt="Valg 1" glowColor="#f59e0b" />
      <NeuronButton src={neuron2} alt="Valg 2" glowColor="#3b82f6" />
      <NeuronButton src={neuron3} alt="Valg 3" glowColor="#22c55e" />
      <NeuronButton src={neuron4} alt="Valg 4" glowColor="#ec4899" />
    </div>
    )
}
export default Depression