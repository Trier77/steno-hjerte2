import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import daFlag from "../assets/icons/da-flag.webp";
import enFlag from "../assets/icons/en-flag.svg";

const flags = {
  da: daFlag,
  en: enFlag,
};

function FlagButton() {
  const { language, switchLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const otherLang = language === "da" ? "en" : "da";

  const handleSwitch = (lang) => {
    switchLanguage(lang);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed bottom-6 right-6 flex flex-col items-center gap-3 z-50"
    >
      <button
        onClick={() => handleSwitch(otherLang)}
        className={`w-14 h-14 rounded-full overflow-hidden border-2 border-primary shadow-lg transition-all duration-500 ease-in-out
          ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}
      >
        <img
          src={flags[otherLang]}
          alt={otherLang}
          className="w-full h-full object-cover"
        />
      </button>

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary opacity-50 transition-opacity duration-500"
      >
        <img
          src={flags[language]}
          alt={language}
          className="w-full h-full object-cover"
        />
      </button>
    </div>
  );
}

export default FlagButton;
