import krop from "../assets/kropudenbg.svg";
import NavButton from "../components/NavButton";
import HotspotButton from "../components/HotspotButton";
import { Navigate, useNavigate } from "react-router";
import Depression from "./Depression";



function StartSide() {
    const navigate = useNavigate();
  return (
    <>
      <section className="flex flex-col items-center ">
        <h1 className="text-primary font-display text-center text-4xl font-semibold">
          Hjerteskærm
        </h1>
        <p>undertitel</p>
         
                 
      </section>
      <section className="left-0 top-0 relative">        
        <img src={krop} className="w-270 h-480" alt="" />
        <HotspotButton className="depri-knap left-1/2 top-110  " onClick={() => navigate("/depression")} />
        <HotspotButton className="ryge-knap left-100 top-230" onClick={() => navigate("/rygning")} />
        <HotspotButton className="kraeft-knap left-170 top-260" onClick={() => navigate("/kraeftbehandling")} />
        <HotspotButton className="blodsukker-knap left-65 top-300" onClick={() => navigate("/blodsukker")} />
        <HotspotButton className="gravid-knap left-1/2 top-410" onClick={() => navigate("/graviditet")} />
        <HotspotButton className="hormon-knap left-120 top-420" onClick={() => navigate("/hormoner")} />
        {/* skal knappe komponenterne ligge inden i article */}
        </section>

        <section className="absolute left-0 top-82 flex flex-col gap-5 ml-10">
            <NavButton  icon="play" label="Om Hjertet" onClick={() => {}} />
            <NavButton icon="quiz" label="Quiz" onClick={() => {}} />
                
        </section>
    </>
  );
}

export default StartSide;
