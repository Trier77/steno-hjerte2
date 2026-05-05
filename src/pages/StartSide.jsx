import krop from "../assets/kropudenbg.svg";
import NavButton from "../components/NavButton";

function StartSide() {
  return (
    <>
      <article className="flex flex-col items-center">
        <h1 className="text-primary font-display text-center text-4xl font-semibold">
          Hjerteskærm
        </h1>
        <NavButton icon="play" label="Om Hjertet" onClick={() => {}} />
        <NavButton icon="quiz" label="Quiz" onClick={() => {}} />
        <img src={krop} className="w-270 h-480" alt="" />
      </article>
    </>
  );
}

export default StartSide;
