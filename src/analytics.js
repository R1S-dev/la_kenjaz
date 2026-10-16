export const initialValues = { age: 24, sessions: 1, minutes: 12, phone: 70 };
export function validate(v) {
  if (!Number.isInteger(v.age) || v.age < 1 || v.age > 120)
    return "Unesi godine između 1 i 120.";
  if (!Number.isFinite(v.sessions) || v.sessions < 0.1 || v.sessions > 20)
    return "Broj poseta treba da bude između 0,1 i 20 dnevno.";
  if (!Number.isFinite(v.minutes) || v.minutes < 1 || v.minutes > 180)
    return "Trajanje sesije treba da bude između 1 i 180 minuta.";
  if (v.sessions * v.minutes > 1440)
    return "Dan ima samo 1.440 minuta. Proveri unete vrednosti.";
  if (!Number.isFinite(v.phone) || v.phone < 0 || v.phone > 100)
    return "Udeo telefona treba da bude između 0 i 100%.";
  return "";
}
export function calculate(v) {
  const lived = v.age * 365.25,
    sessions = lived * v.sessions,
    minutes = sessions * v.minutes,
    hours = minutes / 60,
    days = hours / 24;
  return {
    sessions,
    minutes,
    hours,
    days,
    months: days / (365.25 / 12),
    years: days / 365.25,
    phoneMinutes: (minutes * v.phone) / 100,
    phoneDays: (days * v.phone) / 100,
    percent: (days / lived) * 100,
    daily: v.sessions * v.minutes,
  };
}
export function verdict(d) {
  return d < 5
    ? "Efikasan. Hladan. Profesionalan."
    : d < 15
      ? "U granicama civilizovanog društva."
      : d < 30
        ? "WC više nije prostorija. To je destinacija."
        : d <= 60
          ? "Imamo ozbiljna pitanja."
          : "Ti praktično imaš drugu adresu.";
}
export const fmt = (n, d = 0) =>
  new Intl.NumberFormat("sr-Latn-RS", {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  }).format(n);
export const shareText = (r) =>
  `LA KENJAZ kaže da sam proveo ${fmt(r.days)} dana života na WC-u. Ne znam kako da se osećam povodom toga.`;
