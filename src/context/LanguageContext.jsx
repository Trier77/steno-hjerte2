import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") ?? "da",
  );
  const [visible, setVisible] = useState(true);

  const switchLanguage = (lang) => {
    setVisible(false);
    setTimeout(() => {
      setLanguage(lang);
      localStorage.setItem("language", lang);
      setVisible(true);
    }, 300);
  };

  return (
    <LanguageContext.Provider value={{ language, visible, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
