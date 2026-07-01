"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  countryOptions,
  defaultLocale,
  sourceDictionary,
  type CountryOption,
  type Dictionary,
  type Locale,
} from "@/lib/i18n";

type TranslationStatus = "idle" | "ready";

type LanguageContextValue = {
  locale: Locale;
  selectedCountry: CountryOption;
  countryOptions: CountryOption[];
  setSelectedCountry: (country: CountryOption) => void;
  translationStatus: TranslationStatus;
};

const STORAGE_KEY = "site-country-language";

const defaultCountry =
  countryOptions.find((country) => country.locale === defaultLocale) ??
  countryOptions[0];
const LanguageContext = createContext<LanguageContextValue | null>(null);
const DictionaryContext = createContext<Dictionary>(sourceDictionary);

function getStoredCountryCode() {
  if (typeof window === "undefined") {
    return defaultCountry.countryCode;
  }

  const storedCountryCode = window.localStorage.getItem(STORAGE_KEY);
  const storedCountry = countryOptions.find(
    (country) => country.countryCode === storedCountryCode,
  );

  return storedCountry?.countryCode ?? defaultCountry.countryCode;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [selectedCountryCode, setSelectedCountryCode] =
    useState<CountryOption["countryCode"]>(getStoredCountryCode);
  const translationStatus: TranslationStatus = "ready";
  const selectedCountry =
    countryOptions.find(
      (country) => country.countryCode === selectedCountryCode,
    ) ?? defaultCountry;

  const setSelectedCountry = useCallback((country: CountryOption) => {
    setSelectedCountryCode(country.countryCode);
    window.localStorage.setItem(STORAGE_KEY, country.countryCode);
    document.documentElement.lang = country.locale;
  }, []);

  const value = useMemo(
    () => ({
      locale: selectedCountry.locale,
      selectedCountry,
      countryOptions,
      setSelectedCountry,
      translationStatus,
    }),
    [selectedCountry, setSelectedCountry, translationStatus],
  );

  return (
    <LanguageContext.Provider value={value}>
      <DictionaryContext.Provider value={sourceDictionary}>
        {children}
      </DictionaryContext.Provider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}

export function useDictionary() {
  return useContext(DictionaryContext);
}
