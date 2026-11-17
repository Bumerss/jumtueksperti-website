// Biroja kartes tīmekļa versija no tools/lizuma-5j-karte.svg.
// Karte lapā ir ~2× mazāka nekā oriģināls, tāpēc teksti un norādes tiek palielināti.
// Palaišana:  node tools/build-map.mjs   ->  assets/maps/office-route-map.svg
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "tools/lizuma-5j-karte.svg");
const OUT = path.join(ROOT, "assets/maps/office-route-map.svg");

const STREET = 1.5; // ielu nosaukumi
const AREA = 1.45; // teritoriju nosaukumi (2 rindas)
const CALLOUT = 1.6; // norādes ar ikonām un uzrakstiem

let lines = fs.readFileSync(SRC, "utf8").split("\n");
const r1 = (n) => Math.round(n * 10) / 10;

// 1) Ielu nosaukumi uz līnijas (textPath): lielāks burts, lielāks atstatums no ielas
lines = lines.map((l) =>
  l.includes("<textPath")
    ? l
        .replace(/font-size="([\d.]+)"/, (m, v) => `font-size="${r1(v * STREET)}"`)
        .replace(/dy="(-?[\d.]+)"/, (m, v) => `dy="${r1(v * 1.35)}"`)
        .replace(/stroke-width:([\d.]+)px/, (m, v) => `stroke-width:${r1(v * 1.3)}px`)
    : l
);

// Otrs "Brīvības gatve" uzraksts (pie "Uz Siguldu") ar lielāku burtu pārklājas ar norādi; pirmais paliek
lines = lines.filter((l) => !l.includes('href="#tp9"'));

// 2) Teksta ceļi: pagarina abos galos, lai lielākais teksts netiktu nogriezts
lines = lines.map((l) => {
  const m = l.match(/^<path id="(tp\d+)" d="M([^"]+)"\/>(.*)$/);
  if (!m) return l;
  const pts = m[2].trim().split(/\s+/).map(Number);
  const P = [];
  for (let i = 0; i < pts.length; i += 2) P.push([pts[i], pts[i + 1]]);
  const ext = (a, b, k) => [b[0] + (b[0] - a[0]) * k, b[1] + (b[1] - a[1]) * k];
  P[0] = ext(P[1], P[0], 0.45);
  P[P.length - 1] = ext(P[P.length - 2], P[P.length - 1], 0.45);
  return `<path id="${m[1]}" d="M${P.map((p) => p.map(r1).join(" ")).join(" ")}"/>${m[3]}`;
});

// 3) Teritoriju nosaukumi divās rindās: lielāks burts, rindas attālinātas no kopējā centra
const areaIdx = lines.map((l, i) => (/^<text x="[\d.]+" y="[\d.]+" font-size="(9\.5|10)"/.test(l) ? i : -1)).filter((i) => i >= 0);
for (let k = 0; k + 1 < areaIdx.length; k += 2) {
  const [a, b] = [areaIdx[k], areaIdx[k + 1]];
  const ya = +lines[a].match(/ y="([\d.]+)"/)[1], yb = +lines[b].match(/ y="([\d.]+)"/)[1];
  const mid = (ya + yb) / 2, half = ((yb - ya) / 2) * AREA;
  for (const [i, y] of [[a, mid - half], [b, mid + half]]) {
    lines[i] = lines[i]
      .replace(/ y="[\d.]+"/, ` y="${r1(y)}"`)
      .replace(/font-size="([\d.]+)"/, (m, v) => `font-size="${r1(v * AREA)}"`)
      .replace(/letter-spacing="([\d.]+)"/, 'letter-spacing="1.2"');
  }
}

// 4) Norādes: katru grupu palielina ap tās enkurpunktu (ikona, adatiņa vai stūris pie malas)
const callouts = [
  { start: '<g transform="translate(428.7 412.6)"', count: 3, at: [428.7, 412.6] }, // Šmerlis
  { start: '<g transform="translate(615.3 725.1)"', count: 4, at: [615.3, 725.1] }, // Akropole Alfa
  { start: '<g transform="translate(907.5 351.9)"', count: 3, at: [907.5, 351.9] }, // Mogo ledus halle
  { start: '<circle cx="794.2" cy="485.3"', count: 3, at: [794.2, 485.3] }, // Nogriezties Lizuma ielā
  { start: '<ellipse cx="363.1" cy="345"', count: 5, at: [363.1, 345] }, // birojs
  { start: '<rect x="18" y="713"', count: 2, at: [18, 739] }, // Uz Rīgas centru
  { start: '<rect x="1080.8" y="399"', count: 2, at: [1182, 412] }, // Uz Siguldu
];
for (const c of callouts) {
  const i = lines.findIndex((l) => l.startsWith(c.start));
  if (i < 0) throw new Error("Nav atrasts: " + c.start);
  const [x, y] = c.at;
  lines[i] = `<g transform="translate(${x} ${y}) scale(${CALLOUT}) translate(${-x} ${-y})">` + lines[i];
  lines[i + c.count - 1] += "</g>";
}

// 5) Mēroga josla: ģeometrija nemainās (100 m jāpaliek 100 m), tikai burti lielāki
lines = lines.map((l) =>
  l.startsWith('<g font-size="10.5" font-weight="600" fill="#4a4540"><rect x="1029.7"')
    ? l.replace('font-size="10.5"', 'font-size="14"').replace('font-size="9"', 'font-size="12"')
    : l
);
// 6) Autortiesības salasāmas
lines = lines.map((l) => (l.includes("© OpenStreetMap") ? l.replace('font-size="8.5"', 'font-size="12"').replace('y="795"', 'y="793"') : l));

fs.writeFileSync(OUT, lines.join("\n"), "utf8");
console.log("wrote", path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + " KB");
