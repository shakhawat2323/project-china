"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  countryOptions,
  defaultLocale,
  getDictionary,
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

function applyDocumentLocale(locale: Locale) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.lang = locale;
  document.documentElement.dir = locale === "ar" || locale === "ur" ? "rtl" : "ltr";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [selectedCountryCode, setSelectedCountryCode] =
    useState<CountryOption["countryCode"]>(getStoredCountryCode);
  const translationStatus: TranslationStatus = "ready";
  const selectedCountry =
    countryOptions.find(
      (country) => country.countryCode === selectedCountryCode,
    ) ?? defaultCountry;
  const dictionary = useMemo(
    () => getDictionary(selectedCountry.locale),
    [selectedCountry.locale],
  );

  useEffect(() => {
    applyDocumentLocale(selectedCountry.locale);
  }, [selectedCountry.locale]);

  const setSelectedCountry = useCallback((country: CountryOption) => {
    window.localStorage.setItem(STORAGE_KEY, country.countryCode);
    applyDocumentLocale(country.locale);
    setSelectedCountryCode(country.countryCode);

    // Re-render from the clean English source before applying the selected language.
    // This avoids stale translated DOM text when switching between languages.
    window.location.reload();
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
      <DictionaryContext.Provider value={dictionary}>
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
