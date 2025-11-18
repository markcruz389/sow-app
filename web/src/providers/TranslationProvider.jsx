import { useState, useEffect, useContext, createContext } from "react";

const TranslationContext = createContext();

export function TranslationProvider({ children, defaultLanguage }) {
  const [language, setLanguage] = useState(defaultLanguage);
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    async function fetchTranslations() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/translations`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ language }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch translations");
        }

        const data = await response.json();
        const translationsMap = {};
        data.forEach(({ key, value }) => {
          translationsMap[key] = value;
        });

        console.log("Fetched translations:", translationsMap);
        setTranslations(translationsMap);
      } catch (error) {
        console.error("Error fetching translations:", error);
      }
    }

    fetchTranslations();
  }, [language]);

  return (
    <TranslationContext.Provider
      value={{ language, setLanguage, translations }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
