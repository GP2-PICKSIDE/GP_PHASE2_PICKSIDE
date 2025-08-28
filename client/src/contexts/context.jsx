import { createContext } from "react";
import useAllStore from "../stores";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { globalLang: lang, setGlobalLang: setLang } = useAllStore();

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
