import BackButton from "../components/BackButton";
import FlagButton from "../components/FlagButton";
import Speedometer from "../components/Speedometer";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";

function Graviditet() {
  const { language, visible } = useLanguage();
  const t = translations[language]?.graviditet;

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col">
      <FlagButton />
      <BackButton />

      {/* Background — image/animation goes here later */}
      <div className="flex-1" />

      {/* Speedometer — sits above infobox, overlapping it */}
      <div
        className="absolute left-0 right-0 z-20 flex justify-center"
        style={{ bottom: "34.5vh" }}
      >
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <Speedometer />
        </div>
      </div>

      {/* UI Infobox */}
      <div
        className="relative z-10 w-full bg-ui-box/70 rounded-t-4xl px-8 pt-8 pb-8"
        style={{ height: "35vh" }}
      >
        <div
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
        >
          <h2 className="font-display font-semibold text-primary text-4xl mb-3 leading-snug">
            {t?.heading || "Graviditet"}
          </h2>
          <p className="font-display font-light text-primary text-2xl leading-relaxed mb-6">
            {t?.body || "[ Tekst fra museet ]"}
          </p>
          <button className="w-full text-center font-display font-semibold text-primary text-2xl underline">
            {t?.link || "Prøv at trække i speedometeret"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Graviditet;
