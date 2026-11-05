import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";

export const DEFAULT_PHONE_COUNTRY: CountryCode = "AU";

const countryNames = new Intl.DisplayNames(["en"], { type: "region" });

function flagEmoji(countryCode: string): string {
  return Array.from(countryCode.toUpperCase(), (letter) =>
    String.fromCodePoint(letter.charCodeAt(0) + 127397),
  ).join("");
}

export const PHONE_COUNTRIES = getCountries()
  .map((countryCode) => ({
    countryCode,
    countryName: countryNames.of(countryCode) ?? countryCode,
    callingCode: `+${getCountryCallingCode(countryCode)}`,
    flag: flagEmoji(countryCode),
  }))
  .sort((a, b) => a.countryName.localeCompare(b.countryName));

export function isSupportedPhoneCountry(value: string): value is CountryCode {
  return getCountries().includes(value as CountryCode);
}

export function getPhoneCountryName(countryCode: string): string {
  return isSupportedPhoneCountry(countryCode)
    ? (countryNames.of(countryCode) ?? countryCode)
    : countryCode;
}

export function getPhoneDetails(
  value: string,
  selectedCountry: string,
): {
  phone: string;
  phoneCountryCode: CountryCode;
  phoneCallingCode: string;
} | null {
  if (!isSupportedPhoneCountry(selectedCountry)) return null;

  const parsed = parsePhoneNumberFromString(value, selectedCountry);
  if (!parsed?.isPossible()) return null;

  const phoneCountryCode = parsed.country ?? selectedCountry;
  return {
    phone: parsed.number,
    phoneCountryCode,
    phoneCallingCode: `+${parsed.countryCallingCode}`,
  };
}
