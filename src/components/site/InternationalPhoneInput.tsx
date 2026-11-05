import type { CountryCode } from "libphonenumber-js";
import { DEFAULT_PHONE_COUNTRY, PHONE_COUNTRIES } from "@/lib/phone";

export function InternationalPhoneInput({
  id,
  countryCode,
  value,
  onCountryChange,
  onValueChange,
}: {
  id: string;
  countryCode: string;
  value: string;
  onCountryChange: (countryCode: CountryCode) => void;
  onValueChange: (value: string) => void;
}) {
  const selectedCountry =
    PHONE_COUNTRIES.find((country) => country.countryCode === countryCode) ??
    PHONE_COUNTRIES.find((country) => country.countryCode === DEFAULT_PHONE_COUNTRY)!;

  return (
    <div className="space-y-2">
      <select
        id={`${id}-country`}
        aria-label="Country and international calling code"
        autoComplete="country"
        className="field-input min-h-11 cursor-pointer"
        value={selectedCountry.countryCode}
        onChange={(event) => onCountryChange(event.target.value as CountryCode)}
      >
        {PHONE_COUNTRIES.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.flag} {country.countryName} ({country.callingCode})
          </option>
        ))}
      </select>
      <input
        id={id}
        aria-label="Phone number"
        className="field-input min-h-11"
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder="Enter your phone number"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
      />
      <p className="text-xs leading-relaxed text-muted-foreground">
        Choose your country above; its calling code is added automatically.
      </p>
    </div>
  );
}
