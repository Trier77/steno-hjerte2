import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("da");
  const [visible, setVisible] = useState(true);

  const switchLanguage = (lang) => {
    setVisible(false);
    setTimeout(() => {
      setLanguage(lang);
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
