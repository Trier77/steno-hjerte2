import krop from "../assets/kropudenbg.svg";

function StartSide() {
  return (
    <>
      <article className="flex flex-col items-center ">
        <h1 className="flex text-primary text-center text-4xl">Hjerteskærm</h1>
        <img src={krop} class="frontbg" className="flex w-270 h-480" alt="" />
      </article>
    </>
  );
}

export default StartSide;
