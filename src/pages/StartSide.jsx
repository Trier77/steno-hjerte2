import krop from "../assets/kropudenbg.svg";
import NavButton from "../components/NavButton";
import HotspotButton from "../components/HotspotButton";
import { useNavigate } from "react-router";
import { useState } from "react";
import VideoOverlay from "../components/VideoOverlay";
import QuizOverlay from "../components/QuizOverlay";
import FlagButton from "../components/FlagButton";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";


function StartSide() {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizVisible, setQuizVisible] = useState(false);
  const { language, visible } = useLanguage();
  const t = translations[language];

  const openQuiz = () => {
    setShowQuiz(true);
    setTimeout(() => setQuizVisible(true), 10);
  };

  const closeQuiz = () => {
    setQuizVisible(false);
    setTimeout(() => setShowQuiz(false), 400);
  };

  const openVideo = () => {
    setShowVideo(true);
    setTimeout(() => setVideoVisible(true), 10);
  };

  const closeVideo = () => {
    setVideoVisible(false);
    setTimeout(() => setShowVideo(false), 400);
  };

  return (
    <div className="min-h-screen bg-bg">
      <FlagButton />
      {showVideo && (
        <VideoOverlay onClose={closeVideo} visible={videoVisible} />
      )}
      {showQuiz && <QuizOverlay onClose={closeQuiz} visible={quizVisible} />}
      <section className="flex flex-col items-center">
        <h1 key={language}
          style={{ animation: "fadeIn 0.6s ease" }}
          className="text-primary font-display text-center text-4xl font-semibold">
          
          {t.startside.heading} 
        </h1>
       
        <p 
        key={language + "-body"}
        style={{ animation: "fadeIn 0.6s ease" }}>{t.startside.body}</p>
      </section>
      <section className="left-0 top-0 relative">
        <img src={krop} className="w-270 h-480" alt="" />
        <HotspotButton
          className="depri-knap left-1/2 top-110"
          onClick={() => navigate("/depression")}
        />
        <HotspotButton
          className="ryge-knap left-100 top-230"
          onClick={() => navigate("/rygning")}
        />
        <HotspotButton
          className="kraeft-knap left-170 top-260"
          onClick={() => navigate("/kraeftbehandling")}
        />
        <HotspotButton
          className="blodsukker-knap left-65 top-300"
          onClick={() => navigate("/blodsukker")}
        />
        <HotspotButton
          className="gravid-knap left-1/2 top-410"
          onClick={() => navigate("/graviditet")}
        />
        <HotspotButton
          className="hormon-knap left-120 top-420"
          onClick={() => navigate("/hormoner")}
        />
      </section>
      <section key={language + "-hjerteknap"} style={{ animation: "fadeIn 0.6s ease" }} className="absolute left-0 top-82 flex flex-col gap-5 ml-10">
        <NavButton   icon="play" label={t.hjerteknap.heading} onClick={openVideo} />
        <NavButton icon="quiz" label="Quiz" onClick={openQuiz} />
      </section>
    </div>
  );
}

export default StartSide;
