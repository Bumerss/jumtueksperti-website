// Ģenerē JEB latviešu valodas lapas ar kopīgu galveni un kājeni.
// Palaišana no projekta mapes:  node tools/build-lv.mjs
// Saturs (pakalpojumi, objekti, profils) ir šī faila datu blokos augšā.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://www.jumtueksperti.lv";
const CSS = "_astro/index.ekhXjmBN.css";
const OG_IMAGE = SITE + "/assets/og-image.jpg";
const CALL_BAR = `<a class="mobile-call-bar" href="tel:+37129268323"><svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg><span>Zvanīt +371 29268323</span></a>`;
const PHONE = "+371 29268323";
const PHONE_HREF = "tel:+37129268323";
const EMAIL = "info@jumtueksperti.lv";
const ADDRESS = "Lizuma iela 5J, Rīga, LV-1006";

// ---------------------------------------------------------------- Ikonas
const ICONS = {
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8"/>',
  house: '<path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5h4v5"/>',
  drop: '<path d="M12 3.5s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11Z"/>',
  helmet: '<path d="M5.5 16v-2.5a6.5 6.5 0 0 1 13 0V16"/><path d="M10 7.6V5h4v2.6"/><path d="M3.5 16h17v3h-17z"/>',
  square: '<path d="M4 20V4l16 16H4Z"/><path d="M8 16v-4l4 4H8Z"/>',
  shield: '<path d="M12 3.5 19 6v5.5c0 4.3-3 7.6-7 9-4-1.4-7-4.7-7-9V6l7-2.5Z"/><path d="m9 12 2 2 4-4"/>',
  chat: '<path d="M4.5 5.5h15v10h-8L7 19v-3.5H4.5v-10Z"/>',
  board: '<rect x="3.5" y="4" width="17" height="10" rx="1"/><circle cx="8" cy="17.6" r="1.6"/><circle cx="12" cy="17.6" r="1.6"/><circle cx="16" cy="17.6" r="1.6"/>',
  award: '<circle cx="12" cy="9" r="5.5"/><path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7"/>',
};
const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;
// Ilustrētās pakalpojumu ikonas (viewBox 64): zīmola sarkanais, tērauda pelēkais, zils ūdenim.
const ILLUS = {
  "tehniska-apsekosana": '<path d="M8 30 30 12l22 18" fill="none" stroke="#c94b2d" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/><path d="M14 28v24h32V28L30 15Z" fill="#fff" stroke="#263238" stroke-width="2.5" stroke-linejoin="round"/><rect x="24" y="38" width="10" height="14" fill="#f6c7b3" stroke="#263238" stroke-width="2"/><circle cx="44" cy="42" r="9" fill="#d6f1f6" stroke="#263238" stroke-width="3"/><path d="m50.5 48.5 7 7" stroke="#263238" stroke-width="4.5" stroke-linecap="round"/>',
  "apsekosana-pirms-iegades": '<path d="M10 6h28l10 10v40a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" fill="#fff" stroke="#263238" stroke-width="2.5" stroke-linejoin="round"/><path d="M38 6v10h10" fill="none" stroke="#263238" stroke-width="2.5" stroke-linejoin="round"/><path d="M15 24 23 17l8 7" fill="none" stroke="#c94b2d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 23v7h12v-7" fill="none" stroke="#263238" stroke-width="2"/><path d="M15 37h22M15 43h16M15 49h10" stroke="#aab4b6" stroke-width="2.5" stroke-linecap="round"/><path d="M27 52c3-3 5 2 8-1" fill="none" stroke="#263238" stroke-width="1.8" stroke-linecap="round"/><circle cx="46" cy="42" r="10" fill="#d6f1f6" stroke="#263238" stroke-width="3"/><path d="m41.5 42 3 3 6-6" fill="none" stroke="#1f9d6b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="m53 49 7 7" stroke="#263238" stroke-width="4.5" stroke-linecap="round"/>',
  "nopludes-un-hidroizolacija": '<path d="M4 26 32 8l28 18" fill="none" stroke="#c94b2d" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M10 24 32 10l22 14v4H10Z" fill="#f6c7b3"/><path d="m30 18 3 5-3 4" fill="none" stroke="#263238" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M31 31c-3 5-5 7.5-5 10a5 5 0 0 0 10 0c0-2.5-2-5-5-10Z" fill="#4bbbd0"/><path d="M20 44c-2 3-3 4.5-3 6a3 3 0 0 0 6 0c0-1.5-1-3-3-6Z" fill="#4bbbd0"/><path d="M43 46c-2 3-3 4.5-3 6a3 3 0 0 0 6 0c0-1.5-1-3-3-6Z" fill="#4bbbd0"/><path d="M14 58h36" stroke="#4bbbd0" stroke-width="3" stroke-linecap="round" opacity=".5"/>',
  "uzraudziba": '<rect x="28" y="16" width="28" height="40" rx="3" fill="#fff" stroke="#263238" stroke-width="2.5"/><rect x="36" y="12" width="12" height="7" rx="2" fill="#263238"/><path d="m33 28 2.5 2.5 4.5-4.5M33 38l2.5 2.5 4.5-4.5M33 48l2.5 2.5 4.5-4.5" fill="none" stroke="#1f9d6b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 28h7M44 38h7M44 48h7" stroke="#263238" stroke-width="2.5" stroke-linecap="round"/><path d="M6 40a14 14 0 0 1 28 0Z" fill="#c94b2d"/><path d="M4 40h32v5H4Z" fill="#9c2d20"/><path d="M17 27h6v6h-6Z" fill="#f6c7b3"/>',
  "projekti-un-mezgli": '<rect x="6" y="10" width="44" height="44" rx="3" fill="#d6f1f6" stroke="#263238" stroke-width="2.5"/><path d="M12 36 28 22l16 14" fill="none" stroke="#263238" stroke-width="2.5" stroke-linejoin="round"/><path d="M12 42h32M28 22v20" stroke="#263238" stroke-width="1.5" stroke-dasharray="3 3"/><circle cx="28" cy="22" r="3" fill="#c94b2d"/><g transform="rotate(-45 46 40)"><rect x="40" y="18" width="10" height="40" rx="2" fill="#c94b2d"/><path d="M40 26h5M40 32h3M40 38h5M40 44h3M40 50h5" stroke="#fff" stroke-width="2"/></g>',
  "jumta-drosibas-sistemas": '<path d="M2 58 34 18l28 22" fill="#f6c7b3"/><path d="M2 58 34 18l28 22" fill="none" stroke="#c94b2d" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/><path d="M34 18v-6" stroke="#263238" stroke-width="3" stroke-linecap="round"/><circle cx="34" cy="9" r="3.5" fill="none" stroke="#263238" stroke-width="2.5"/><path d="M36 11c-2 10-6 16-12 22" fill="none" stroke="#e0a21a" stroke-width="2.5" stroke-linecap="round"/><circle cx="20" cy="27" r="4" fill="#263238"/><path d="M16 31h8l2 9-4 2" fill="#c94b2d"/><path d="M17 31 13 40l-5 4M23 34l3 3" stroke="#263238" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M15 34h10" stroke="#e0a21a" stroke-width="2"/><path d="M15.5 25.5c2-3 7-3 9 0" fill="#e0a21a" stroke="#e0a21a" stroke-width="2"/>',
  "konsultacijas": '<path d="M6 12h32a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H20l-9 8v-8H6a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4Z" fill="#c94b2d"/><path d="m12 30 10-8 10 8" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M28 30h26a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-3v7l-8-7H28a4 4 0 0 1-4-4V34a4 4 0 0 1 4-4Z" fill="#263238"/><circle cx="34" cy="41" r="2.4" fill="#fff"/><circle cx="41" cy="41" r="2.4" fill="#fff"/><circle cx="48" cy="41" r="2.4" fill="#fff"/>',
  "apmacibas-un-seminari": '<rect x="18" y="8" width="42" height="30" rx="2" fill="#fff" stroke="#263238" stroke-width="2.5"/><path d="M26 30 38 18l12 12" fill="none" stroke="#c94b2d" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/><path d="M30 30v-6h16v6" fill="none" stroke="#263238" stroke-width="2"/><path d="M39 38v8M33 56l6-10 6 10" stroke="#263238" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="11" cy="30" r="5" fill="#263238"/><path d="M3 56V44a8 8 0 0 1 16 0v12Z" fill="#c94b2d"/><path d="M16 40l8-6" stroke="#263238" stroke-width="2.5" stroke-linecap="round"/>',
};
const illus = (slug) => `<span class="icon-illus"><svg viewBox="0 0 64 64" aria-hidden="true">${ILLUS[slug]}</svg></span>`;
// Līniju ikonas sadaļām "Kad šis pakalpojums noder" un "Ko jūs saņemat" (viewBox 24).
const LINE_ICONS = {
  crack: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="m12 3-2 5 3 3-2 4 2 6"/>',
  hammer: '<path d="M11 9 15 5l4 4-4 4Z"/><path d="m13 11-8 8a1.5 1.5 0 0 1-2-2l8-8"/>',
  storm: '<path d="M7 17a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 17 8a3.5 3.5 0 0 1 1 6.9"/><path d="m13 12-3 5h4l-3 5"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13.5" r="3.5"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="m3.5 6 1.2 1.2L7 5M3.5 12l1.2 1.2L7 11M3.5 18l1.2 1.2L7 17"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  warning: '<path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4M12 17v.5"/>',
  euro: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5a4 4 0 1 0 0 7M7 11h6M7 13.5h6"/>',
  wallet: '<path d="M4 7h15a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11v3"/><path d="M16 13.5h1.5"/>',
  doc: '<path d="M6 3h8l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14 3v5h5M8.5 13h7M8.5 17h5"/>',
  chat: '<path d="M4 5h16v11H9l-5 4V5Z"/><path d="M8 9.5h8M8 12.5h5"/>',
  drop: '<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11Z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
  house: '<path d="M3 11 12 4l9 7"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-5h4v5"/>',
  cloud: '<path d="M7 15a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 17 6a3.5 3.5 0 0 1 1 6.9"/><path d="M8 18v2M12 17v3M16 18v2"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8"/>',
  wrench: '<path d="M15 4a5 5 0 0 0-4.6 6.9L3.5 17.8a1.8 1.8 0 0 0 2.6 2.6l6.9-6.9A5 5 0 0 0 20 9l-3 1-2-2 1-3Z"/>',
  clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="m9 13 2 2 4-4"/>',
  shield: '<path d="M12 3 19 6v5.5c0 4.3-3 7.6-7 9-4-1.4-7-4.7-7-9V6l7-3Z"/><path d="m9 12 2 2 4-4"/>',
  ruler: '<path d="M3 17 17 3l4 4L7 21Z"/><path d="m7 13 2 2M10 10l2 2M13 7l2 2"/>',
  people: '<circle cx="9" cy="8" r="3"/><path d="M3 20v-1a5 5 0 0 1 10 0v1"/><circle cx="17" cy="9" r="2.5"/><path d="M15 14.5a4 4 0 0 1 6 3.5v2"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  solar: '<rect x="3" y="11" width="18" height="9" rx="1"/><path d="M3 15.5h18M9 11v9M15 11v9"/><path d="M12 3v2M7 5l1 1.5M17 5l-1 1.5"/>',
  bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z"/>',
  question: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.5a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.7M12 16.8v.2"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  arrow: '<circle cx="12" cy="12" r="9"/><path d="M8 12h8M13 8.5 16.5 12 13 15.5"/>',
  award: '<circle cx="12" cy="9" r="5.5"/><path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2Z"/><path d="M4 20a2 2 0 0 0 2 2h13v-4"/>',
  repeat: '<path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5M20 4v4.5h-4.5M20 12a8 8 0 0 1-13.7 5.6L4 15.5M4 20v-4.5h4.5"/>',
};
const WHEN_ICONS = {
  "tehniska-apsekosana": ["crack", "hammer", "storm", "calendar"],
  "apsekosana-pirms-iegades": ["eye", "warning", "euro", "wallet"],
  "nopludes-un-hidroizolacija": ["drop", "pin", "house", "cloud"],
  "uzraudziba": ["house", "eye", "clipboard", "wrench"],
  "projekti-un-mezgli": ["doc", "ruler", "award", "euro"],
  "jumta-drosibas-sistemas": ["people", "clock", "solar"],
  "konsultacijas": ["bulb", "question", "chat"],
  "apmacibas-un-seminari": ["people", "repeat", "book"],
};
const RESULT_ICONS = {
  "tehniska-apsekosana": ["camera", "pin", "list"],
  "apsekosana-pirms-iegades": ["doc", "list", "chat"],
  "nopludes-un-hidroizolacija": ["search", "wrench", "chat"],
  "uzraudziba": ["calendar", "warning", "shield"],
  "projekti-un-mezgli": ["ruler", "warning", "list"],
  "jumta-drosibas-sistemas": ["shield", "pin", "doc"],
  "konsultacijas": ["check", "arrow", "award"],
  "apmacibas-un-seminari": ["hammer", "award", "gear"],
};
const lineIcon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${LINE_ICONS[name] || LINE_ICONS.check}</svg>`;
// Ilustrētas darba procesa ikonas (viewBox 64).
const PROCESS_ICONS = [
  // 1. Pieteikums: telefons ar formu un foto, nosūtīšana
  '<rect x="10" y="4" width="30" height="56" rx="5" fill="#fff" stroke="#263238" stroke-width="2.5"/><path d="M21 9h8" stroke="#263238" stroke-width="2.5" stroke-linecap="round"/><rect x="15" y="15" width="20" height="13" rx="2" fill="#d6f1f6"/><path d="m16 27 6-6 4 4 3-3 6 5" fill="none" stroke="#263238" stroke-width="1.8" stroke-linejoin="round"/><path d="M17 20 22 16l5 4" fill="none" stroke="#c94b2d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="15" y="32" width="4" height="4" rx="1" fill="#c94b2d"/><path d="M22 34h13" stroke="#aab4b6" stroke-width="2.2" stroke-linecap="round"/><rect x="15" y="40" width="4" height="4" rx="1" fill="none" stroke="#263238" stroke-width="1.5"/><path d="M22 42h10" stroke="#aab4b6" stroke-width="2.2" stroke-linecap="round"/><rect x="15" y="48" width="20" height="6" rx="2" fill="#c94b2d"/><path d="m40 30 20-10-6 22-6-7-8-5Z" fill="#263238"/><path d="m48 35 12-15" stroke="#fff" stroke-width="1.5"/>',
  // 2. Sākotnējā izvērtēšana: foto un rasējums uz galda, lupa
  '<rect x="4" y="14" width="30" height="24" rx="2" fill="#fff" stroke="#263238" stroke-width="2.5" transform="rotate(-8 19 26)"/><path d="m8 33 8-8 5 5 4-4 7 7" fill="none" stroke="#263238" stroke-width="2" stroke-linejoin="round" transform="rotate(-8 19 26)"/><circle cx="26" cy="20" r="2.5" fill="#c94b2d" transform="rotate(-8 19 26)"/><rect x="20" y="26" width="30" height="30" rx="2" fill="#d6f1f6" stroke="#263238" stroke-width="2.5"/><path d="M25 46 35 36l10 10" fill="none" stroke="#c94b2d" stroke-width="2.5" stroke-linejoin="round"/><path d="M25 50h20M35 36v14" stroke="#263238" stroke-width="1.5" stroke-dasharray="2.5 2.5"/><circle cx="48" cy="22" r="10" fill="#fff" fill-opacity=".9" stroke="#263238" stroke-width="3"/><path d="M45 20a3 3 0 1 1 4 2.8c-.7.3-1 .8-1 1.6v.6M48 28v.2" fill="none" stroke="#c94b2d" stroke-width="2.2" stroke-linecap="round"/><path d="m55 29 6 6" stroke="#263238" stroke-width="4.5" stroke-linecap="round"/>',
  // 3. Darbs objektā: māja, kāpnes, speciālists ar ķiveri uz jumta
  '<path d="M4 34 28 14l24 20" fill="none" stroke="#c94b2d" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/><path d="M10 31v27h36V31L28 17Z" fill="#fff" stroke="#263238" stroke-width="2.5" stroke-linejoin="round"/><rect x="23" y="42" width="10" height="16" fill="#f6c7b3" stroke="#263238" stroke-width="2"/><path d="M50 58 58 30M56 58l8-28" stroke="#263238" stroke-width="2.2" stroke-linecap="round"/><path d="M51.5 52h6M53.2 46h6M54.8 40h6M56.5 34h6" stroke="#263238" stroke-width="2"/><circle cx="46" cy="18" r="4" fill="#263238"/><path d="M41.5 16.5a4.5 4.5 0 0 1 9 0Z" fill="#e0a21a"/><path d="M42 22h8l1 10h-10Z" fill="#c94b2d"/><path d="M50 24l6 4" stroke="#263238" stroke-width="2.5" stroke-linecap="round"/><rect x="55" y="25" width="6" height="8" rx="1" fill="#fff" stroke="#263238" stroke-width="1.5"/>',
  // 4. Rezultāts: pārskats ar ķeksīšiem un apstiprinājuma zīmogs
  '<path d="M10 4h28l10 10v44a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" fill="#fff" stroke="#263238" stroke-width="2.5" stroke-linejoin="round"/><path d="M38 4v10h10" fill="none" stroke="#263238" stroke-width="2.5" stroke-linejoin="round"/><path d="M14 12h16" stroke="#c94b2d" stroke-width="3" stroke-linecap="round"/><path d="m14 23 2 2 4-4M14 33l2 2 4-4M14 43l2 2 4-4" fill="none" stroke="#1f9d6b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 23h16M24 33h14M24 43h10" stroke="#aab4b6" stroke-width="2.5" stroke-linecap="round"/><circle cx="47" cy="47" r="12" fill="#1f9d6b"/><circle cx="47" cy="47" r="8.5" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="2 2"/><path d="m42.5 47 3 3 6-6" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
];
const processIcon = (i) => `<div class="process-illus" aria-hidden="true"><svg viewBox="0 0 64 64">${PROCESS_ICONS[i]}</svg></div>`;

// ---------------------------------------------------------------- Pakalpojumi
// key = pieteikuma formas pakalpojuma atslēga (kontakti/?pakalpojums=key)
const SERVICES = [
  {
    slug: "tehniska-apsekosana", key: "apsekosana", icon: "search", ru: "ru/uslugi/obsledovanie-kryshi/",
    old: "jumtu-ekspertize",
    name: "Tehniskā apsekošana", short: "Jumta, fasādes vai visas ēkas stāvokļa novērtējums.",
    img: "assets/objects/jeb-object-historic-roof-context.jpg",
    title: "Jumta un ēkas tehniskā apsekošana",
    description: "Jumta, fasādes, konstrukciju un visas ēkas tehniskā apsekošana: defektu, nolietojuma un bojājumu cēloņu novērtējums ar ieteikumiem remontam.",
    eyebrow: "Tehniskā apsekošana",
    intro: "Novērtējam jumta, fasādes, konstrukciju vai visas ēkas stāvokli, fiksējam defektus un nolietojumu un sniedzam skaidrus ieteikumus turpmākai rīcībai.",
    cta: "Pieteikt apsekošanu",
    includesTitle: "Ko apsekojam",
    includesIntro: "Apsekošanas apjomu precizējam pēc situācijas, piekļuves iespējām un pieejamajiem dokumentiem.",
    subs: [
      ["Jumta tehniskā apsekošana", "Segums, pieslēgumi, ūdens novadīšana, jumta konstrukcijas un iepriekšējie remonti."],
      ["Visas ēkas tehniskā apsekošana", "Jumts, fasādes, norobežojošās konstrukcijas un ēkas kopējais tehniskais stāvoklis."],
      ["Atsevišķu ēkas daļu vai konstrukciju apsekošana", "Konkrēts mezgls, konstrukcija vai bojājuma zona, kur nepieciešama precīza atbilde."],
      ["Fasādes tehniskā apsekošana", "Apdare, savienojumi, malu zonas un fasādes pieslēgumi jumtam un logiem."],
      ["Terases vai balkona tehniskā apsekošana", "Hidroizolācija, slīpumi, pieslēgumi un ūdens novadīšana no terasēm un balkoniem."],
    ],
    when: [
      ["Jumts vai fasāde rāda bojājuma vai nolietojuma pazīmes", "Plaisas, deformācijas, atslāņojumi vai mitruma traipi liecina, ka konstrukcijai vajadzīga uzmanība."],
      ["Pirms remonta jāsaprot faktiskais stāvoklis", "Remonta apjoms var būt lielāks vai mazāks, nekā šķiet. Apsekošana parāda, ko remontēt un ko var atstāt."],
      ["Pēc vētras, avārijas vai ilgstošas noplūdes", "Jāpārbauda, vai bojājums nav skāris konstrukcijas un vai ēku var droši ekspluatēt."],
      ["Jāplāno ēkas uzturēšana vairākiem gadiem", "Apsaimniekotājam vai īpašniekam vajadzīgs pārskats par prioritātēm un riska vietām."],
    ],
    results: [
      ["Rakstisks pārskats ar fotofiksāciju", "Konstatētie defekti, to atrašanās vietas un fotoattēli vienuviet."],
      ["Defektu cēloņi un riska vietas", "Skaidrojums, kāpēc bojājums radies un kur problēma var atkārtoties."],
      ["Ieteikumi remontam un prioritātes", "Kas jādara steidzami, kas var pagaidīt un kādi risinājumi ir piemēroti."],
    ],
    objects: ["sv-petera-baznica", "rigas-doma-baznica", "satversmes-tiesa"],
    related: ["nopludes-un-hidroizolacija", "apsekosana-pirms-iegades", "projekti-un-mezgli"],
  },
  {
    slug: "apsekosana-pirms-iegades", key: "pirms-iegades", icon: "house", ru: null,
    name: "Apsekošana pirms iegādes", short: "Neatkarīga pārbaude pirms mājas vai dzīvokļa pirkšanas.",
    img: "assets/objects/jeb-object-facade-project-context.jpg",
    title: "Būves apsekošana pirms iegādes",
    description: "Ēkas, dzīvokļa vai komercēkas tehniskā apsekošana pirms iegādes: jumta, fasādes un konstrukciju stāvoklis, defekti un nepieciešamie remontdarbi.",
    eyebrow: "Pirms iegādes",
    intro: "Pirms mājas, dzīvokļa vai komercēkas pirkšanas pārbaudām jumta, fasādes un konstrukciju stāvokli, lai jūs zinātu, ko pērkat un kādi ieguldījumi būs vajadzīgi.",
    cta: "Pieteikt apsekošanu",
    includesTitle: "Ko pārbaudām pirms darījuma",
    includesIntro: "Apsekošanu var veikt vienā apmeklējumā, lai rezultāts būtu pieejams pirms lēmuma pieņemšanas.",
    subs: [
      ["Ēkas apsekošana pirms iegādes", "Jumts, fasādes, pamati, bēniņi un redzamās konstrukcijas privātmājai vai komercēkai."],
      ["Dzīvokļa vai telpu apsekošana pirms iegādes", "Telpu stāvoklis, mitruma pazīmes un ēkas kopīpašuma daļu stāvoklis."],
      ["Jumta un fasādes stāvokļa pārbaude", "Dārgākās ēkas daļas, kuru remonts būtiski ietekmē kopējās izmaksas."],
      ["Defektu un nepieciešamo remontdarbu izvērtēšana", "Kuri defekti ir kosmētiski un kuri prasīs nopietnus ieguldījumus."],
    ],
    when: [
      ["Pirms darījuma vēlaties neatkarīgu skatījumu", "Pārdevēja apraksts ne vienmēr atklāj ēkas tehnisko stāvokli."],
      ["Redzat pazīmes, kuras nesaprotat", "Plaisas, traipi, svaigs remonts vai nepatīkama smaka var slēpt nopietnāku problēmu."],
      ["Jāizvērtē, vai cena atbilst stāvoklim", "Konstatētie defekti ir pamatots arguments sarunā par cenu."],
      ["Jāplāno remonta budžets pēc iegādes", "Zinot prioritātes, varat plānot ieguldījumus jau pirms pirkuma."],
    ],
    results: [
      ["Pārskats par galvenajiem riskiem", "Būtiskākie defekti un vietas, kurām jāpievērš uzmanība."],
      ["Nepieciešamo darbu saraksts", "Darbi un to prioritātes, kas palīdz novērtēt nākotnes izmaksas."],
      ["Argumenti sarunai ar pārdevēju", "Tehniski pamatota informācija cenas vai darījuma nosacījumu sarunai."],
    ],
    objects: [],
    related: ["tehniska-apsekosana", "nopludes-un-hidroizolacija", "konsultacijas"],
  },
  {
    slug: "nopludes-un-hidroizolacija", key: "noplude", icon: "drop", ru: "ru/uslugi/proverka-gidroizolyatsii/",
    old: "hidroizolacijas-parbaude",
    name: "Noplūdes un hidroizolācija", short: "Noplūžu cēloņi, mitrums un hidroizolācijas pārbaude.",
    img: "assets/objects/jeb-object-national-library-context.jpg",
    title: "Noplūžu cēloņu noteikšana un hidroizolācijas pārbaude",
    description: "Jumta, terases un balkona noplūžu cēloņu noteikšana, hidroizolācijas hermētiskuma pārbaude, mitruma, kondensāta un pelējuma cēloņu izvērtēšana.",
    eyebrow: "Noplūdes un mitrums",
    intro: "Noskaidrojam, pa kurieni ūdens iekļūst konstrukcijā — jumtā, terasē, balkonā vai pieslēgumos — un kā noplūdi novērst ilgtermiņā.",
    cta: "Pieteikt pārbaudi",
    includesTitle: "Ko pārbaudām",
    includesIntro: "Mitrums bieži parādās citur, nekā ir faktiskā ūdens iekļūšanas vieta, tāpēc pārbaudām visu ūdens ceļu.",
    subs: [
      ["Jumta noplūžu cēloņu noteikšana", "Segums, pieslēgumi, caurlaidumi, notekas un vietas, kur ūdens var nonākt zem seguma."],
      ["Terases vai balkona noplūžu cēloņu noteikšana", "Hidroizolācija, slīpumi, sliekšņi un pieslēgumi pie sienām."],
      ["Hidroizolācijas hermētiskuma pārbaude", "Hidroizolācijas slāņa nepārtrauktības un savienojumu pārbaude."],
      ["Jumta konstrukcijas mitruma pārbaude", "Mitruma līmenis un tā ietekme uz koka un citām konstrukcijām."],
      ["Kondensāta un pelējuma cēloņu izvērtēšana", "Ventilācija, tvaika izolācija un siltumizolācija bēniņos un jumtā."],
    ],
    when: [
      ["Jumts tek arī pēc remonta", "Iespējams, remonts veikts citā vietā, nekā ir faktiskais cēlonis."],
      ["Mitruma traipi parādās tālu no bojājuma", "Ūdens pa konstrukciju var aizplūst vairākus metrus."],
      ["Terase vai balkons laiž ūdeni uz apakšējām telpām", "Jāpārbauda hidroizolācija, slīpumi un pieslēgumi."],
      ["Bēniņos ir kondensāts vai pelējums", "Problēma var būt ventilācijā vai tvaika izolācijā, nevis segumā."],
    ],
    results: [
      ["Ūdens iekļūšanas vietas un cēloņi", "Konkrētas vietas un skaidrojums, kāpēc ūdens nonāk konstrukcijā."],
      ["Novēršanas risinājums", "Piemērots risinājums un darbu secība, lai problēma neatkārtotos."],
      ["Pamats sarunai ar būvnieku", "Tehniski pamatota informācija garantijas defektu novēršanai."],
    ],
    objects: ["sv-petera-baznica", "nacionala-biblioteka"],
    related: ["tehniska-apsekosana", "uzraudziba", "konsultacijas"],
  },
  {
    slug: "uzraudziba", key: "uzraudziba", icon: "helmet", ru: "ru/uslugi/stroitelnyy-nadzor/",
    old: "buvuzraudziba",
    name: "Būvuzraudzība un tehniskā uzraudzība", short: "Būvuzraudzība, tehniskā un autoruzraudzība.",
    img: "assets/objects/cc-riga-constructions-zunda-towers.jpg",
    title: "Būvuzraudzība, tehniskā uzraudzība un autoruzraudzība",
    description: "Jumta, fasādes un hidroizolācijas darbu būvuzraudzība, tehniskā uzraudzība un autoruzraudzība: kvalitātes kontrole no darbu sākuma līdz pieņemšanai.",
    eyebrow: "Uzraudzība",
    intro: "Neatkarīga jumta, fasādes un hidroizolācijas darbu kontrole būvniecības laikā — no materiālu piegādes līdz darbu pieņemšanai.",
    cta: "Pieteikt uzraudzību",
    includesTitle: "Uzraudzības veidi",
    includesIntro: "Uzraudzības veidu izvēlamies pēc objekta, būvdarbu apjoma un pasūtītāja vajadzībām.",
    subs: [
      ["Būvuzraudzība", "Būvuzrauga pienākumi būvdarbu laikā saskaņā ar būvniecības regulējumu."],
      ["Tehniskā uzraudzība", "Pasūtītāja interešu pārstāvība un darbu kvalitātes kontrole objektā."],
      ["Autoruzraudzība", "Izstrādāto mezglu un tehnisko risinājumu izpildes kontrole būvdarbu laikā."],
      ["Būvdarbu posmu kvalitātes pārbaude", "Atsevišķu, kritisku darbu posmu pārbaude pirms tos nosedz nākamie slāņi."],
      ["Izpildīto darbu pārbaude pirms pieņemšanas", "Neatbilstību fiksēšana pirms darbu pieņemšanas un samaksas."],
      ["Defektu novēršanas kontrole", "Pārbaude, vai konstatētie defekti novērsti pilnībā un pareizi."],
    ],
    when: [
      ["Plānojat jumta pārbūvi vai jaunu jumtu", "Kvalitāti visvieglāk nodrošināt, ja mezglus pārbauda izbūves brīdī."],
      ["Vajadzīga neatkarīga kvalitātes kontrole", "Pasūtītājam ir svarīgs no būvnieka neatkarīgs tehniskais skatījums."],
      ["Tuvojas darbu pieņemšana", "Pirms parakstīšanas jāpārliecinās, ka darbi atbilst projektam un līgumam."],
      ["Jānovērš garantijas defekti", "Jākontrolē, lai defekti tiktu novērsti tehniski pareizi."],
    ],
    results: [
      ["Regulāra darbu kontrole", "Apmeklējumi objektā un fiksētas neatbilstības ar fotoattēliem."],
      ["Laikus pamanīti riski", "Mezglu izbūves kļūdas tiek labotas, pirms tās nosedz nākamie slāņi."],
      ["Pārliecība par pieņemtajiem darbiem", "Darbi pieņemti atbilstoši projektam un labai būvniecības praksei."],
    ],
    objects: ["krustpils-baznica", "rezeknes-slimnica", "sv-petera-baznica"],
    related: ["projekti-un-mezgli", "tehniska-apsekosana", "jumta-drosibas-sistemas"],
  },
  {
    slug: "projekti-un-mezgli", key: "projekti", icon: "square", ru: "ru/uslugi/analiz-proekta/",
    old: "projektu-analize",
    name: "Projekti un mezglu izstrāde", short: "Risinājumu izvērtēšana, mezgli, darbu apjomi un tāmes.",
    img: "assets/objects/jeb-object-facade-project-context.jpg",
    title: "Projektu izvērtēšana un mezglu izstrāde",
    description: "Būvprojektu jumta, fasādes un hidroizolācijas risinājumu izvērtēšana, mezglu izstrāde, materiālu savietojamība, darbu apjomu un tāmju pārbaude.",
    eyebrow: "Projekti un mezgli",
    intro: "Pārbaudām projektētos jumta, fasādes un hidroizolācijas risinājumus un izstrādājam mezglus, kurus var kvalitatīvi izbūvēt.",
    cta: "Pieteikt izvērtēšanu",
    includesTitle: "Projektu izvērtēšana un mezgli",
    includesIntro: "Pareizi izstrādāts mezgls ir lētāks par noplūdes novēršanu pēc būvdarbiem.",
    subs: [
      ["Būvprojekta risinājumu izvērtēšana", "Jumta, fasādes un hidroizolācijas risinājumu pārbaude pirms būvdarbiem."],
      ["Jumta konstrukcijas un slāņu sastāva izvērtēšana", "Slāņu secība, ventilācija, tvaika un siltumizolācija."],
      ["Jumta, fasādes un hidroizolācijas mezglu izstrāde", "Izbūvei piemēroti mezglu rasējumi sarežģītām vietām."],
      ["Esošo mezglu pārbaude un precizēšana", "Projektā paredzēto mezglu korekcijas un papildinājumi."],
      ["Remonta un atjaunošanas risinājumu izstrāde", "Tehniskie risinājumi esošu, arī vēsturisku, jumtu atjaunošanai."],
      ["Materiālu savietojamības izvērtēšana", "Vai izvēlētie materiāli ir savietojami un piemēroti konkrētajai vietai."],
    ],
    extra: {
      title: "Darbu apjomi un tāmes",
      intro: "Pēc mūsu izstrādātajiem risinājumiem daudzos objektos sagatavotas darbu tāmes.",
      items: [
        ["Remontdarbu un prioritāšu noteikšana", "Kas jādara vispirms un ko var plānot vēlāk."],
        ["Darbu un materiālu apjomu noteikšana", "Apjomi, uz kuru pamata būvnieki var sagatavot salīdzināmus piedāvājumus."],
        ["Tāmju apjomu un pozīciju pārbaude", "Vai tāmē iekļauts viss nepieciešamais un nav lieku pozīciju."],
        ["Būvnieku piedāvājumu salīdzināšana", "Tehniski pamatots piedāvājumu salīdzinājums pirms līguma slēgšanas."],
      ],
    },
    when: [
      ["Pirms būvdarbiem jāpārbauda projekts", "Neskaidri vai neizbūvējami mezgli būvdarbu laikā rada sadārdzinājumu."],
      ["Projektā trūkst sarežģīto vietu risinājumu", "Pieslēgumi, caurlaidumi un malu zonas jāizstrādā detalizēti."],
      ["Jāatjauno vēsturisks jumts", "Vajadzīgi risinājumi, kas saglabā vēsturisko izskatu un darbojas tehniski."],
      ["Jāsalīdzina būvnieku piedāvājumi", "Vienādi apjomi ļauj salīdzināt cenas godīgi."],
    ],
    results: [
      ["Izbūvējami mezglu risinājumi", "Rasējumi un apraksti, pēc kuriem būvnieks var strādāt."],
      ["Laikus pamanītas projekta kļūdas", "Riskanti risinājumi labojami, pirms tie nonāk objektā."],
      ["Pamatoti apjomi un tāmes", "Skaidrs darbu apjoms budžeta plānošanai un iepirkumam."],
    ],
    objects: ["rigas-doma-baznica", "rundales-pils", "nacionala-biblioteka", "rigas-pils"],
    related: ["uzraudziba", "tehniska-apsekosana", "konsultacijas"],
  },
  {
    slug: "jumta-drosibas-sistemas", key: "drosiba", icon: "shield", ru: null,
    name: "Jumta drošības sistēmas", short: "Kritiena aizsardzība un droša piekļuve jumtam.",
    img: "assets/objects/jeb-object-construction-context.jpg",
    title: "Jumta drošības sistēmas",
    description: "Jumta drošības un kritiena aizsardzības sistēmu apsekošana, izvietojuma un risinājumu izvērtēšana, dokumentācijas pārbaude un konsultācijas.",
    eyebrow: "Drošība uz jumta",
    intro: "Apsekojam kritiena aizsardzības sistēmas, izvērtējam to izvietojumu un dokumentāciju, lai jumtu varētu droši apkopt un remontēt.",
    cta: "Pieteikt pārbaudi",
    includesTitle: "Ko pārbaudām",
    includesIntro: "Kompetence balstīta Vācijā iegūtā apmācībā drošības sistēmu projektēšanā, apsekošanā un montāžā.",
    subs: [
      ["Esošo drošības sistēmu apsekošana", "Enkurpunktu, trošu sistēmu, kāpņu un ieeju stāvokļa pārbaude."],
      ["Izvietojuma un risinājumu izvērtēšana", "Vai sistēma aptver visas zonas, kurās jāstrādā uz jumta."],
      ["Dokumentācijas pārbaude", "Montāžas, pārbaužu un ekspluatācijas dokumentu pilnīgums."],
      ["Konsultācija par drošu piekļuvi un apkopi", "Kā organizēt drošu jumta apkopi un tīrīšanu."],
    ],
    when: [
      ["Uz jumta regulāri strādā cilvēki", "Apkopei, tīrīšanai un iekārtu servisam vajadzīga droša piekļuve."],
      ["Sistēma uzstādīta sen vai bez dokumentiem", "Jāpārliecinās, ka stiprinājumi un elementi joprojām ir droši."],
      ["Plānojat jumta pārbūvi vai saules paneļus", "Drošības sistēmu labāk paredzēt jau projektā."],
    ],
    results: [
      ["Sistēmas stāvokļa novērtējums", "Kuri elementi ir kārtībā un kuri jānomaina vai jāpapildina."],
      ["Ieteikumi izvietojumam", "Kur nepieciešami papildu enkurpunkti vai cits risinājums."],
      ["Sakārtota dokumentācija", "Saraksts ar trūkstošajiem dokumentiem un pārbaudēm."],
    ],
    objects: [],
    related: ["uzraudziba", "projekti-un-mezgli", "apmacibas-un-seminari"],
  },
  {
    slug: "konsultacijas", key: "konsultacija", icon: "chat", ru: "ru/uslugi/konsultatsii/",
    name: "Konsultācijas", short: "Jumts, fasāde, terase, materiāli un ēkas uzturēšana.",
    img: "assets/objects/cc-riga-castle.jpg",
    title: "Konsultācijas par jumtiem, fasādēm un hidroizolāciju",
    description: "Tehniskas konsultācijas īpašniekiem, apsaimniekotājiem, projektētājiem un būvniekiem par jumtiem, fasādēm, hidroizolāciju, materiāliem un ēku uzturēšanu.",
    eyebrow: "Konsultācijas",
    intro: "Praktisks tehniskais skatījums īpašniekiem, apsaimniekotājiem, projektētājiem un būvniekiem — pirms remonta, materiālu izvēles vai nākamā lēmuma.",
    cta: "Pieteikt konsultāciju",
    includesTitle: "Par ko konsultējam",
    includesIntro: "Konsultācija var notikt pa tālruni, video zvanā vai objektā.",
    subs: [
      ["Jumti", "Seguma izvēle, remonts, pārbūve un jumta konstrukciju jautājumi."],
      ["Fasādes", "Ventilējamās, keramiskās, metāla un šķiedrcementa fasādes un to pieslēgumi."],
      ["Terases, balkoni un hidroizolācija", "Hidroizolācijas materiāli, slīpumi un pieslēgumi."],
      ["Materiāli un to iestrāde", "Dakstiņi, šīferis, metāls, membrānas, bitumens, zaļie un niedru jumti."],
      ["Ēkas uzturēšana un remonts", "Apkopes plānošana un remontu prioritātes."],
    ],
    when: [
      ["Jāizvēlas materiāls vai risinājums", "Neatkarīgs viedoklis pirms pirkuma vai līguma."],
      ["Nav skaidrs, kāds pakalpojums vajadzīgs", "Sākotnējā sarunā noskaidrosim, vai pietiek ar konsultāciju vai vajag apsekošanu."],
      ["Jāsagatavojas sarunai ar būvnieku", "Tehniski argumenti sarunai par risinājumiem vai defektiem."],
    ],
    results: [
      ["Skaidra atbilde uz konkrēto jautājumu", "Bez liekas sarežģītības un ar praktisku pamatojumu."],
      ["Ieteikts nākamais solis", "Vai vajadzīga apsekošana, projekts, remonts vai papildu pārbaude."],
      ["Pieredze no daudziem objektiem", "Zināšanas par materiāliem un risinājumiem, kas darbojas praksē."],
    ],
    objects: ["rigas-pils", "rundales-pils"],
    related: ["tehniska-apsekosana", "projekti-un-mezgli", "apmacibas-un-seminari"],
  },
  {
    slug: "apmacibas-un-seminari", key: "apmacibas", icon: "board", ru: null,
    name: "Apmācības un semināri", short: "Praktiskas apmācības un teorētiski semināri.",
    img: "assets/objects/jeb-object-historic-roof-context-crop.jpg",
    title: "Apmācības un semināri par jumtiem un hidroizolāciju",
    description: "Praktiskas apmācības materiālu iestrādē un teorētiski semināri par jumtiem un hidroizolāciju būvniekiem, projektētājiem, arhitektiem un apsaimniekotājiem.",
    eyebrow: "Apmācības",
    intro: "Praktiskas apmācības materiālu iestrādē un teorētiski semināri par jumtiem un hidroizolāciju būvniekiem, projektētājiem un ēku apsaimniekotājiem.",
    cta: "Pieteikt apmācības",
    includesTitle: "Apmācību programmas",
    includesIntro: "Programmu pielāgojam dalībnieku pieredzei, objektu veidiem un uzņēmuma vajadzībām.",
    subs: [
      ["Praktiskās apmācības materiālu iestrādē", "Mezglu izbūve un materiālu iestrāde ar praktiskiem uzdevumiem."],
      ["Teorētiskie semināri", "Jumtu uzbūve, hidroizolācija, biežākās kļūdas un to novēršana."],
      ["Apmācības būvniekiem un darbu vadītājiem", "Kvalitātes kontrole, darbu secība un mezglu izpilde objektā."],
      ["Semināri projektētājiem un arhitektiem", "Izbūvējami mezgli un materiālu savietojamība projektos."],
      ["Apmācības apsaimniekotājiem", "Jumtu apkope, apsekošana un bojājumu agrīna atpazīšana."],
      ["Individuāla programma uzņēmumam", "Apmācības pēc uzņēmuma vajadzībām un objektu specifikas."],
    ],
    when: [
      ["Uzņēmumā ir jauni darbinieki", "Pamatzināšanas par jumtu uzbūvi un kvalitatīvu darbu izpildi."],
      ["Atkārtojas vienas un tās pašas kļūdas", "Apmācība, kas vērsta uz konkrētām problēmām objektos."],
      ["Jāapgūst jauns materiāls vai sistēma", "Praktiska iestrāde un mezglu risinājumi."],
    ],
    results: [
      ["Praktiskas zināšanas", "Prasmes, kuras var uzreiz izmantot objektā."],
      ["Pieredzējis lektors", "Lektora darbs arodskolās un nozares semināros kopš 2010. gada."],
      ["Programma jūsu vajadzībām", "Saturs, ilgums un formāts pēc vienošanās."],
    ],
    objects: [],
    related: ["konsultacijas", "jumta-drosibas-sistemas", "projekti-un-mezgli"],
  },
];
const serviceBySlug = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));

// ---------------------------------------------------------------- Objekti (no A. Liedes CV)
const FEATURED_OBJECTS = [
  {
    id: "krustpils-baznica", name: "Krustpils baznīcas jumta pārbūve", type: "Sakrāla ēka · Jēkabpils",
    img: "assets/objects/krustpils-baznica-jumta-parbuve.jpg",
    img2: "assets/objects/krustpils-baznica-gada-buve-2025.jpg",
    img2Alt: "Apbalvošana skatē Gada labākā būve Latvijā 2025",
    imgAlt: "Krustpils baznīca jumta pārbūves laikā",
    award: "2. vieta · Gada labākā būve Latvijā 2025",
    work: "Jumta seguma nomaiņa un konstrukciju atjaunošana",
    role: "Atbildīgais būvuzraugs un projekta mezglu konsultants",
    note: "Krustpils baznīcas jumta pārbūve ieguva 2. vietu skatē „Gada labākā būve Latvijā 2025”.",
  },
  { id: "rigas-doma-baznica", name: "Rīgas Doma baznīca", type: "Vēsturiska sakrāla ēka · Rīga", img: "assets/objects/rigas-doma-baznica.webp", imgAlt: "Rīgas Doma baznīca", work: "Jumta pārbūve", role: "Jumta pārbūves projekta risinājumi, konsultācijas darbu laikā, jumta tehniskā apsekošana" },
  { id: "sv-petera-baznica", name: "Rīgas Sv. Pētera baznīca", type: "Vēsturiska sakrāla ēka · Rīga", img: "assets/objects/sv-petera-baznica.jpg", imgAlt: "Rīgas Sv. Pētera baznīca", work: "Jumta apsekošana un avārijas seku likvidēšana", role: "Jumta tehniskā apsekošana, avārijas seku likvidēšanas darbu uzraudzība" },
  { id: "rundales-pils", name: "Rundāles pils", type: "Pils un muzejs · Rundāle", img: "assets/objects/rundales-pils.jpg", imgAlt: "Rundāles pils", work: "Jumta pārbūve", role: "Jumta pārbūves projekta risinājumi, konsultācijas darbu laikā, jumta tehniskā apsekošana" },
  { id: "rigas-pils", name: "Rīgas pils", type: "Vēsturiska ēka · Rīga", img: "assets/objects/cc-riga-castle.jpg", imgAlt: "Rīgas pils", work: "Jumta pārbūve", role: "Jumta pārbūves projekta risinājumi, konsultācijas darbu laikā" },
  { id: "nacionala-biblioteka", name: "Latvijas Nacionālā bibliotēka", type: "Publiska ēka · Rīga", img: "assets/objects/jeb-object-national-library-context.jpg", imgAlt: "Latvijas Nacionālā bibliotēka", work: "Jumta risinājumi", role: "Projekta risinājumi, pēc kuriem iztāmēti veicamie darbi" },
  { id: "rezeknes-slimnica", name: "Rēzeknes slimnīca", type: "Publiska ēka · Rēzekne", work: "Jumta pārbūve", role: "Būvuzraugs un projekta tehniskais konsultants" },
  { id: "satversmes-tiesa", name: "Satversmes tiesas ēka", type: "Publiska ēka · Rīga", img: "assets/objects/satversmes-tiesa.jpg", imgAlt: "Satversmes tiesas ēka Rīgā", work: "Tehniskā apsekošana", role: "Tehniskais apsekojums un ieteikumi tehniskajam risinājumam" },
];
const objectById = Object.fromEntries(FEATURED_OBJECTS.map((o) => [o.id, o]));

const OBJECT_GROUPS = [
  ["Sakrālās ēkas", [
    ["Rīgas Doma baznīca", "Jumta pārbūves risinājumi, konsultācijas, apsekošana"],
    ["Rīgas Sv. Pētera baznīca", "Apsekošana, avārijas seku likvidēšanas uzraudzība"],
    ["Krustpils baznīca", "Atbildīgais būvuzraugs, projekta mezglu konsultants"],
    ["Jēkaba baznīca", "Jumta pārbūves risinājumi, konsultācijas"],
    ["Cēsu baznīca", "Jumta pārbūves risinājumi, konsultācijas"],
    ["Īles baznīca", "Jumta pārbūves risinājumi, konsultācijas"],
    ["Piņķu baznīca", "Jumta risinājumi, konstrukciju un seguma pārbūve"],
    ["Iecavas baznīca", "Jumta projekta risinājumi, apsekošana ar rekomendācijām"],
  ]],
  ["Pilis, muižas un vēsturiskas ēkas", [
    ["Rundāles pils", "Jumta pārbūves risinājumi, konsultācijas, apsekošana"],
    ["Rundāles pils zirgu stallis", "Tehniskais apsekojums un ieteikumi"],
    ["Rīgas pils", "Jumta pārbūves risinājumi, konsultācijas"],
    ["Cēsu pils", "Jumta pārbūves risinājumi, konsultācijas"],
    ["Siguldas jaunā pils", "Jumta pārbūves risinājumi, konsultācijas"],
    ["Tukuma pils tornis", "Risinājumi, konsultācijas, tehniskais apsekojums"],
    ["Jaunmoku pils", "Projekta risinājumi darbu tāmēšanai"],
    ["Jaunpils pils", "Projekta risinājumi darbu tāmēšanai"],
    ["Dobeles pilsdrupas", "Jumta pārbūves risinājumi, konsultācijas"],
    ["Ķipēnu muižas kungu māja", "Jumta risinājumi, konstrukciju un seguma pārbūve"],
    ["Neretas muiža", "Jumta pārbūves risinājumi, konsultācijas"],
    ["Jēkaba kazarmas, Torņa iela 4", "Risinājumi, konsultācijas, apsekošana ar rekomendācijām"],
    ["Rīgas nocietinājuma mūris un tornis, Trokšņu iela", "Jumta pārbūves risinājumi, konsultācijas"],
    ["Triangula bastions", "Projekta risinājumi, konsultācijas darbu laikā"],
  ]],
  ["Publiskās ēkas", [
    ["Latvijas Nacionālā bibliotēka", "Projekta risinājumi darbu tāmēšanai"],
    ["Satversmes tiesas ēka", "Tehniskais apsekojums un ieteikumi"],
    ["Finanšu ministrijas ēka, Smilšu iela 1", "Jumta pārbūves risinājumi, konsultācijas"],
    ["Ekonomikas ministrijas ēka, Brīvības iela 55", "Risinājumi, konsultācijas, apsekošana ar rekomendācijām"],
    ["Latvijas Nacionālais teātris", "Rekonstrukcijas jumta risinājumi, konsultācijas"],
    ["Jaunais Rīgas teātris", "Jumta pārbūves risinājumi, konsultācijas"],
    ["VEF kultūras pils", "Jumta pārbūves risinājumi, konsultācijas"],
    ["Mežaparka estrāde", "Projekta risinājumi, konsultācijas darbu laikā"],
    ["Muzeju krātuves komplekss, Pulka iela 8", "Projekta risinājumi, konsultācijas darbu laikā"],
    ["Rīgas 1. slimnīca", "Jumta risinājumi, konsultācijas, apsekošana"],
    ["Rēzeknes slimnīca", "Būvuzraugs un projekta tehniskais konsultants"],
    ["Ogres bibliotēka", "Jumta pārbūves risinājumi, konsultācijas"],
    ["Ventspils mūzikas vidusskola", "Projekta risinājumi, konsultācijas darbu laikā"],
    ["Dobeles mūzikas skola", "Projekta risinājumi, konsultācijas darbu laikā"],
    ["Līgatnes bērnudārzs", "Projekta risinājumi, konsultācijas darbu laikā"],
    ["Stopiņu kultūras centrs „Ulbrokas Pērle”", "Projekta risinājumi, konsultācijas darbu laikā"],
    ["RSU sporta bāze Taurenē", "Jumta pārbūves risinājumi, konsultācijas"],
  ]],
  ["Komercēkas un dzīvojamās ēkas", [
    ["Tirdzniecības centrs „Akropole”", "Projekta risinājumi darbu tāmēšanai"],
    ["Tirdzniecības centrs „Alfa”", "Projekta risinājumi, konsultācijas darbu laikā"],
    ["ZZ Tower", "Projekta risinājumi, konsultācijas darbu laikā"],
    ["Rēzeknes SPA", "Projekta risinājumi, konsultācijas darbu laikā"],
    ["RIMI noliktavas, Deglava iela 161", "Projekta risinājumi, konsultācijas darbu laikā"],
    ["Magdalēnas nami, Antonijas iela", "Projekta risinājumi, konsultācijas darbu laikā"],
    ["Dzīvojamā ēka, Miera iela 25", "Projekta risinājumi, konsultācijas darbu laikā"],
  ]],
  ["Niedru jumti", [
    ["Latvijas Etnogrāfiskais brīvdabas muzejs", "Niedru jumtu restaurācija lielākajai daļai ēku"],
    ["Ventspils brīvdabas muzejs", "Niedru jumtu restaurācija"],
    ["Jaunpiebalgas muzejs", "Niedru jumtu restaurācija"],
    ["Meņģeļi un Braki", "Niedru jumtu restaurācija"],
    ["Atpūtas komplekss „Lido”, Krasta iela", "Niedru jumtu izbūve, risinājumi un konsultācijas"],
  ]],
];

// ---------------------------------------------------------------- Kopīgās daļas
const rel = (depth) => (depth === 0 ? "./" : "../".repeat(depth));
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const pad = (n) => String(n).padStart(2, "0");

function makeLinks(depth) {
  const r = rel(depth);
  const to = (p) => r + p + "index.html";
  return {
    r,
    to,
    form: (key) => `${r}kontakti/index.html${key ? `?pakalpojums=${key}` : ""}#konsultacijas`,
    asset: (p) => r + p,
  };
}

const MENU_SCRIPT = `<script type="module">const t=document.querySelector(".menu-toggle"),n=document.querySelector("#primary-nav");t?.addEventListener("click",()=>{const e=t.getAttribute("aria-expanded")==="true";t.setAttribute("aria-expanded",String(!e)),n?.classList.toggle("is-open",!e)});const a=Array.from(document.querySelectorAll("[data-lang-link]"));window.location.hash&&a.forEach(e=>{e.href=\`\${e.pathname}\${window.location.hash}\`});</script>`;
const HASH_SCRIPT = `<script type="module">const e=()=>{if(!window.location.hash)return;const t=document.querySelector(window.location.hash);(t?.querySelector("h1, h2")??t)?.scrollIntoView({block:"start"})};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e();window.addEventListener("load",e,{once:!0});window.setTimeout(e,300);</script>`;

const FOOTER_TEXT = "Jumtu un ēku tehniskā apsekošana, būvuzraudzība, tehniskie risinājumi un apmācības. Praktiskā pieredze kopš 1989. gada.";

function footerServices(to) {
  return SERVICES.map((s) => `<li><a href="${to(`pakalpojumi/${s.slug}/`)}">${esc(s.name)}</a></li>`).join("");
}

function header(L, lvPath, ruPath) {
  const to = L.to;
  return `<a class="skip-link" href="#main">Pāriet uz saturu</a> <header class="site-header"> <div class="container header-inner"> <a class="brand" href="${to("")}" aria-label="Jumtu ekspertīžu birojs sākums"> <picture> <img class="brand-logo" src="${L.asset("assets/brand/jeb-logo-full.png")}" alt="Jumtu ekspertīžu birojs"> </picture> </a> <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav"> <span></span> <span></span> <span></span> <span class="sr-only">Atvērt navigāciju</span> </button> <nav id="primary-nav" class="primary-nav" aria-label="Galvenā navigācija"> <a href="${to("")}">Sākums</a><a href="${to("pakalpojumi/")}">Pakalpojumi</a><a href="${to("objekti/")}">Objekti</a><a href="${to("sertifikati/")}">Sertifikāti</a><a href="${to("par-mums/")}">Par mums</a><a href="${to("kontakti/")}">Kontakti</a> <div class="language-switcher" aria-label="Valoda"> <a href="${to(lvPath)}" data-lang-link class="is-active" lang="lv" hreflang="lv">LV</a> <a href="${to(ruPath)}" data-lang-link lang="ru" hreflang="ru">RU</a> </div> <a class="nav-cta" href="${L.form()}">Pieteikt pakalpojumu</a> </nav> </div> </header> ${MENU_SCRIPT}`;
}

function footer(L) {
  const to = L.to;
  return `<footer class="site-footer"> <div class="container footer-grid"> <section> <img class="footer-logo" src="${L.asset("assets/brand/jeb-logo-full.png")}" alt="Jumtu ekspertīžu birojs"> <p>${FOOTER_TEXT}</p> </section> <section> <h2>Pakalpojumi</h2> <ul> ${footerServices(to)} </ul> </section> <section> <h2>Kontakti</h2> <ul> <li><a href="mailto:${EMAIL}">${EMAIL}</a></li> <li><a href="${PHONE_HREF}">${PHONE}</a></li> <li><a href="tel:+37167520399">+371 67520399</a></li> <li>${ADDRESS}</li> </ul> </section> <section> <h2>Juridiski</h2> <ul> <li><a href="${to("privatuma-politika/")}">Privātuma politika</a></li> <li><a href="${to("juridiska-informacija/")}">Juridiskā informācija</a></li> <li>&quot;Jumtu ekspertīžu birojs&quot; SIA</li> <li>Reģ. Nr. 40003733048</li> </ul> </section> </div> <div class="container footer-bottom"> <span>© 2026 Jumtu ekspertīžu birojs</span> <span>jumtueksperti.lv</span> </div> </footer> ${HASH_SCRIPT}`;
}

// ruPath = RU lapa ar tādu pašu saturu (hreflang); ruSwitch = kur ved RU poga, ja tādas lapas nav.
function page({ lvPath, ruPath = null, ruSwitch = "ru/", title, description, bodyClass = "", main, jsonld = null, extraHead = "" }) {
  const depth = lvPath ? lvPath.split("/").filter(Boolean).length : 0;
  const L = makeLinks(depth);
  const url = SITE + "/" + lvPath;
  const ruUrl = ruPath ? SITE + "/" + ruPath.replace(/\/$/, "") : null;
  const fullTitle = lvPath ? `${title} | Jumtu ekspertīžu birojs` : title;
  const html = `<!DOCTYPE html><html lang="lv"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(fullTitle)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${url}"><link rel="alternate" hreflang="lv" href="${url}">${ruUrl ? `<link rel="alternate" hreflang="ru" href="${ruUrl}">` : ""}<link rel="alternate" hreflang="x-default" href="${url}"><link rel="icon" type="image/png" href="${L.asset("favicon.png")}"><link rel="apple-touch-icon" href="${L.asset("apple-touch-icon.png")}"><meta property="og:title" content="${esc(fullTitle)}"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="website"><meta property="og:url" content="${url}"><meta property="og:locale" content="lv_LV"><meta property="og:locale:alternate" content="ru_RU"><meta property="og:image" content="${OG_IMAGE}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Jumtu ekspertīžu birojs — jumtu un ēku tehniskā apsekošana"><meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#c94b2d"><link rel="preload" href="${L.asset("_astro/fonts/open-sans-latin-wght-normal.woff2")}" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${L.asset(CSS)}"><link rel="stylesheet" href="${L.asset("assets/css/jeb.css")}">${extraHead}${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ""}</head> <body class="${bodyClass}"> ${header(L, lvPath, ruPath || ruSwitch)} <main id="main"> ${main(L)} </main> ${footer(L)} ${CALL_BAR} </body> </html>`;
  return html;
}

function ctaBand(L, { title, text, key = null }) {
  return `<section class="cta-band"> <div class="container cta-inner"> <div class="cta-copy"> <span class="cta-rule" aria-hidden="true"></span> <h2>${esc(title)}</h2> <p>${esc(text)}</p> </div> <div class="cta-actions"> <a class="button primary" href="${L.form(key)}">Pieteikt pakalpojumu</a> <a class="button secondary" href="${PHONE_HREF}">Zvanīt ${PHONE}</a> </div> </div> </section>`;
}

function objectMini(L, id) {
  const o = objectById[id];
  return `<a class="object-mini" href="${L.to("objekti/")}#${o.id}"><h3>${esc(o.name)}</h3><p>${esc(o.role)}</p></a>`;
}

const ORG = {
  "@type": "ProfessionalService",
  "@id": SITE + "/#organization",
  name: "Jumtu ekspertīžu birojs",
  legalName: "Jumtu ekspertīžu birojs SIA",
  url: SITE + "/",
  logo: SITE + "/assets/brand/jeb-logo-full.png",
  email: EMAIL,
  telephone: "+37129268323",
  address: { "@type": "PostalAddress", streetAddress: "Lizuma iela 5J", addressLocality: "Rīga", postalCode: "LV-1006", addressCountry: "LV" },
  areaServed: "LV",
  founder: { "@id": SITE + "/par-mums/#armands-liede" },
};
const PERSON = {
  "@type": "Person",
  "@id": SITE + "/par-mums/#armands-liede",
  name: "Armands Liede",
  jobTitle: "Jumiķa amata meistars, inženieris",
  worksFor: { "@id": SITE + "/#organization" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Rīgas Tehniskā universitāte" },
  memberOf: [
    { "@type": "Organization", name: "Latvijas Jumiķu apvienība" },
    { "@type": "Organization", name: "International Federation for the Roofing Trade (IFD)" },
  ],
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", name: "Jumiķa amata meistara diploms Nr. 3928", recognizedBy: { "@type": "Organization", name: "Latvijas Amatniecības kamera" } },
    { "@type": "EducationalOccupationalCredential", name: "Būvspeciālista sertifikāts Nr. 15-1/1-13/3 (jumiķis)", recognizedBy: { "@type": "Organization", name: "Latvijas Amatniecības kamera" } },
  ],
};

// ---------------------------------------------------------------- Sākumlapa
function homeMain(L) {
  const slides = [
    ["assets/objects/jeb-object-historic-roof-context.jpg", "Vēsturisku jumtu apsekošana"],
    ["assets/objects/jeb-object-national-library-context.jpg", "Mūsdienu ēku jumti un fasādes"],
    ["assets/objects/jeb-object-facade-project-context.jpg", "Sarežģīti jumtu un fasāžu mezgli"],
    ["assets/objects/jeb-object-construction-context.jpg", "Būvdarbu tehniskā uzraudzība"],
  ];
  const k = objectById["krustpils-baznica"];
  return `<section class="hero hero-home"> <div class="hero-slideshow" aria-hidden="true"> ${slides.map(([src], i) => `<div class="hero-slide${i ? "" : " is-active"}"> <img src="${L.asset(src)}" alt="" fetchpriority="${i ? "auto" : "high"}"> </div>`).join("")} </div> <div class="container hero-simple-grid"> <div class="hero-copy"> <p class="eyebrow">Tehniskā kompetence. Praktiska pieredze.</p> <h1>Skaidrība par jumta un ēkas tehnisko stāvokli</h1> <p>Tehniskā apsekošana, būvuzraudzība un tehniskie risinājumi jumtiem, fasādēm un hidroizolācijai — pirms remonta, pirkuma vai darbu pieņemšanas.</p> <div class="actions"> <a class="button primary" href="${L.form()}">Pieteikt pakalpojumu</a> <a class="button secondary" href="${L.to("objekti/")}">Apskatīt objektus</a> </div> <div class="hero-slide-controls" aria-label="Hero attēlu izvēle"> ${slides.map(([, label], i) => `<button type="button"${i ? "" : ' class="is-active"'} data-slide="${i}" aria-label="${esc(label)}" aria-pressed="${i ? "false" : "true"}"> <span>${pad(i + 1)}</span> </button>`).join("")} </div> </div> </div> </section> <script type="module">const a=document.querySelector(".hero-home"),c=Array.from(a?.querySelectorAll(".hero-slide")??[]),i=Array.from(a?.querySelectorAll("[data-slide]")??[]);let l=0,o;const d=e=>{l=e,c.forEach((t,r)=>t.classList.toggle("is-active",r===e)),i.forEach((t,r)=>{const s=r===e;t.classList.toggle("is-active",s),t.setAttribute("aria-pressed",String(s))})},n=()=>{window.matchMedia("(prefers-reduced-motion: reduce)").matches||(window.clearInterval(o),o=window.setInterval(()=>d((l+1)%c.length),5500))};i.forEach(e=>{e.addEventListener("click",()=>{d(Number(e.dataset.slide)),n()})});n();</script>
<div class="hero-trust-strip"> <div class="container"> <span><strong>Pieredze</strong> kopš 1989. gada</span> <span><strong>Būvspeciālista sert.</strong> 15-1/1-13/3</span> <span><strong>Objekti</strong> Latvijā un ārvalstīs</span> <a href="mailto:${EMAIL}"><strong>E-pasts</strong> ${EMAIL}</a> </div> </div>
<section class="section band-white"> <div class="container"> <div class="section-header"> <div> <p class="eyebrow">Pakalpojumi</p> <h2>Kā varam palīdzēt?</h2> </div> <p class="lead">No pirmās apsekošanas līdz izbūvējamam risinājumam un darbu pieņemšanai.</p> </div> <div class="help-grid"> ${SERVICES.map((s) => `<a class="help-card" href="${L.to(`pakalpojumi/${s.slug}/`)}">${illus(s.slug)}<h3>${esc(s.name)}</h3><p>${esc(s.short)}</p><span class="help-more">Uzzināt vairāk <span aria-hidden="true">→</span></span></a>`).join("")} </div> </div> </section>
<section class="section band-warm"> <div class="container"> <div class="section-header"> <div> <p class="eyebrow">Pieredze</p> <h2>Pieredze, ko apliecina paveiktais</h2> </div> </div> <div class="experience-grid"> <article class="feature-card"> <img src="${L.asset(k.img)}" alt="${esc(k.imgAlt)}" loading="lazy"> <div class="feature-body"> <span class="award-badge">${icon("award")} ${esc(k.award)}</span> <h3>${esc(k.name)}</h3> <p>${esc(k.role)}. ${esc(k.work)}.</p> <a class="text-link" href="${L.to("objekti/")}#${k.id}">Apskatīt projektu</a> </div> </article> <article class="profile-card"> <p class="eyebrow">Armands Liede</p> <h3>Inženiera zināšanas. Jumiķa meistara pieredze.</h3> <p>Tehniskā apsekošana, mezglu risinājumi un darbu kvalitātes kontrole, balstīta praktiskā darbā kopš 1989. gada.</p> <ul class="profile-facts"> <li>Jumiķa amata meistars, LAK diploms Nr. 3928</li> <li>Inženieris, Rīgas Tehniskā universitāte</li> <li>Latvijas Jumiķu apvienības un IFD valdes loceklis</li> </ul> <a class="text-link" href="${L.to("par-mums/")}#armands-liede">Par pieredzi un kvalifikāciju</a> </article> </div> </div> </section>
<section class="section band-white"> <div class="container"> <div class="section-header"> <div> <p class="eyebrow">Objekti</p> <h2>Izvēlēti objekti</h2> </div> <p class="lead">Vēsturiskas, publiskas un komerciālas ēkas visā Latvijā.</p> </div> <div class="object-mini-grid"> ${["rigas-doma-baznica", "sv-petera-baznica", "rundales-pils", "rigas-pils", "nacionala-biblioteka", "rezeknes-slimnica"].map((id) => objectMini(L, id)).join("")} </div> <p class="section-more"><a class="text-link" href="${L.to("objekti/")}">Visi objekti</a></p> </div> </section>
<section class="section process-section band-cool"> <div class="container"> <div class="section-header"> <div> <p class="eyebrow">Darba process</p> <h2>Kā notiek darbs</h2> </div> <p class="lead">Pirms apsekošanas vai konsultācijas precizējam situāciju, lai pārbaude būtu mērķtiecīga un saprotama.</p> </div> <div class="process-grid"> <article> ${processIcon(0)} <span>01</span> <h3>Pieteikums</h3> <p>Izvēlaties pakalpojumu, īsi aprakstāt situāciju un, ja iespējams, pievienojat foto vai rasējumus.</p> </article><article> ${processIcon(1)} <span>02</span> <h3>Sākotnējā izvērtēšana</h3> <p>Pārskatām informāciju un precizējam, vai vajadzīga konsultācija, apsekošana vai dokumentu izvērtēšana.</p> </article><article> ${processIcon(2)} <span>03</span> <h3>Darbs objektā</h3> <p>Apsekošana, uzraudzība vai konsultācija objektā vai attālināti.</p> </article><article> ${processIcon(3)} <span>04</span> <h3>Rezultāts</h3> <p>Skaidri secinājumi un praktiski ieteikumi nākamajam solim.</p> </article> </div> </div> </section>
${ctaBand(L, { title: "Sāksim ar jūsu situāciju", text: "Izvēlieties pakalpojumu un īsi aprakstiet situāciju — pieteikums aizņem apmēram minūti. Sazināsimies par nākamo soli." })}`;
}

// ---------------------------------------------------------------- Pakalpojumu pārskats
function servicesIndexMain(L) {
  return `<section class="page-hero"> <div class="container page-hero-grid"> <div class="page-hero-copy"> <p class="eyebrow">Pakalpojumi</p> <h1>Jumtu un ēku tehniskā palīdzība</h1> <p>Tehniskā apsekošana, uzraudzība, projektu izvērtēšana, mezglu izstrāde, konsultācijas un apmācības jumtiem, fasādēm un hidroizolācijai.</p> <div class="actions"> <a class="button primary" href="${L.form()}">Pieteikt pakalpojumu</a> <a class="button secondary" href="${PHONE_HREF}">Zvanīt ${PHONE}</a> </div> </div> <figure><img src="${L.asset("assets/objects/jeb-object-historic-roof-context.jpg")}" alt=""></figure> </div> </section>
<section class="section band-white"> <div class="container"> <div class="section-header"> <div> <p class="eyebrow">Pakalpojumi</p> <h2>Izvēlieties, kas jums nepieciešams</h2> </div> </div> <div class="help-grid"> ${SERVICES.map((s) => `<a class="help-card" href="${L.to(`pakalpojumi/${s.slug}/`)}">${illus(s.slug)}<h3>${esc(s.name)}</h3><p>${esc(s.short)}</p><span class="help-more">Uzzināt vairāk <span aria-hidden="true">→</span></span></a>`).join("")} </div> </div> </section>
${SERVICES.map((s, i) => `<section class="section ${i % 2 ? "band-white" : "band-warm"}"> <div class="container supervision-checks-layout"> <div class="supervision-checks-heading"> <p class="eyebrow">${pad(i + 1)} · ${esc(s.eyebrow)}</p> <h2>${esc(s.title)}</h2> <p>${esc(s.intro)}</p> <p><a class="text-link" href="${L.to(`pakalpojumi/${s.slug}/`)}">Vairāk par pakalpojumu</a></p> </div> <div class="supervision-ledger"> ${s.subs.map(([h, p], j) => `<article><span aria-hidden="true">${pad(j + 1)}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></article>`).join("")} </div> </div> </section>`).join("\n")}
${ctaBand(L, { title: "Nav skaidrs, kurš pakalpojums vajadzīgs?", text: "Pieteikumā izvēlieties „Cits jautājums” vai zvaniet — palīdzēsim izvēlēties piemērotāko risinājumu." })}`;
}

// ---------------------------------------------------------------- Pakalpojuma lapa
const CTA_TITLES = {
  apsekosana: "Vajadzīga jumta vai ēkas apsekošana?",
  "pirms-iegades": "Plānojat iegādāties ēku vai dzīvokli?",
  noplude: "Tek jumts vai terase?",
  uzraudziba: "Plānojat jumta vai fasādes darbus?",
  projekti: "Vajadzīga projekta izvērtēšana vai mezgli?",
  drosiba: "Jāpārbauda jumta drošības sistēma?",
  konsultacija: "Vajadzīga tehniska konsultācija?",
  apmacibas: "Vēlaties apmācības savam uzņēmumam?",
};

function serviceMain(s) {
  return (L) => {
    const ledger = (items) => items.map(([h, p], i) => `<article><span aria-hidden="true">${pad(i + 1)}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></article>`).join("");
    const extra = s.extra
      ? `<section class="section supervision-checks-section"> <div class="container supervision-checks-layout"> <div class="supervision-checks-heading"> <p class="eyebrow">Apjomi un tāmes</p> <h2>${esc(s.extra.title)}</h2> <p>${esc(s.extra.intro)}</p> </div> <div class="supervision-ledger"> ${ledger(s.extra.items)} </div> </div> </section>`
      : "";
    const objects = s.objects.length
      ? `<section class="section"> <div class="container"> <div class="section-header"> <div> <p class="eyebrow">Pieredze</p> <h2>Saistītie objekti</h2> </div> </div> <div class="object-mini-grid"> ${s.objects.map((id) => objectMini(L, id)).join("")} </div> </div> </section>`
      : "";
    return `<section class="supervision-hero"> <div class="container supervision-hero-grid"> <div class="supervision-hero-copy"> <p class="eyebrow">${esc(s.eyebrow)}</p> <h1>${esc(s.title)}</h1> <p>${esc(s.intro)}</p> <div class="actions"> <a class="button primary" href="${L.form(s.key)}">${esc(s.cta)}</a> <a class="button secondary" href="${L.to("pakalpojumi/")}">Visi pakalpojumi</a> </div> </div> <figure class="supervision-hero-media"> <img src="${L.asset(s.img)}" alt=""> </figure> </div> </section>
<section class="section supervision-checks-section"> <div class="container supervision-checks-layout"> <div class="supervision-checks-heading"> <p class="eyebrow">Ko ietver</p> <h2>${esc(s.includesTitle)}</h2> <p>${esc(s.includesIntro)}</p> </div> <div class="supervision-ledger"> ${ledger(s.subs)} </div> </div> </section>
${extra}
<section class="section supervision-triage-section"> <div class="container"> <div class="section-header supervision-checkpoint-header"> <div> <p class="eyebrow">Kad vērsties</p> <h2>Kad šis pakalpojums noder</h2> </div> </div> <div class="supervision-checkpoint-list"> ${s.when.map(([h, p], i) => `<article> <span class="when-icon" aria-hidden="true">${lineIcon(WHEN_ICONS[s.slug][i])}</span> <div> <h3>${esc(h)}</h3> <p>${esc(p)}</p> </div> </article>`).join("")} </div> </div> </section>
<section class="section supervision-results-section"> <div class="container"> <div class="section-header"> <div> <p class="eyebrow">Rezultāts</p> <h2>Ko jūs saņemat</h2> </div> </div> <div class="supervision-result-grid"> ${s.results.map(([h, p], i) => `<article> <span class="result-icon" aria-hidden="true">${lineIcon(RESULT_ICONS[s.slug][i])}</span> <h3>${esc(h)}</h3> <p>${esc(p)}</p> </article>`).join("")} </div> </div> </section>
${objects}
<section class="section supervision-related-section"> <div class="container"> <div class="section-header"> <h2>Saistītie pakalpojumi</h2> </div> <div class="supervision-related-grid"> ${s.related.map((slug) => { const r = serviceBySlug[slug]; return `<article> <h3>${esc(r.name)}</h3> <p>${esc(r.short)}</p> <a href="${L.to(`pakalpojumi/${r.slug}/`)}">Skatīt pakalpojumu</a> </article>`; }).join("")} </div> </div> </section>
${ctaBand(L, { title: CTA_TITLES[s.key], text: "Izvēlieties pakalpojumu, īsi aprakstiet situāciju un, ja iespējams, pievienojiet foto vai dokumentus. Sazināsimies par nākamo soli.", key: s.key })}`;
  };
}

// ---------------------------------------------------------------- Objekti
function objectsMain(L) {
  const card = (o, wide) => `<article class="object-card${o.img ? "" : " object-card--text"}${wide ? " object-card--wide" : ""}" id="${o.id}"> ${o.img ? `<img src="${L.asset(o.img)}" alt="${esc(o.imgAlt)}" loading="${wide ? "eager" : "lazy"}">` : ""} <div class="object-card-body"> ${o.award ? `<span class="award-badge">${icon("award")} ${esc(o.award)}</span>` : ""} <h3>${esc(o.name)}</h3> ${o.note ? `<p>${esc(o.note)}</p>` : ""} ${o.img2 ? `<img class="object-card-extra" src="${L.asset(o.img2)}" alt="${esc(o.img2Alt)}" loading="lazy">` : ""} <dl> <div><dt>Objekts</dt><dd>${esc(o.type)}</dd></div> <div><dt>Darbi</dt><dd>${esc(o.work)}</dd></div> <div><dt>Iesaiste</dt><dd>${esc(o.role)}</dd></div> </dl> </div> </article>`;
  const [first, ...rest] = FEATURED_OBJECTS;
  return `<section class="page-hero"> <div class="container page-hero-grid"> <div class="page-hero-copy"> <p class="eyebrow">Objekti un pieredze</p> <h1>Objekti un pieredze</h1> <p>Vēsturiskas, sakrālas, publiskas un komerciālas ēkas, kur esam apsekojuši jumtus, izstrādājuši tehniskos risinājumus un uzraudzījuši būvdarbus.</p> <div class="actions"> <a class="button primary" href="${L.form()}">Pieteikt pakalpojumu</a> <a class="button secondary" href="#visi-objekti">Visi objekti</a> </div> </div> <figure><img src="${L.asset("assets/objects/jeb-object-construction-context.jpg")}" alt=""></figure> </div> </section>
<section class="section band-white"> <div class="container"> <div class="section-header"> <div> <p class="eyebrow">Izvēlēti objekti</p> <h2>Nozīmīgākie darbi</h2> </div> </div> <div class="object-feature-grid"> ${card(first, true)} </div> <div class="object-feature-grid object-feature-grid--3"> ${rest.filter((o) => o.img).map((o) => card(o, false)).join("")} </div> <div class="object-feature-grid"> ${rest.filter((o) => !o.img).map((o) => card(o, false)).join("")} </div> </div> </section>
<section class="section band-warm" id="visi-objekti"> <div class="container"> <div class="section-header"> <div> <p class="eyebrow">Pilns saraksts</p> <h2>Objekti pēc ēku veida</h2> </div> <p class="lead">Jumta pārbūves risinājumi, apsekošana, konsultācijas un uzraudzība Latvijā, kā arī konsultācijas Vācijā, Šveicē, Dānijā un Anglijā.</p> </div> <div class="object-groups"> ${OBJECT_GROUPS.map(([title, items]) => `<section class="object-group"> <h3>${esc(title)}</h3> <ul> ${items.map(([n, r]) => `<li><strong>${esc(n)}</strong><span>${esc(r)}</span></li>`).join("")} </ul> </section>`).join("")} </div> <p class="page-note">Saraksts apkopo Armanda Liedes profesionālo pieredzi, tostarp darbus, kas veikti pirms SIA „Jumtu ekspertīžu birojs” dibināšanas.</p> </div> </section>
${ctaBand(L, { title: "Vai jums ir līdzīgs jautājums?", text: "Aprakstiet situāciju un pievienojiet pieejamos foto vai dokumentus. Ieteiksim piemērotāko nākamo soli." })}`;
}

// ---------------------------------------------------------------- Par mums
function aboutMain(L) {
  const courses = [
    ["2025", "Bitumena un PVC jumta segumu ieklāšana, BMI"],
    ["2024", "Drošības sistēmu projektēšana, apsekošana un montāža, pasniedzēja sertifikāts — Absturzsicherung GmbH, Vācija"],
    ["2023", "Saules paneļu un iekārtu stiprināšana uz dažādiem jumtiem — Fixnordic A/S, Dānija"],
    ["2022", "Deformācijas šuves dažādās konstrukcijās — Soba Inter AG, Šveice"],
    ["2018", "Keramiskās ventilējamās fasādes — Moeding Keramikfassaden GmbH, Vācija"],
    ["2017", "Bitumena hidroizolācija — Georg Börner GmbH, Vācija"],
    ["2015", "Dakstiņu jumti — Nelskamp GmbH, Vācija"],
    ["2014", "Zaļie jumti — ZinCo GmbH, Vācija"],
    ["2012", "Sintētiskās hidroizolācijas — Wolfin GmbH, Vācija"],
    ["2010", "Jumtu uzraudzības sistēmas un bojājumu noteikšana — PROGEO Monitoring GmbH, Vācija"],
    ["2008", "Dakstiņu jumti — Erlus, Vācija"],
    ["2004", "Vara skārdnieka darbi — KME, Vācija"],
    ["1993", "Prakse jumtu segumu tehnoloģijās, Oldenburga, Vācija"],
  ];
  const materials = ["Māla un betona dakstiņi", "Dabīgais šīferis", "Niedru jumti", "Zaļie jumti", "Metāla jumti un fasādes", "Titāncinks, varš, alumīnijs", "Šķiedrcementa fasādes", "Keramiskās fasādes", "PVC membrānas", "Bitumena hidroizolācija", "Siltumizolācija", "Jumta drošības sistēmas", "Saules paneļu stiprinājumi"];
  return `<section class="page-hero"> <div class="container page-hero-grid"> <div class="page-hero-copy"> <p class="eyebrow">Par mums</p> <h1>Par Jumtu ekspertīžu biroju</h1> <p>Jumtu un ēku tehniskās apsekošanas, būvuzraudzības un tehnisko risinājumu birojs Rīgā. Biroja darbu vada Armands Liede — jumiķa amata meistars un inženieris ar praktisku pieredzi kopš 1989. gada.</p> <div class="actions"> <a class="button primary" href="${L.form()}">Pieteikt pakalpojumu</a> <a class="button secondary" href="#armands-liede">Par Armandu Liedi</a> </div> </div> <figure><img src="${L.asset("assets/objects/jeb-object-historic-roof-context.jpg")}" alt=""></figure> </div> </section>
<section class="section band-white"> <div class="container profile-layout" id="armands-liede"> <aside class="profile-aside"> <span class="profile-monogram" aria-hidden="true">AL</span> <h2>Armands Liede</h2> <p>SIA „Jumtu ekspertīžu birojs” valdes priekšsēdētājs</p> <dl class="fact-list"> <div><dt>Kvalifikācija</dt><dd>Jumiķa amata meistars, LAK diploms Nr. 3928</dd></div> <div><dt>Izglītība</dt><dd>Amatniecības tehnoloģiju un dizaina inženieris, RTU</dd></div> <div><dt>Būvspeciālista sertifikāts</dt><dd><a href="https://bis.gov.lv/bisp/lv/specialist_certificates" target="_blank" rel="noopener">Nr. 15-1/1-13/3</a>, jumiķis</dd></div> <div><dt>Pieredze</dt><dd>Kopš 1989. gada</dd></div> <div><dt>Nozares organizācijas</dt><dd>Latvijas Jumiķu apvienības valdes loceklis, IFD valdes loceklis kopš 2016. gada</dd></div> </dl> </aside> <div class="profile-main"> <section> <p class="eyebrow">Pieredze</p> <h3>No niedru jumtiem līdz Rīgas Doma baznīcai</h3> <p>Profesionālo karjeru Armands Liede sāka ar niedru jumtu ierīkošanu. Lielāko daļu Latvijas Etnogrāfiskajā brīvdabas muzejā redzamo niedru jumtu ir veidojis viņš un viņa apmācītie meistari. Zināšanas jumtu segumu tehnoloģijās iegūtas prakses laikā Vācijā un pēc tam papildinātas ar regulārām apmācībām pie Eiropas ražotājiem.</p> <p>Šodien biroja darbs ietver jumtu un ēku tehnisko apsekošanu, būvuzraudzību, mezglu un konstruktīvo risinājumu izstrādi un konsultācijas. Pieredze ietver nozīmīgas vēsturiskas un publiskas ēkas — Rīgas Doma baznīcu, Rīgas Sv. Pētera baznīcu, Rundāles pili, Rīgas pili un Latvijas Nacionālo bibliotēku —, kā arī konsultācijas Vācijā, Šveicē, Dānijā un Anglijā.</p> <p><a class="text-link" href="${L.to("objekti/")}">Skatīt objektus</a></p> </section> <section> <p class="eyebrow">Nozare</p> <h3>Darbs nozarē un izglītībā</h3> <p>1995. gadā Armands Liede bija viens no Latvijas Jumiķu biedrības dibinātājiem un tās pirmais priekšsēdētājs. Ilgus gadus vadīja Latvijas Jumiķu apvienības valdi, šobrīd ir tās valdes loceklis. Kopš 2016. gada — Starptautiskās Jumiķu federācijas (IFD) valdes loceklis, atbildīgs par ilgtspējīgas būvniecības politiku un kontaktpersona Austrumeiropas valstīm.</p> <p>2018. gadā organizēja 27. IFD kongresu un Pasaules jauno jumiķu čempionātu Rīgā, kurā piedalījās 30 komandas no 11 valstīm. Izstrādājis jumiķa un namdara profesiju standartus, kopš 2010. gada strādā par lektoru arodskolās, tehnikumos un nozares semināros.</p> <p><a class="text-link" href="${L.to("pakalpojumi/apmacibas-un-seminari/")}">Apmācības un semināri</a></p> </section> <section> <p class="eyebrow">Kompetences</p> <h3>Materiāli un sistēmas</h3> <ul class="chip-list"> ${materials.map((m) => `<li>${esc(m)}</li>`).join("")} </ul> </section> <section> <p class="eyebrow">Profesionālā pilnveide</p> <h3>Apmācības pie ražotājiem</h3> <ol class="timeline"> ${courses.map(([y, t]) => `<li><b>${y}</b><span>${esc(t)}</span></li>`).join("")} </ol> </section> </div> </div> </section>
<section class="section about-company-section"> <div class="container about-company-layout"> <div class="about-company-copy"> <p class="eyebrow">Uzņēmuma dati</p> <h2>Juridiskā informācija</h2> <h3>&quot;Jumtu ekspertīžu birojs&quot; SIA</h3> <p>Uzņēmuma dati sadarbībai, dokumentu pārbaudei un oficiālai saziņai.</p> </div> <dl class="about-company-table"> <div> <dt>Reģistrācijas numurs</dt> <dd>40003733048</dd> </div><div> <dt>PVN numurs</dt> <dd>LV40003733048</dd> </div><div> <dt>BIS reģistrācija</dt> <dd>12304</dd> </div><div> <dt>Biroja adrese</dt> <dd>${ADDRESS}</dd> </div> </dl> </div> </section>
${ctaBand(L, { title: "Nepieciešams tehnisks izvērtējums?", text: "Izvēlieties pakalpojumu un īsi aprakstiet situāciju. Sazināsimies par nākamo soli." })}`;
}

// ---------------------------------------------------------------- Sertifikāti
function certsMain(L) {
  const doc = (img, title, label, text) => `<article class="certificate-card"> <a class="certificate-preview" href="${L.asset(img)}" target="_blank" rel="noreferrer" aria-label="Apskatīt dokumentu: ${esc(title)}"> <img src="${L.asset(img)}" alt="${esc(title)}" loading="lazy"> </a> <div class="certificate-card-copy"> <span>${esc(label)}</span> <h2>${esc(title)}</h2> <p>${esc(text)}</p> <a class="text-link" href="${L.asset(img)}" target="_blank" rel="noreferrer">Apskatīt dokumentu</a> </div> </article>`;
  return `<section class="page-hero"> <div class="container page-hero-grid"> <div class="page-hero-copy"> <p class="eyebrow">Kvalifikācija</p> <h1>Kvalifikācija un sertifikāti</h1> <p>Izglītība, profesionālā kvalifikācija un publiski pārbaudāms būvspeciālista sertifikāts.</p> <div class="actions"> <a class="button primary" href="${L.form()}">Pieteikt pakalpojumu</a> <a class="button secondary" href="${L.to("par-mums/")}#armands-liede">Par pieredzi</a> </div> </div> <figure><img src="${L.asset("assets/objects/jeb-object-historic-roof-context.jpg")}" alt=""></figure> </div> </section>
<section class="section certificate-documents-section"> <div class="container"> <div class="section-header certificates-header"> <div> <p class="eyebrow">Dokumenti</p> <h2>Izglītība un kvalifikācija</h2> </div> <p class="lead">Būvspeciālista sertifikāta derīgumu var pārbaudīt Būvniecības informācijas sistēmas publiskajā reģistrā.</p> </div> <div class="certificate-grid"> ${doc("assets/certificates/redacted/meistara-diploms.jpg", "Jumiķa amata meistara diploms", "Profesionālā kvalifikācija", "Latvijas Amatniecības kameras jumiķa amata meistara diploms Nr. 3928, 1996.")} ${doc("assets/certificates/redacted/inzeniera-diploms.jpg", "Inženiera diploms", "Izglītība", "Amatniecības tehnoloģiju un dizaina inženiera grāds, Rīgas Tehniskā universitāte.")} <article class="certificate-card"> <a class="certificate-preview certificate-badge" href="https://bis.gov.lv/bisp/lv/specialist_certificates" target="_blank" rel="noopener" aria-label="Pārbaudīt sertifikātu BIS būvspeciālistu reģistrā"> <img class="bis-logo" src="${L.asset("assets/brand/bis-logo.png")}" alt="" width="64" height="82" loading="lazy"> <span>BIS būvspeciālistu reģistrs</span> <strong>15-1/1-13/3</strong> <span>Sfēra: jumiķis</span> </a> <div class="certificate-card-copy"> <span>Būvspeciālista sertifikāts</span> <h2>Sertifikāts Nr. 15-1/1-13/3</h2> <p>Sfēra: jumiķis. Izsniedza Latvijas Amatniecības kamera, derīgs līdz 05.06.2029. Pārbaudei reģistrā meklējiet pēc sertifikāta numura.</p> <a class="text-link" href="https://bis.gov.lv/bisp/lv/specialist_certificates" target="_blank" rel="noopener">Pārbaudīt BIS reģistrā</a> </div> </article> </div> </div> </section>
<section class="section band-warm"> <div class="container"> <div class="section-header"> <div> <p class="eyebrow">Nozares organizācijas</p> <h2>Darbs nozares organizācijās</h2> </div> </div> <div class="org-grid"> <article class="object-mini org-card"><img class="org-logo" src="${L.asset("assets/brand/lja-logo.png")}" alt="Latvijas Jumiķu apvienības logo" width="72" height="72" loading="lazy"><div><h3>Latvijas Jumiķu apvienība</h3><p>Valdes loceklis, ilggadējs valdes priekšsēdētājs. 1995. gadā viens no Latvijas Jumiķu biedrības dibinātājiem un tās pirmais priekšsēdētājs.</p></div></article> <article class="object-mini org-card"><img class="org-logo" src="${L.asset("assets/brand/ifd-logo.png")}" alt="IFD logo" width="57" height="72" loading="lazy"><div><h3>Starptautiskā Jumiķu federācija (IFD)</h3><p>Valdes loceklis kopš 2016. gada, atbildīgs par ilgtspējīgas būvniecības politiku, kontaktpersona Austrumeiropas valstīm.</p></div></article> </div> </div> </section>
${ctaBand(L, { title: "Nepieciešams tehnisks izvērtējums?", text: "Izvēlieties pakalpojumu un īsi aprakstiet situāciju. Sazināsimies par nākamo soli." })}`;
}

// ---------------------------------------------------------------- Pāradresācija no vecajām adresēm
function redirectPage(fromDepth, toPath) {
  const target = rel(fromDepth) + toPath + "index.html";
  const url = SITE + "/" + toPath;
  return `<!DOCTYPE html><html lang="lv"><head><meta charset="utf-8"><title>Pārvietots | Jumtu ekspertīžu birojs</title><meta name="robots" content="noindex"><link rel="canonical" href="${url}"><meta http-equiv="refresh" content="0; url=${target}"></head><body><p>Lapa pārvietota: <a href="${target}">${url}</a></p></body></html>`;
}

// ---------------------------------------------------------------- Rakstīšana
function write(rp, html) {
  const file = path.join(ROOT, rp);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html, "utf8");
  console.log("wrote", rp);
}

write("index.html", page({
  lvPath: "", ruPath: "ru/", title: "Jumtu ekspertīžu birojs — jumtu un ēku tehniskā apsekošana un būvuzraudzība",
  description: "Jumtu un ēku tehniskā apsekošana, būvuzraudzība, noplūžu cēloņu noteikšana, projektu izvērtēšana, mezglu izstrāde un apmācības. Pieredze kopš 1989. gada.",
  main: homeMain, jsonld: { "@context": "https://schema.org", "@graph": [ORG, PERSON] },
}));

write("pakalpojumi/index.html", page({
  lvPath: "pakalpojumi/", ruPath: "ru/uslugi/", title: "Pakalpojumi",
  description: "Jumtu un ēku tehniskā apsekošana, apsekošana pirms iegādes, noplūdes un hidroizolācija, būvuzraudzība, projekti un mezgli, drošības sistēmas, konsultācijas un apmācības.",
  bodyClass: "construction-supervision-page", main: servicesIndexMain,
}));

for (const s of SERVICES) {
  write(`pakalpojumi/${s.slug}/index.html`, page({
    lvPath: `pakalpojumi/${s.slug}/`, ruPath: s.ru, ruSwitch: "ru/uslugi/", title: s.title, description: s.description,
    bodyClass: "construction-supervision-page", main: serviceMain(s),
    jsonld: { "@context": "https://schema.org", "@type": "Service", name: s.title, description: s.description, serviceType: s.name, provider: { "@id": SITE + "/#organization" }, areaServed: "LV", url: `${SITE}/pakalpojumi/${s.slug}/` },
  }));
  if (s.old) write(`pakalpojumi/${s.old}/index.html`, redirectPage(2, `pakalpojumi/${s.slug}/`));
}

write("objekti/index.html", page({
  lvPath: "objekti/", ruPath: "ru/obekty/", title: "Objekti un pieredze",
  description: "Rīgas Doma baznīca, Sv. Pētera baznīca, Rundāles pils, Krustpils baznīca (2. vieta skatē Gada labākā būve Latvijā 2025) un citi objekti: jumtu apsekošana, risinājumi un būvuzraudzība.",
  main: objectsMain,
}));

write("par-mums/index.html", page({
  lvPath: "par-mums/", ruPath: "ru/o-nas/", title: "Par mums — Armands Liede",
  description: "Jumtu ekspertīžu birojs un Armands Liede: jumiķa amata meistars, inženieris, Latvijas Jumiķu apvienības un IFD valdes loceklis. Pieredze kopš 1989. gada.",
  main: aboutMain, jsonld: { "@context": "https://schema.org", "@graph": [PERSON, ORG] },
}));

write("sertifikati/index.html", page({
  lvPath: "sertifikati/", ruPath: "ru/sertifikaty/", title: "Kvalifikācija un sertifikāti",
  description: "Jumiķa amata meistara diploms Nr. 3928, inženiera diploms, būvspeciālista sertifikāts Nr. 15-1/1-13/3 (BIS), darbs Latvijas Jumiķu apvienības un IFD valdēs.",
  main: certsMain,
}));

// ---------------------------------------------------------------- Esošo lapu galvene, kājene un apraksti
function patchExisting(rp, extra = []) {
  const file = path.join(ROOT, rp);
  let html = fs.readFileSync(file, "utf8");
  const depth = rp.split("/").length - 1;
  const L = makeLinks(depth);
  const before = html;
  html = html.replace(/(<img class="footer-logo"[^>]*>\s*<p>)[^<]*(<\/p>)/, `$1${FOOTER_TEXT}$2`);
  html = html.replace(/(<h2>Pakalpojumi<\/h2>\s*<ul>)[\s\S]*?(<\/ul>)/, `$1 ${footerServices(L.to)} $2`);
  html = html.replace(/(<a class="nav-cta"[^>]*>)Pieteikt konsultāciju(<\/a>)/, "$1Pieteikt pakalpojumu$2");
  for (const [from, to] of extra) html = html.split(from).join(to);
  html = html.split("Lizuma iela 5I").join("Lizuma iela 5J");
  html = html.split(`<source media="(max-width: 560px)" srcset="${L.asset("assets/brand/jeb-logo-mark.png")}"> `).join("");
  html = html.split("jumtu un ēku tehniskā ekspertīze").join("jumtu un ēku tehniskā apsekošana");
  if (html !== before) {
    fs.writeFileSync(file, html, "utf8");
    console.log("patched", rp);
  }
}

const KONTAKTI_DESC = "Pieteikt jumta vai ēkas tehnisko apsekošanu, būvuzraudzību, noplūžu pārbaudi, projektu izvērtēšanu, konsultāciju vai apmācības.";
patchExisting("kontakti/index.html", [
  ["Sazinieties par jumtu ekspertīzi, būvuzraudzību, hidroizolācijas pārbaudi vai tehnisku konsultāciju.", KONTAKTI_DESC],
  ["Sazinieties par jumta apsekošanu, hidroizolācijas pārbaudi, būvuzraudzību, projektu analīzi vai tehnisku konsultāciju.", "Sazinieties par jumta vai ēkas tehnisko apsekošanu, būvuzraudzību, noplūžu pārbaudi, projektu izvērtēšanu, konsultācijām vai apmācībām."],
  ['<a class="button primary" href="../kontakti/index.html#konsultacijas">Nosūtīt pieprasījumu</a>', '<a class="button primary" href="../kontakti/index.html#konsultacijas">Pieteikt pakalpojumu</a>'],
]);
patchExisting("privatuma-politika/index.html");
patchExisting("juridiska-informacija/index.html");
patchExisting("404.html");

// ---------------------------------------------------------------- Sitemap
const lvUrls = ["", "pakalpojumi/", ...SERVICES.map((s) => `pakalpojumi/${s.slug}/`), "objekti/", "sertifikati/", "par-mums/", "kontakti/", "privatuma-politika/", "juridiska-informacija/"];
const ruUrls = ["ru", "ru/uslugi", "ru/uslugi/obsledovanie-kryshi", "ru/uslugi/stroitelnyy-nadzor", "ru/uslugi/proverka-gidroizolyatsii", "ru/uslugi/analiz-proekta", "ru/uslugi/konsultatsii", "ru/obekty", "ru/sertifikaty", "ru/o-nas", "ru/kontakty", "ru/politika-konfidencialnosti", "ru/yuridicheskaya-informaciya"];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...lvUrls, ...ruUrls].map((u) => `<url><loc>${SITE}/${u}</loc></url>`).join("")}</urlset>`);
