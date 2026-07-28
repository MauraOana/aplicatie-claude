import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";

/* ============================================================================
   VREMEA — România
   Cerul aplicației se schimbă odată cu cerul de afară.
   ========================================================================== */

/* ------------------------------- ORAȘE ---------------------------------- */
const ORASE = [
  { n: "București", j: "București", lat: 44.4268, lon: 26.1025 },
  { n: "Cluj-Napoca", j: "Cluj", lat: 46.7712, lon: 23.6236 },
  { n: "Timișoara", j: "Timiș", lat: 45.7489, lon: 21.2087 },
  { n: "Iași", j: "Iași", lat: 47.1585, lon: 27.6014 },
  { n: "Constanța", j: "Constanța", lat: 44.1598, lon: 28.6348 },
  { n: "Craiova", j: "Dolj", lat: 44.3302, lon: 23.7949 },
  { n: "Brașov", j: "Brașov", lat: 45.6427, lon: 25.5887 },
  { n: "Galați", j: "Galați", lat: 45.4353, lon: 28.008 },
  { n: "Ploiești", j: "Prahova", lat: 44.9469, lon: 26.0367 },
  { n: "Oradea", j: "Bihor", lat: 47.0465, lon: 21.9189 },
  { n: "Brăila", j: "Brăila", lat: 45.2692, lon: 27.9575 },
  { n: "Arad", j: "Arad", lat: 46.1866, lon: 21.3123 },
  { n: "Pitești", j: "Argeș", lat: 44.8565, lon: 24.8692 },
  { n: "Sibiu", j: "Sibiu", lat: 45.7983, lon: 24.1256 },
  { n: "Bacău", j: "Bacău", lat: 46.567, lon: 26.9146 },
  { n: "Târgu Mureș", j: "Mureș", lat: 46.5386, lon: 24.5514 },
  { n: "Baia Mare", j: "Maramureș", lat: 47.6573, lon: 23.5681 },
  { n: "Buzău", j: "Buzău", lat: 45.15, lon: 26.8333 },
  { n: "Botoșani", j: "Botoșani", lat: 47.7486, lon: 26.6694 },
  { n: "Satu Mare", j: "Satu Mare", lat: 47.79, lon: 22.885 },
  { n: "Râmnicu Vâlcea", j: "Vâlcea", lat: 45.1047, lon: 24.3754 },
  { n: "Suceava", j: "Suceava", lat: 47.6514, lon: 26.2556 },
  { n: "Piatra Neamț", j: "Neamț", lat: 46.9275, lon: 26.3708 },
  { n: "Drobeta-Turnu Severin", j: "Mehedinți", lat: 44.6369, lon: 22.6597 },
  { n: "Târgu Jiu", j: "Gorj", lat: 45.0353, lon: 23.2747 },
  { n: "Târgoviște", j: "Dâmbovița", lat: 44.925, lon: 25.4567 },
  { n: "Focșani", j: "Vrancea", lat: 45.696, lon: 27.1863 },
  { n: "Bistrița", j: "Bistrița-Năsăud", lat: 47.1333, lon: 24.5 },
  { n: "Reșița", j: "Caraș-Severin", lat: 45.3008, lon: 21.8892 },
  { n: "Tulcea", j: "Tulcea", lat: 45.1717, lon: 28.7914 },
  { n: "Slatina", j: "Olt", lat: 44.43, lon: 24.37 },
  { n: "Călărași", j: "Călărași", lat: 44.2058, lon: 27.3306 },
  { n: "Alba Iulia", j: "Alba", lat: 46.0733, lon: 23.5805 },
  { n: "Giurgiu", j: "Giurgiu", lat: 43.9037, lon: 25.9699 },
  { n: "Deva", j: "Hunedoara", lat: 45.8833, lon: 22.9 },
  { n: "Zalău", j: "Sălaj", lat: 47.1911, lon: 23.0572 },
  { n: "Sfântu Gheorghe", j: "Covasna", lat: 45.8667, lon: 25.7833 },
  { n: "Vaslui", j: "Vaslui", lat: 46.6407, lon: 27.7276 },
  { n: "Slobozia", j: "Ialomița", lat: 44.5639, lon: 27.3661 },
  { n: "Alexandria", j: "Teleorman", lat: 43.9739, lon: 25.3331 },
  { n: "Miercurea Ciuc", j: "Harghita", lat: 46.3611, lon: 25.8014 },
  { n: "Turda", j: "Cluj", lat: 46.5667, lon: 23.7833 },
  { n: "Mediaș", j: "Sibiu", lat: 46.1667, lon: 24.35 },
  { n: "Sighișoara", j: "Mureș", lat: 46.2197, lon: 24.7925 },
  { n: "Lugoj", j: "Timiș", lat: 45.6886, lon: 21.9033 },
  { n: "Petroșani", j: "Hunedoara", lat: 45.4167, lon: 23.3667 },
  { n: "Roman", j: "Neamț", lat: 46.9167, lon: 26.9167 },
  { n: "Bârlad", j: "Vaslui", lat: 46.2278, lon: 27.6706 },
  { n: "Onești", j: "Bacău", lat: 46.25, lon: 26.7667 },
  { n: "Curtea de Argeș", j: "Argeș", lat: 45.14, lon: 24.6767 },
  { n: "Sighetu Marmației", j: "Maramureș", lat: 47.9333, lon: 23.8833 },
  { n: "Sinaia", j: "Prahova", lat: 45.35, lon: 25.55 },
  { n: "Predeal", j: "Brașov", lat: 45.5, lon: 25.5833 },
  { n: "Poiana Brașov", j: "Brașov", lat: 45.5931, lon: 25.5514 },
  { n: "Bran", j: "Brașov", lat: 45.5153, lon: 25.3672 },
  { n: "Vatra Dornei", j: "Suceava", lat: 47.345, lon: 25.3572 },
  { n: "Câmpulung Moldovenesc", j: "Suceava", lat: 47.5286, lon: 25.5611 },
  { n: "Băile Herculane", j: "Caraș-Severin", lat: 44.8794, lon: 22.4131 },
  { n: "Mamaia", j: "Constanța", lat: 44.25, lon: 28.6167 },
  { n: "Eforie Nord", j: "Constanța", lat: 44.0578, lon: 28.6333 },
  { n: "Mangalia", j: "Constanța", lat: 43.8167, lon: 28.5833 },
  { n: "Vama Veche", j: "Constanța", lat: 43.75, lon: 28.575 },
  { n: "Năvodari", j: "Constanța", lat: 44.3167, lon: 28.6 },
  { n: "Buftea", j: "Ilfov", lat: 44.5606, lon: 25.9483 },
  { n: "Vârful Omu", j: "Bucegi · 2505 m", lat: 45.4456, lon: 25.4569 },
];

/* Cele 41 de reședințe de județ plus capitala. Le marchez ca să le pot grupa
   în listă — altfel se pierd printre stațiuni. */
const RESEDINTE = new Set([
  "Alba Iulia", "Arad", "Pitești", "Bacău", "Oradea", "Bistrița", "Botoșani", "Brăila",
  "Brașov", "București", "Buzău", "Reșița", "Călărași", "Cluj-Napoca", "Constanța",
  "Sfântu Gheorghe", "Târgoviște", "Craiova", "Galați", "Giurgiu", "Târgu Jiu",
  "Miercurea Ciuc", "Deva", "Slobozia", "Iași", "Buftea", "Baia Mare",
  "Drobeta-Turnu Severin", "Târgu Mureș", "Piatra Neamț", "Slatina", "Ploiești",
  "Satu Mare", "Zalău", "Sibiu", "Suceava", "Alexandria", "Timișoara", "Tulcea",
  "Vaslui", "Râmnicu Vâlcea", "Focșani",
]);

const alfabetic = (a, b) => a.n.localeCompare(b.n, "ro");
const CITIES = [
  ...ORASE.filter((c) => RESEDINTE.has(c.n)).map((c) => ({ ...c, rj: true })).sort(alfabetic),
  ...ORASE.filter((c) => !RESEDINTE.has(c.n)).map((c) => ({ ...c, rj: false })).sort(alfabetic),
];

const IMPLICIT = CITIES.find((c) => c.n === "București") || CITIES[0];

/* ---------------------------- CULORI DE ALERTĂ --------------------------- */
const COD = {
  bun: { c: "#16A34A", moale: "#DCFCE7", nume: "verde" },
  ok: { c: "#65A30D", moale: "#ECFCCB", nume: "verde" },
  atentie: { c: "#EAB308", moale: "#FEF9C3", nume: "galben" },
  ridicat: { c: "#F97316", moale: "#FFEDD5", nume: "portocaliu" },
  mare: { c: "#EF4444", moale: "#FEE2E2", nume: "roșu" },
  extrem: { c: "#A21CAF", moale: "#FAE8FF", nume: "violet" },
};
const nivel = (v, praguri, chei, etichete) => {
  if (v == null || Number.isNaN(v)) return { ...COD.bun, eticheta: "—" };
  let i = praguri.findIndex((p) => v < p);
  if (i === -1) i = chei.length - 1;
  return { ...COD[chei[i]], eticheta: etichete[i] };
};
const E6 = ["excelent", "bun", "acceptabil", "nu prea bun", "rău", "foarte rău"];
const K6 = ["bun", "ok", "atentie", "ridicat", "mare", "extrem"];

const scaraAQI = (v) => nivel(v, [20, 40, 60, 80, 100], K6, E6);
const scaraPM25 = (v) => nivel(v, [10, 20, 25, 50, 75], K6, E6);
const scaraPM10 = (v) => nivel(v, [20, 40, 50, 100, 150], K6, E6);
const scaraNO2 = (v) => nivel(v, [40, 90, 120, 230, 340], K6, E6);
const scaraO3 = (v) => nivel(v, [50, 100, 130, 240, 380], K6, E6);
const scaraSO2 = (v) => nivel(v, [100, 200, 350, 500, 750], K6, E6);
const scaraCO = (v) => nivel(v, [4400, 9400, 12400, 15400, 30000], K6, E6);
const scaraUV = (v) =>
  nivel(v, [3, 6, 8, 11], ["bun", "atentie", "ridicat", "mare", "extrem"],
    ["blând", "moderat", "puternic", "foarte puternic", "extrem"]);

const SCARI_POLEN = {
  alder_pollen: [10, 50, 100], birch_pollen: [10, 50, 200], grass_pollen: [5, 20, 50],
  mugwort_pollen: [5, 15, 40], olive_pollen: [10, 50, 200], ragweed_pollen: [2, 10, 25],
};
const scaraPolen = (k) => (v) =>
  nivel(v, SCARI_POLEN[k], ["bun", "atentie", "ridicat", "mare"],
    ["liniște", "puțin", "mult", "foarte mult"]);

const POLEN = [
  { k: "alder_pollen", nume: "Arin", lat: "Alnus", sezon: "ianuarie – martie", emo: "🌿", cul: "#7C9A5E" },
  { k: "birch_pollen", nume: "Mesteacăn", lat: "Betula", sezon: "martie – mai", emo: "🌳", cul: "#4F9D69" },
  { k: "grass_pollen", nume: "Graminee", lat: "Poaceae", sezon: "mai – iulie", emo: "🌾", cul: "#B99327" },
  { k: "mugwort_pollen", nume: "Pelin", lat: "Artemisia", sezon: "iulie – septembrie", emo: "🪴", cul: "#6F8F7A" },
  { k: "olive_pollen", nume: "Măslin", lat: "Olea", sezon: "aprilie – iunie", emo: "🫒", cul: "#8A9A3F" },
  { k: "ragweed_pollen", nume: "Ambrozie", lat: "Ambrosia", sezon: "august – octombrie", emo: "🌼", cul: "#C98A1E" },
];

/* ---------------------------- COD METEO WMO ------------------------------ */
const WMO = {
  0: ["Cer senin", "senin"], 1: ["Aproape senin", "senin"], 2: ["Parțial noros", "partial"],
  3: ["Înnorat", "nori"], 45: ["Ceață", "ceata"], 48: ["Ceață cu chiciură", "ceata"],
  51: ["Burniță ușoară", "burnita"], 53: ["Burniță", "burnita"], 55: ["Burniță deasă", "burnita"],
  56: ["Burniță înghețată", "burnita"], 57: ["Burniță înghețată deasă", "burnita"],
  61: ["Ploaie ușoară", "ploaie"], 63: ["Ploaie", "ploaie"], 65: ["Ploaie puternică", "ploaie"],
  66: ["Ploaie înghețată", "ploaie"], 67: ["Ploaie înghețată puternică", "ploaie"],
  71: ["Ninsoare ușoară", "ninsoare"], 73: ["Ninsoare", "ninsoare"], 75: ["Ninsoare abundentă", "ninsoare"],
  77: ["Fulgi răzleți", "ninsoare"], 80: ["Averse ușoare", "ploaie"], 81: ["Averse", "ploaie"],
  82: ["Averse torențiale", "ploaie"], 85: ["Averse de ninsoare", "ninsoare"],
  86: ["Ninsoare viscolită", "ninsoare"], 95: ["Furtună cu descărcări", "oraj"],
  96: ["Furtună cu grindină", "oraj"], 99: ["Furtună puternică cu grindină", "oraj"],
};
const descrie = (c) => (WMO[c] ? WMO[c][0] : "—");
const tipVreme = (c) => (WMO[c] ? WMO[c][1] : "nori");

/* ------------------------------ PALETE CER ------------------------------- */
function paletaCer(cod, zi, faza) {
  const t = tipVreme(cod);
  if (t === "oraj") return ["#241B4A", "#453A7C", "#6A5CA8"];
  if (!zi) {
    if (t === "ploaie" || t === "burnita") return ["#0F1A33", "#1F3350", "#3A5372"];
    if (t === "ninsoare") return ["#182A45", "#33507A", "#5E7FA8"];
    if (t === "nori" || t === "ceata") return ["#111827", "#26334A", "#414F6B"];
    return ["#0B1233", "#1D2A63", "#3B4B96"];
  }
  if (faza === "zori") return ["#D9542F", "#F0954D", "#6FA8DC"];
  if (faza === "amurg") return ["#B23C63", "#EE7F4C", "#5468B8"];
  if (t === "senin") return ["#1273CE", "#3FA3E6", "#8ED4F5"];
  if (t === "partial") return ["#1F7FC4", "#57A9DC", "#9FCDE8"];
  if (t === "ploaie" || t === "burnita") return ["#254257", "#4B6E8C", "#7C9CB4"];
  if (t === "ninsoare") return ["#4A6C8C", "#7FA1BE", "#BAD3E4"];
  if (t === "ceata") return ["#526066", "#828F95", "#B4BEC2"];
  return ["#41586E", "#72899E", "#A6B8C6"];
}

/* --------------------------- ILUSTRAȚII VREME ---------------------------- */
function Ilustratie({ cod, zi = true, s = 96, animat = true }) {
  const t = tipVreme(cod);
  const id = useRef("g" + Math.random().toString(36).slice(2, 8)).current;
  const A = animat ? "" : " fara-misc";
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" className={"ilu" + A} aria-hidden="true">
      <defs>
        <radialGradient id={id + "s"} cx="50%" cy="45%">
          <stop offset="0%" stopColor="#FFF3B0" /><stop offset="55%" stopColor="#FFCF3D" /><stop offset="100%" stopColor="#FF9E2C" />
        </radialGradient>
        <linearGradient id={id + "m"} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF8E1" /><stop offset="100%" stopColor="#E4D9B4" />
        </linearGradient>
        <linearGradient id={id + "n"} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor="#DDE7F0" />
        </linearGradient>
        <linearGradient id={id + "nd"} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B9C6D4" /><stop offset="100%" stopColor="#8C9CAE" />
        </linearGradient>
        <linearGradient id={id + "p"} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7EC8F5" /><stop offset="100%" stopColor="#3D8FD4" />
        </linearGradient>
      </defs>

      {(t === "senin" || t === "partial") && zi && (
        <g className="soare" style={{ transformOrigin: t === "partial" ? "62px 34px" : "50px 46px" }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30 * Math.PI) / 180;
            const cx = t === "partial" ? 62 : 50, cy = t === "partial" ? 34 : 46;
            const r0 = t === "partial" ? 17 : 25, r1 = t === "partial" ? 23 : 34;
            return <line key={i} x1={cx + Math.cos(a) * r0} y1={cy + Math.sin(a) * r0}
              x2={cx + Math.cos(a) * r1} y2={cy + Math.sin(a) * r1}
              stroke="#FFC53D" strokeWidth="4" strokeLinecap="round" opacity=".75" />;
          })}
        </g>
      )}
      {(t === "senin" || t === "partial") && zi && (
        <circle cx={t === "partial" ? 62 : 50} cy={t === "partial" ? 34 : 46}
          r={t === "partial" ? 14 : 21} fill={`url(#${id}s)`} className="pulseaza" />
      )}
      {(t === "senin" || t === "partial") && !zi && (
        <g>
          <path d={t === "partial" ? "M74 40a17 17 0 0 1-19-19 17 17 0 1 0 19 19z" : "M67 55a24 24 0 0 1-27-27 24 24 0 1 0 27 27z"}
            fill={`url(#${id}m)`} />
          {[[22, 22], [82, 18], [30, 62], [86, 58]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.8" fill="#FFF8E1" className="clipeste" style={{ animationDelay: i * 0.7 + "s" }} />
          ))}
        </g>
      )}

      {t !== "senin" && (
        <g className="pluteste">
          <path d="M24 66h38a13 13 0 0 0 1.6-25.9A18 18 0 0 0 24.6 55.4 11.5 11.5 0 0 0 24 66z"
            fill={t === "oraj" || t === "ploaie" ? `url(#${id}nd)` : `url(#${id}n)`} />
          {t !== "partial" && (
            <path d="M46 74h30a10 10 0 0 0 .8-19.9A14 14 0 0 0 46.4 65.6 9 9 0 0 0 46 74z"
              fill={`url(#${id}n)`} opacity=".92" transform="translate(-8 -6)" />
          )}
        </g>
      )}

      {(t === "ploaie" || t === "burnita") &&
        [0, 1, 2, 3].map((i) => (
          <line key={i} x1={30 + i * 11} y1="72" x2={26 + i * 11} y2="88" stroke={`url(#${id}p)`}
            strokeWidth="4" strokeLinecap="round" className="cade" style={{ animationDelay: i * 0.18 + "s" }} />
        ))}
      {t === "ninsoare" &&
        [0, 1, 2].map((i) => (
          <g key={i} className="cade" style={{ animationDelay: i * 0.35 + "s" }}>
            <circle cx={33 + i * 15} cy="80" r="3.6" fill="#EAF4FC" />
          </g>
        ))}
      {t === "oraj" && <path d="M52 68l-11 17h10l-7 15 19-21H51l7-11z" fill="#FFD23D" className="fulger" />}
      {t === "ceata" &&
        [0, 1, 2].map((i) => (
          <line key={i} x1={22 + (i % 2) * 6} y1={74 + i * 8} x2={76 - (i % 2) * 8} y2={74 + i * 8}
            stroke="#CBD5E1" strokeWidth="5" strokeLinecap="round" className="pluteste"
            style={{ animationDelay: i * 0.4 + "s" }} />
        ))}
    </svg>
  );
}

/* ------------------------------- UTILITARE -------------------------------- */
const ZILE = ["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"];
const ZS = ["dum", "lun", "mar", "mie", "joi", "vin", "sâm"];
const LUNI = ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"];
const ROZA = ["nord", "nord-est", "est", "sud-est", "sud", "sud-vest", "vest", "nord-vest"];
const directie = (g) => (g == null ? "—" : ROZA[Math.round(g / 45) % 8]);
const rot = (v, z = 0) => (v == null || Number.isNaN(v) ? "—" : Number(v).toFixed(z));
const ora = (iso) => (iso ? iso.slice(11, 16) : "—");
const fărăDiacritice = (x) => x.toLowerCase()
  .replace(/[ăâ]/g, "a").replace(/î/g, "i").replace(/ș|ş/g, "s").replace(/ț|ţ/g, "t");
const haversine = (a, b, c, d) => {
  const R = 6371, r = Math.PI / 180;
  const dl = (c - a) * r, dL = (d - b) * r;
  const x = Math.sin(dl / 2) ** 2 + Math.cos(a * r) * Math.cos(c * r) * Math.sin(dL / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
};

/* ----------------------------- PRAGURI IMPLICITE -------------------------- */
const PRAGURI_INIT = [
  { k: "tmax", grup: "Vreme", nume: "E prea cald", scurt: "Temperatură maximă", u: "°C", v: 35, min: 20, max: 45, pas: 1, sens: "peste", emo: "🥵" },
  { k: "tmin", grup: "Vreme", nume: "E prea frig", scurt: "Temperatură minimă", u: "°C", v: -10, min: -30, max: 10, pas: 1, sens: "sub", emo: "🥶" },
  { k: "rafale", grup: "Vreme", nume: "Vânt puternic", scurt: "Rafale", u: "km/h", v: 70, min: 20, max: 150, pas: 5, sens: "peste", emo: "💨" },
  { k: "precip", grup: "Vreme", nume: "Plouă mult", scurt: "Precipitații în 24 h", u: "mm", v: 25, min: 1, max: 100, pas: 1, sens: "peste", emo: "🌧️" },
  { k: "uv", grup: "Soare", nume: "Soarele arde tare", scurt: "Indice UV", u: "", v: 6, min: 1, max: 12, pas: 1, sens: "peste", emo: "☀️" },
  { k: "european_aqi", grup: "Aer", nume: "Aerul e poluat", scurt: "Indice european", u: "", v: 60, min: 10, max: 150, pas: 5, sens: "peste", emo: "🌫️" },
  { k: "pm2_5", grup: "Aer", nume: "Praf fin (PM2.5)", scurt: "Particule sub 2,5 µm", u: "µg/m³", v: 25, min: 5, max: 120, pas: 1, sens: "peste", emo: "😷" },
  { k: "pm10", grup: "Aer", nume: "Praf (PM10)", scurt: "Particule sub 10 µm", u: "µg/m³", v: 50, min: 10, max: 200, pas: 5, sens: "peste", emo: "😷" },
  { k: "nitrogen_dioxide", grup: "Aer", nume: "Gaze de la trafic", scurt: "Dioxid de azot", u: "µg/m³", v: 120, min: 20, max: 400, pas: 10, sens: "peste", emo: "🚗" },
  { k: "ozone", grup: "Aer", nume: "Ozon la sol", scurt: "O₃", u: "µg/m³", v: 120, min: 40, max: 300, pas: 10, sens: "peste", emo: "🫧" },
  { k: "alder_pollen", grup: "Alergii", nume: "Polen de arin", scurt: "ianuarie – martie", u: "gr/m³", v: 50, min: 1, max: 200, pas: 5, sens: "peste", emo: "🌿" },
  { k: "birch_pollen", grup: "Alergii", nume: "Polen de mesteacăn", scurt: "martie – mai", u: "gr/m³", v: 50, min: 1, max: 300, pas: 5, sens: "peste", emo: "🌳" },
  { k: "grass_pollen", grup: "Alergii", nume: "Polen de graminee", scurt: "mai – iulie", u: "gr/m³", v: 20, min: 1, max: 150, pas: 1, sens: "peste", emo: "🌾" },
  { k: "mugwort_pollen", grup: "Alergii", nume: "Polen de pelin", scurt: "iulie – septembrie", u: "gr/m³", v: 15, min: 1, max: 100, pas: 1, sens: "peste", emo: "🪴" },
  { k: "olive_pollen", grup: "Alergii", nume: "Polen de măslin", scurt: "aprilie – iunie", u: "gr/m³", v: 50, min: 1, max: 250, pas: 5, sens: "peste", emo: "🫒" },
  { k: "ragweed_pollen", grup: "Alergii", nume: "Polen de ambrozie", scurt: "august – octombrie", u: "gr/m³", v: 10, min: 1, max: 60, pas: 1, sens: "peste", emo: "🌼" },
];
const EMO_GRUP = { Vreme: "🌤️", Soare: "😎", Aer: "🌬️", Alergii: "🤧" };

/* ================================ APLICAȚIA =============================== */
export default function Vremea() {
  const [loc, setLoc] = useState(IMPLICIT);
  const [meteo, setMeteo] = useState(null);
  const [aer, setAer] = useState(null);
  const [seÎncarcă, setSeÎncarcă] = useState(true);
  const [eroare, setEroare] = useState(null);
  const [fila, setFila] = useState("acum");
  const [caută, setCaută] = useState(false);
  const [interogare, setInterogare] = useState("");
  const [praguri, setPraguri] = useState(PRAGURI_INIT);
  const [activ, setActiv] = useState(() => Object.fromEntries(PRAGURI_INIT.map((p) => [p.k, true])));
  const [gata, setGata] = useState(false);
  const [zi, setZi] = useState(0);
  const [toasturi, setToasturi] = useState([]);
  const [notifOn, setNotifOn] = useState(false);
  const [permis, setPermis] = useState("default");
  const [gpsStare, setGpsStare] = useState("inactiv");
  const anunțate = useRef(new Set());

  /* ---- memorie ---- */
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("vremea:setari");
        if (r?.value) {
          const s = JSON.parse(r.value);
          if (s.loc) setLoc(s.loc);
          if (s.valori) setPraguri((p) => p.map((x) => ({ ...x, v: s.valori[x.k] ?? x.v })));
          if (s.activ) setActiv((a) => ({ ...a, ...s.activ }));
          if (typeof s.notifOn === "boolean") setNotifOn(s.notifOn);
        }
      } catch (e) { /* prima pornire */ }
      try { setPermis(typeof Notification !== "undefined" ? Notification.permission : "indisponibil"); }
      catch (e) { setPermis("indisponibil"); }
      setGata(true);
    })();
  }, []);

  useEffect(() => {
    if (!gata) return;
    const t = setTimeout(async () => {
      try {
        await window.storage.set("vremea:setari", JSON.stringify({
          loc, notifOn,
          valori: Object.fromEntries(praguri.map((p) => [p.k, p.v])),
          activ,
        }));
      } catch (e) { /* fără memorie — setările rămân pe sesiune */ }
    }, 400);
    return () => clearTimeout(t);
  }, [loc, praguri, activ, notifOn, gata]);

  /* ---- date ---- */
  const adu = useCallback(async (c) => {
    setSeÎncarcă(true); setEroare(null);
    const q = `latitude=${c.lat}&longitude=${c.lon}&timezone=Europe%2FBucharest`;
    const u1 = `https://api.open-meteo.com/v1/forecast?${q}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,precipitation_probability,weather_code,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max&forecast_days=7`;
    const u2 = `https://air-quality-api.open-meteo.com/v1/air-quality?${q}&current=european_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,uv_index,alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&hourly=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&forecast_days=4`;
    try {
      const [a, b] = await Promise.all([fetch(u1), fetch(u2)]);
      if (!a.ok) throw new Error();
      setMeteo(await a.json());
      setAer(b.ok ? await b.json() : null);
      setZi(0);
    } catch (e) {
      setEroare("Nu am reușit să iau datele. Verifică internetul și încearcă din nou.");
    } finally { setSeÎncarcă(false); }
  }, []);

  useEffect(() => { if (gata) adu(loc); }, [loc, adu, gata]);
  /* reîmprospătare la 15 minute, ca alertele să rămână actuale */
  useEffect(() => {
    if (!gata) return;
    const i = setInterval(() => adu(loc), 15 * 60 * 1000);
    return () => clearInterval(i);
  }, [loc, adu, gata]);

  /* ---- geolocalizare ---- */
  const localizează = useCallback(() => {
    if (!navigator.geolocation) { setGpsStare("indisponibil"); return; }
    setGpsStare("caut");
    navigator.geolocation.getCurrentPosition(
      (p) => {
        const { latitude: la, longitude: lo } = p.coords;
        let cel = CITIES[0], dmin = Infinity;
        CITIES.forEach((c) => { const d = haversine(la, lo, c.lat, c.lon); if (d < dmin) { dmin = d; cel = c; } });
        setLoc({ n: dmin < 12 ? cel.n : `Lângă ${cel.n}`, j: "poziția ta", lat: la, lon: lo, gps: true });
        setGpsStare("ok"); setCaută(false); setFila("acum");
      },
      (err) => {
        setGpsStare(err.code === 1 ? "refuzat" : err.code === 3 ? "lent" : "eșuat");
      },
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 600000 }
    );
  }, []);

  /* ---- valori ---- */
  const valori = useMemo(() => {
    const c = meteo?.current || {}, q = aer?.current || {}, d = meteo?.daily || {};
    return {
      tmax: d.temperature_2m_max?.[0], tmin: d.temperature_2m_min?.[0],
      rafale: d.wind_gusts_10m_max?.[0], precip: d.precipitation_sum?.[0],
      uv: d.uv_index_max?.[0] ?? q.uv_index, european_aqi: q.european_aqi,
      pm2_5: q.pm2_5, pm10: q.pm10, nitrogen_dioxide: q.nitrogen_dioxide, ozone: q.ozone,
      sulphur_dioxide: q.sulphur_dioxide, carbon_monoxide: q.carbon_monoxide,
      alder_pollen: q.alder_pollen, birch_pollen: q.birch_pollen, grass_pollen: q.grass_pollen,
      mugwort_pollen: q.mugwort_pollen, olive_pollen: q.olive_pollen, ragweed_pollen: q.ragweed_pollen,
    };
  }, [meteo, aer]);

  const depășiri = useMemo(() => {
    if (!meteo) return [];
    return praguri.filter((p) => {
      if (!activ[p.k]) return false;
      const v = valori[p.k];
      if (v == null || Number.isNaN(v)) return false;
      return p.sens === "peste" ? v > p.v : v < p.v;
    }).map((p) => ({ ...p, actual: valori[p.k] }));
  }, [praguri, activ, valori, meteo]);

  /* ---- notificări ---- */
  const adaugăToast = useCallback((t) => {
    const id = Date.now() + Math.random();
    setToasturi((x) => [...x, { ...t, id }]);
    setTimeout(() => setToasturi((x) => x.filter((y) => y.id !== id)), 7000);
  }, []);

  useEffect(() => {
    if (!meteo) return;
    const noi = depășiri.filter((d) => !anunțate.current.has(d.k + ":" + loc.n));
    depășiri.forEach((d) => anunțate.current.add(d.k + ":" + loc.n));
    /* curăț pragurile care nu mai sunt depășite, ca să poată anunța din nou */
    Array.from(anunțate.current).forEach((cheie) => {
      const [k, o] = cheie.split(":");
      if (o === loc.n && !depășiri.some((d) => d.k === k)) anunțate.current.delete(cheie);
    });
    noi.forEach((d) => {
      adaugăToast({
        emo: d.emo, titlu: d.nume,
        text: `${rot(d.actual, d.actual < 10 && d.actual > -10 ? 1 : 0)}${d.u ? " " + d.u : ""} în ${loc.n} · limita ta e ${d.v}${d.u ? " " + d.u : ""}`,
      });
      if (notifOn && permis === "granted") {
        try {
          new Notification(`${d.emo}  ${d.nume} — ${loc.n}`, {
            body: `${rot(d.actual, 0)}${d.u ? " " + d.u : ""}, peste limita ta de ${d.v}${d.u ? " " + d.u : ""}.`,
            tag: "vremea-" + d.k,
          });
        } catch (e) { /* browserul a blocat notificarea */ }
      }
    });
  }, [depășiri, meteo, loc.n, notifOn, permis, adaugăToast]);

  const cereVoie = useCallback(async () => {
    try {
      const p = await Notification.requestPermission();
      setPermis(p);
      if (p === "granted") {
        setNotifOn(true);
        try { new Notification("🔔 Gata!", { body: "Îți dau de veste când ceva trece de limitele tale." }); } catch (e) { }
      }
    } catch (e) { setPermis("blocat"); }
  }, []);

  /* ---- context vizual ---- */
  const c = meteo?.current;
  const d = meteo?.daily;
  const esteZi = c?.is_day === 1;
  const faza = useMemo(() => {
    if (!d?.sunrise) return "zi";
    const acum = Date.now();
    const rs = new Date(d.sunrise[0]).getTime(), ap = new Date(d.sunset[0]).getTime();
    if (Math.abs(acum - rs) < 4.5e6) return "zori";
    if (Math.abs(acum - ap) < 4.5e6) return "amurg";
    return "zi";
  }, [d]);
  const cer = paletaCer(c?.weather_code ?? 3, esteZi, faza);

  const orașeFiltrate = useMemo(() => {
    const s = fărăDiacritice(interogare.trim());
    if (!s) return CITIES;
    return CITIES.filter((x) => fărăDiacritice(x.n).includes(s) || fărăDiacritice(x.j).includes(s));
  }, [interogare]);

  const codMax = depășiri.length
    ? (depășiri.some((x) => (x.sens === "peste" ? x.actual > x.v * 1.35 : x.actual < x.v - 6)) ? COD.mare : COD.ridicat)
    : null;

  /* limitele active, ca graficele să le poată desena */
  const limite = useMemo(
    () => Object.fromEntries(praguri.map((p) => [p.k, activ[p.k] ? p.v : null])),
    [praguri, activ]
  );

  const FILE = [
    { k: "acum", e: "Acum", i: "☀️" },
    { k: "prognoza", e: "7 zile", i: "📅" },
    { k: "radar", e: "Radar", i: "🌧️" },
    { k: "aer", e: "Aer", i: "🌬️" },
    { k: "setari", e: "Alerte", i: "🔔" },
  ];

  return (
    <div className="vr">
      <style>{STIL}</style>

      {/* ---------------------------- ANTET ---------------------------- */}
      <header className="antet">
        <button className="loc" onClick={() => { setCaută(true); setInterogare(""); }}>
          <span className="pin">📍</span>
          <span className="nume">{loc.n}</span>
          <span className="sageata">▾</span>
        </button>
        <button className="rotund" onClick={localizează} title="Folosește locația mea"
          aria-label="Folosește locația mea">
          <span className={gpsStare === "caut" ? "invarte" : ""}>🎯</span>
        </button>
        <button className="rotund" onClick={() => adu(loc)} title="Reîmprospătează"
          aria-label="Reîmprospătează datele">
          <span className={seÎncarcă ? "invarte" : ""}>🔄</span>
        </button>
      </header>

      {gpsStare === "refuzat" && (
        <div className="fâșie">Browserul nu îmi dă voie la locație. Poți alege orașul din listă. 🙂</div>
      )}
      {(gpsStare === "eșuat" || gpsStare === "lent" || gpsStare === "indisponibil") && (
        <div className="fâșie">Nu am găsit poziția ta acum. Alege orașul din listă.</div>
      )}

      <main className="corp">
        {eroare && (
          <div className="card rosu">
            <div style={{ fontSize: 34 }}>🛰️</div>
            <h3>{eroare}</h3>
            <button className="buton" onClick={() => adu(loc)}>Încearcă din nou</button>
          </div>
        )}

        {seÎncarcă && !meteo && (
          <div className="card centru">
            <div className="ilu pluteste" style={{ fontSize: 46 }}>🌦️</div>
            <h3 style={{ marginTop: 10 }}>Mă uit pe cer deasupra {loc.n}…</h3>
          </div>
        )}

        {meteo && (
          <>
            {depășiri.length > 0 && (
              <div className="alerta" style={{ background: codMax.moale, borderColor: codMax.c }}>
                <div className="alerta-cap" style={{ color: codMax.c }}>
                  <span className="clopot">🔔</span>
                  <b>{depășiri.length === 1 ? "Un lucru de știut azi" : `${depășiri.length} lucruri de știut azi`}</b>
                </div>
                {depășiri.map((x) => (
                  <div className="alerta-rand" key={x.k}>
                    <span className="ae">{x.emo}</span>
                    <span className="an">{x.nume}</span>
                    <span className="av" style={{ color: codMax.c }}>
                      {rot(x.actual, x.actual < 10 && x.actual > -10 ? 1 : 0)}{x.u && " " + x.u}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {fila === "acum" && <Acum meteo={meteo} aer={aer} loc={loc} cer={cer} esteZi={esteZi} faza={faza} limite={limite} />}
            {fila === "prognoza" && <Prognoza meteo={meteo} zi={zi} setZi={setZi} limite={limite} />}
            {fila === "radar" && <Radar loc={loc} />}
            {fila === "aer" && <Aer aer={aer} limite={limite} />}
            {fila === "setari" && (
              <Setari praguri={praguri} setPraguri={setPraguri} activ={activ} setActiv={setActiv}
                valori={valori} notifOn={notifOn} setNotifOn={setNotifOn} permis={permis} cereVoie={cereVoie}
                test={() => adaugăToast({ emo: "🔔", titlu: "Așa arată o alertă", text: "Apare exact așa când o valoare trece de limita ta." })}
                reset={() => { setPraguri(PRAGURI_INIT); setActiv(Object.fromEntries(PRAGURI_INIT.map((p) => [p.k, true]))); }} />
            )}
          </>
        )}
      </main>

      {/* --------------------------- TOASTURI -------------------------- */}
      <div className="toasturi">
        {toasturi.map((t) => (
          <div className="toast" key={t.id}>
            <span className="temo">{t.emo}</span>
            <div><b>{t.titlu}</b><span>{t.text}</span></div>
            <button onClick={() => setToasturi((x) => x.filter((y) => y.id !== t.id))} aria-label="Închide">✕</button>
          </div>
        ))}
      </div>

      {/* --------------------------- CĂUTARE --------------------------- */}
      {caută && (
        <div className="foaie">
          <div className="foaie-cap">
            <input autoFocus value={interogare} onChange={(e) => setInterogare(e.target.value)}
              placeholder="Caută orașul tău…" />
            <button className="text-btn" onClick={() => setCaută(false)}>Gata</button>
          </div>
          <button className="gps-mare" onClick={localizează}>
            <span>🎯</span>
            <div>
              <b>{gpsStare === "caut" ? "Te caut pe hartă…" : "Folosește locația mea"}</b>
              <span>Prognoză exact pentru unde ești acum</span>
            </div>
          </button>
          <div className="lista">
            {orașeFiltrate.length === 0 && <div className="centru" style={{ padding: 40 }}>Nu găsesc orașul. Încearcă altfel scris. 🔎</div>}
            {orașeFiltrate.map((x) => (
              <button key={x.n + x.j} className="oras"
                onClick={() => { setLoc(x); setCaută(false); setFila("acum"); }}>
                <span className="on" style={x.n === loc.n ? { color: "#EA580C", fontWeight: 700 } : null}>{x.n}</span>
                <span className="oj">{x.j}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* -------------------------- NAVIGAȚIE -------------------------- */}
      <nav className="nav">
        {FILE.map((t) => (
          <button key={t.k} className={fila === t.k ? "on" : ""} onClick={() => setFila(t.k)}
            aria-current={fila === t.k ? "page" : undefined}>
            <span className="ni">{t.i}</span>
            <span className="ne">{t.e}</span>
            {t.k === "setari" && depășiri.length > 0 && <i className="bulina">{depășiri.length}</i>}
          </button>
        ))}
      </nav>
    </div>
  );
}

/* ============================== FILA ACUM ================================= */
function Acum({ meteo, aer, loc, cer, esteZi, faza, limite }) {
  const c = meteo.current, d = meteo.daily, q = aer?.current;
  const acum = new Date();
  const ore = useMemo(() => {
    const h = meteo.hourly; if (!h) return [];
    const i0 = Math.max(0, h.time.findIndex((t) => new Date(t) >= acum) - 1);
    return h.time.slice(i0, i0 + 12).map((t, i) => ({
      t, temp: h.temperature_2m[i0 + i], cod: h.weather_code[i0 + i], pp: h.precipitation_probability[i0 + i],
    }));
  }, [meteo]);

  const uvN = scaraUV(d.uv_index_max?.[0]);
  const aqiN = scaraAQI(q?.european_aqi);
  const polenTop = useMemo(() => {
    if (!q) return null;
    let cel = null;
    POLEN.forEach((p) => {
      const v = q[p.k]; if (v == null) return;
      if (!cel || v / SCARI_POLEN[p.k][1] > cel.raport) cel = { ...p, v, raport: v / SCARI_POLEN[p.k][1] };
    });
    return cel;
  }, [q]);

  return (
    <>
      {/* ---- cerul ---- */}
      <section className="cer" style={{ background: `linear-gradient(165deg, ${cer[0]} 0%, ${cer[1]} 52%, ${cer[2]} 100%)` }}>
        <div className="cer-strat" />
        <div className="cer-sus">
          <span>{ZILE[acum.getDay()][0].toUpperCase() + ZILE[acum.getDay()].slice(1)}, {acum.getDate()} {LUNI[acum.getMonth()]}</span>
          <span>{ora(c.time)}</span>
        </div>
        <div className="cer-mijloc">
          <div>
            <div className="temp"><span>{rot(c.temperature_2m)}</span><i>°</i></div>
            <div className="stare">{descrie(c.weather_code)}</div>
            <div className="resimtit">Parcă ar fi {rot(c.apparent_temperature)}°</div>
          </div>
          <Ilustratie cod={c.weather_code} zi={esteZi} s={112} />
        </div>
        <div className="cer-jos">
          <span>⬆ {rot(d.temperature_2m_max[0])}°</span>
          <span>⬇ {rot(d.temperature_2m_min[0])}°</span>
          <span>🌅 {ora(d.sunrise[0])}</span>
          <span>🌇 {ora(d.sunset[0])}</span>
        </div>
      </section>

      {/* ---- rezumat prietenos ---- */}
      <div className="sfat">
        <span>💬</span>
        <p>{rezumat({ c, d, q, uvN, aqiN, polenTop, faza })}</p>
      </div>

      {/* ---- pe ore ---- */}
      <section className="card">
        <h3 className="titlu">Următoarele ore</h3>
        <div className="ore">
          {ore.map((o, i) => (
            <div className="ora" key={o.t}>
              <span className="oo">{i === 0 ? "acum" : ora(o.t)}</span>
              <Ilustratie cod={o.cod} zi={new Date(o.t).getHours() > 6 && new Date(o.t).getHours() < 21} s={38} animat={false} />
              <span className="ot">{rot(o.temp)}°</span>
              <span className="op" style={{ opacity: o.pp > 15 ? 1 : 0 }}>💧{o.pp}%</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---- pastile colorate ---- */}
      <div className="grid2">
        <Pastila emo="☀️" titlu="Soarele" valoare={rot(d.uv_index_max?.[0], 1)} sub={"UV " + uvN.eticheta}
          n={uvN} procent={Math.min(100, ((d.uv_index_max?.[0] ?? 0) / 11) * 100)} />
        <Pastila emo="🌬️" titlu="Aerul" valoare={rot(q?.european_aqi)} sub={q ? aqiN.eticheta : "fără date"}
          n={aqiN} procent={Math.min(100, ((q?.european_aqi ?? 0) / 100) * 100)} />
        {polenTop && (
          <Pastila emo={polenTop.emo} titlu={polenTop.nume} valoare={rot(polenTop.v, polenTop.v < 10 ? 1 : 0)}
            sub={scaraPolen(polenTop.k)(polenTop.v).eticheta} n={scaraPolen(polenTop.k)(polenTop.v)}
            procent={Math.min(100, (polenTop.v / (SCARI_POLEN[polenTop.k][2] * 1.2)) * 100)} />
        )}
        <Pastila emo="💨" titlu="Vântul" valoare={rot(c.wind_speed_10m)} sub={"km/h din " + directie(c.wind_direction_10m)}
          n={c.wind_gusts_10m > 60 ? COD.ridicat : COD.bun} procent={Math.min(100, (c.wind_speed_10m / 80) * 100)} />
      </div>

      <div className="grid3">
        {[["💧", "Umezeală", rot(c.relative_humidity_2m) + "%"],
        ["🌡️", "Presiune", rot(c.pressure_msl) + " hPa"],
        ["☁️", "Nori", rot(c.cloud_cover) + "%"]].map(([e, t, v]) => (
          <div className="mic" key={t}><span>{e}</span><b>{v}</b><i>{t}</i></div>
        ))}
      </div>

      <section className="card">
        <h3 className="titlu">☀️ Cât de tare arde soarele, oră de oră</h3>
        <GraficUV hourly={meteo.hourly} ziISO={d.time[0]} limita={limite?.uv} esteAzi />
      </section>

      <p className="nota">
        Date din modelele ECMWF și ICON, aer și polen din Copernicus CAMS. Pentru avertizările oficiale
        (cod galben, portocaliu, roșu) rămâne ANM — meteoromania.ro.
      </p>
    </>
  );
}

function Pastila({ emo, titlu, valoare, sub, n, procent }) {
  return (
    <div className="pastila" style={{ background: n.moale }}>
      <div className="pt"><span>{emo}</span>{titlu}</div>
      <div className="pv" style={{ color: n.c }}>{valoare}</div>
      <div className="ps" style={{ color: n.c }}>{sub}</div>
      <div className="pb"><i style={{ width: procent + "%", background: n.c }} /></div>
    </div>
  );
}

function rezumat({ c, d, q, uvN, aqiN, polenTop, faza }) {
  const b = [];
  const t = c.temperature_2m, cod = c.weather_code, tip = tipVreme(cod);
  if (t >= 32) b.push("E caniculă afară, bea multă apă");
  else if (t >= 26) b.push("E cald și plăcut");
  else if (t >= 16) b.push("Vreme bună de ieșit");
  else if (t >= 6) b.push("E răcoare, ia o geacă");
  else if (t >= -3) b.push("E frig, îmbracă-te gros");
  else b.push("E ger, acoperă-te bine");

  if (tip === "oraj") b.push("și se anunță furtună — stai la adăpost");
  else if (tip === "ploaie") b.push("și plouă, ia umbrela");
  else if (tip === "burnita") b.push("și burnițează ușor");
  else if (tip === "ninsoare") b.push("și ninge");
  else if (tip === "ceata") b.push("dar e ceață, atenție la volan");
  else if (d.precipitation_probability_max?.[0] > 55) b.push(`dar sunt ${d.precipitation_probability_max[0]}% șanse de ploaie mai târziu`);

  let s = b.join(" ") + ".";
  const extra = [];
  if ((d.uv_index_max?.[0] ?? 0) >= 6) extra.push(`Soarele arde ${uvN.eticheta} la prânz — cremă și pălărie.`);
  if ((q?.european_aqi ?? 0) >= 60) extra.push("Aerul nu e grozav azi, evită alergatul pe stradă.");
  if (polenTop && polenTop.v > SCARI_POLEN[polenTop.k][1]) extra.push(`Mult polen de ${polenTop.nume.toLowerCase()} — dacă ai alergii, ține geamurile închise.`);
  if (d.wind_gusts_10m_max?.[0] >= 60) extra.push("Bate vântul tare, atenție la obiectele nefixate.");
  if (!extra.length && faza === "amurg") extra.push("Apusul e aproape — ai o oră bună de lumină.");
  return s + (extra.length ? " " + extra.slice(0, 2).join(" ") : "");
}

/* ============================ FILA 7 ZILE ================================= */
function Prognoza({ meteo, zi, setZi, limite }) {
  const d = meteo.daily;
  const n = Math.min(7, d.time.length);
  const maxe = d.temperature_2m_max.slice(0, n), mine = d.temperature_2m_min.slice(0, n);
  const sus = Math.max(...maxe), jos = Math.min(...mine);
  const rng = Math.max(6, sus - jos);
  const W = 340, H = 112, P = 24;
  const x = (i) => P + (i * (W - P * 2)) / (n - 1);
  const y = (t) => 26 + ((sus - t) / rng) * (H - 52);
  const curbă = (arr) => {
    let p = `M ${x(0)} ${y(arr[0])}`;
    for (let i = 1; i < arr.length; i++) {
      const xm = (x(i - 1) + x(i)) / 2;
      p += ` C ${xm} ${y(arr[i - 1])}, ${xm} ${y(arr[i])}, ${x(i)} ${y(arr[i])}`;
    }
    return p;
  };
  const s = {
    dt: new Date(d.time[zi]), cod: d.weather_code[zi], max: d.temperature_2m_max[zi],
    min: d.temperature_2m_min[zi], uv: d.uv_index_max[zi], mm: d.precipitation_sum[zi],
    pp: d.precipitation_probability_max[zi], v: d.wind_speed_10m_max[zi],
    raf: d.wind_gusts_10m_max[zi], rs: d.sunrise[zi], ap: d.sunset[zi],
  };
  const uvN = scaraUV(s.uv);

  return (
    <>
      <section className="card">
        <h3 className="titlu">Cum merge temperatura</h3>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", overflow: "visible" }}>
          <defs>
            <linearGradient id="umple" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FB923C" stopOpacity=".38" />
              <stop offset="100%" stopColor="#FB923C" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${curbă(maxe)} L ${x(n - 1)} ${H} L ${x(0)} ${H} Z`} fill="url(#umple)" />
          <path d={curbă(mine)} fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" opacity=".75" />
          <path d={curbă(maxe)} fill="none" stroke="#F97316" strokeWidth="3.2" strokeLinecap="round" />
          {maxe.map((t, i) => (
            <g key={i} onClick={() => setZi(i)} style={{ cursor: "pointer" }}>
              <rect x={x(i) - 24} y="0" width="48" height={H} fill="transparent" />
              <circle cx={x(i)} cy={y(t)} r={i === zi ? 6 : 4} fill={i === zi ? "#F97316" : "#fff"} stroke="#F97316" strokeWidth="3" />
              <circle cx={x(i)} cy={y(mine[i])} r={i === zi ? 5 : 3.4} fill={i === zi ? "#60A5FA" : "#fff"} stroke="#60A5FA" strokeWidth="2.5" />
              <text x={x(i)} y={y(t) - 13} textAnchor="middle" fontSize="12" fontWeight="700" fill="#EA580C">{Math.round(t)}°</text>
            </g>
          ))}
        </svg>
        <div className="zile">
          {d.time.slice(0, n).map((t, i) => (
            <button key={t} className={"zib" + (i === zi ? " sel" : "")} onClick={() => setZi(i)}>
              <span className="zn">{i === 0 ? "azi" : ZS[new Date(t).getDay()]}</span>
              <Ilustratie cod={d.weather_code[i]} s={30} animat={false} />
              <span className="zd">{new Date(t).getDate()}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <div className="zi-cap">
          <div>
            <h2>{zi === 0 ? "Astăzi" : ZILE[s.dt.getDay()][0].toUpperCase() + ZILE[s.dt.getDay()].slice(1)}</h2>
            <p>{s.dt.getDate()} {LUNI[s.dt.getMonth()]} · {descrie(s.cod)}</p>
          </div>
          <Ilustratie cod={s.cod} s={68} />
        </div>
        <div className="grid2 mic-gol">
          <Cutie emo="🌡️" et="Temperatura" v={`${rot(s.max)}° / ${rot(s.min)}°`} cul="#F97316" />
          <Cutie emo="🌧️" et="Șanse de ploaie" v={`${rot(s.pp)}%`} sub={`${rot(s.mm, 1)} mm`} cul="#3B82F6" />
          <Cutie emo="💨" et="Vânt" v={`${rot(s.v)} km/h`} sub={`rafale ${rot(s.raf)}`} cul="#0EA5E9" />
          <Cutie emo="☀️" et="Soare" v={rot(s.uv, 1)} sub={"UV " + uvN.eticheta} cul={uvN.c} />
        </div>
        <div className="sfat mini">
          <span>😎</span><p>{sfatUV(s.uv)}</p>
        </div>
        <div className="lumina">
          <span>🌅 {ora(s.rs)}</span>
          <div className="linie"><i /></div>
          <span>{ora(s.ap)} 🌇</span>
        </div>
      </section>

      <section className="card">
        <h3 className="titlu">☀️ Soarele pe ore, {zi === 0 ? "azi" : ZS[s.dt.getDay()]}</h3>
        <GraficUV hourly={meteo.hourly} ziISO={d.time[zi]} limita={limite?.uv} esteAzi={zi === 0} />
      </section>
    </>
  );
}

function Cutie({ emo, et, v, sub, cul }) {
  return (
    <div className="cutie">
      <div className="ce">{emo} <span>{et}</span></div>
      <div className="cv" style={{ color: cul }}>{v}</div>
      {sub && <div className="cs">{sub}</div>}
    </div>
  );
}

const sfatUV = (v) => {
  if (v == null) return "Fără date despre soare.";
  if (v < 3) return "Poți sta liniștit la soare, nu e nevoie de protecție specială.";
  if (v < 6) return "Ia o pălărie dacă stai mult afară și pune cremă pe față.";
  if (v < 8) return "Stai la umbră între 11 și 16 și folosește cremă SPF 30.";
  if (v < 11) return "Soarele e foarte tare. SPF 50, ochelari, mâneci lungi la prânz.";
  return "Evită soarele direct. Arsurile apar în câteva minute.";
};

/* ============================== FILA RADAR ================================ */
function Radar({ loc }) {
  const [date, setDate] = useState(null);
  const [cadru, setCadru] = useState(0);
  const [merge, setMerge] = useState(true);
  const [z, setZ] = useState(7);
  const [eroare, setEroare] = useState(false);
  const [W, setW] = useState(340);
  const box = useRef(null);
  const H = 320;

  useEffect(() => {
    const el = box.current; if (!el) return;
    const m = () => setW(el.clientWidth || 340);
    m();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(m) : null;
    ro?.observe(el);
    return () => ro?.disconnect();
  }, []);

  useEffect(() => {
    let viu = true;
    fetch("https://api.rainviewer.com/public/weather-maps.json")
      .then((r) => r.json())
      .then((j) => {
        if (!viu) return;
        const f = [...(j.radar?.past || []), ...(j.radar?.nowcast || [])];
        if (!f.length) throw new Error();
        setDate({ host: j.host || "https://tilecache.rainviewer.com", cadre: f, trecute: (j.radar?.past || []).length });
        setCadru(Math.max(0, (j.radar?.past || []).length - 1));
      })
      .catch(() => viu && setEroare(true));
    return () => { viu = false; };
  }, []);

  useEffect(() => {
    if (!merge || !date) return;
    const i = setInterval(() => setCadru((c) => (c + 1) % date.cadre.length), 550);
    return () => clearInterval(i);
  }, [merge, date]);

  const grilă = useMemo(() => {
    const N = Math.pow(2, z);
    const tx = ((loc.lon + 180) / 360) * N;
    const ty = ((1 - Math.log(Math.tan((loc.lat * Math.PI) / 180) + 1 / Math.cos((loc.lat * Math.PI) / 180)) / Math.PI) / 2) * N;
    const px = tx * 256, py = ty * 256;
    const st = px - W / 2, sy = py - H / 2;
    const x0 = Math.floor(st / 256), x1 = Math.floor((st + W) / 256);
    const y0 = Math.floor(sy / 256), y1 = Math.floor((sy + H) / 256);
    const t = [];
    for (let X = x0; X <= x1; X++)
      for (let Y = y0; Y <= y1; Y++) {
        if (Y < 0 || Y >= N) continue;
        t.push({ X: ((X % N) + N) % N, Y, left: X * 256 - st, top: Y * 256 - sy });
      }
    return t;
  }, [loc, z, W]);

  /* preîncarc cadrele ca animația să nu clipească */
  useEffect(() => {
    if (!date) return;
    date.cadre.forEach((f) => grilă.forEach((t) => {
      const im = new Image();
      im.src = `${date.host}${f.path}/256/${z}/${t.X}/${t.Y}/4/1_1.png`;
    }));
  }, [date, grilă, z]);

  const f = date?.cadre[cadru];
  const momentul = f ? new Date(f.time * 1000) : null;
  const viitor = date && cadru >= date.trecute;

  return (
    <>
      <section className="card fara-pad">
        <div className="radar-cap">
          <h3 className="titlu" style={{ margin: 0 }}>Unde plouă acum</h3>
          <div className="zoom">
            <button onClick={() => setZ((v) => Math.max(5, v - 1))} aria-label="Depărtează">−</button>
            <button onClick={() => setZ((v) => Math.min(10, v + 1))} aria-label="Apropie">+</button>
          </div>
        </div>

        <div className="harta" ref={box} style={{ height: H }}>
          {eroare ? (
            <div className="centru" style={{ padding: 60 }}>
              <div style={{ fontSize: 34 }}>📡</div>
              <p>Radarul nu răspunde acum. Încearcă peste câteva minute.</p>
            </div>
          ) : (
            <>
              {grilă.map((t) => (
                <img key={"b" + t.X + "_" + t.Y} alt="" loading="eager"
                  src={`https://basemaps.cartocdn.com/rastertiles/voyager/${z}/${t.X}/${t.Y}.png`}
                  style={{ position: "absolute", left: t.left, top: t.top, width: 256, height: 256 }} />
              ))}
              {f && grilă.map((t) => (
                <img key={"r" + t.X + "_" + t.Y} alt="" loading="eager"
                  src={`${date.host}${f.path}/256/${z}/${t.X}/${t.Y}/4/1_1.png`}
                  style={{ position: "absolute", left: t.left, top: t.top, width: 256, height: 256, opacity: .82 }} />
              ))}
              <div className="ac" style={{ left: W / 2, top: H / 2 }}>
                <i /><span>{loc.n}</span>
              </div>
              {momentul && (
                <div className={"ceas" + (viitor ? " viitor" : "")}>
                  {viitor ? "prognoză " : ""}
                  {momentul.getHours().toString().padStart(2, "0")}:{momentul.getMinutes().toString().padStart(2, "0")}
                </div>
              )}
              {!date && <div className="ceas">se încarcă…</div>}
            </>
          )}
        </div>

        {date && (
          <div className="player">
            <button className="play" onClick={() => setMerge((m) => !m)} aria-label={merge ? "Pauză" : "Pornește"}>
              {merge ? "⏸" : "▶"}
            </button>
            <input type="range" min="0" max={date.cadre.length - 1} value={cadru}
              aria-label="Momentul afișat"
              onChange={(e) => { setMerge(false); setCadru(Number(e.target.value)); }} />
          </div>
        )}

        <div className="legenda">
          <span>ușoară</span>
          <div className="lg" />
          <span>torențială</span>
        </div>
      </section>

      <p className="nota">
        Imaginile vin de la rețeaua de radare meteo agregată de RainViewer, actualizată din 10 în 10 minute.
        Ultimele cadre, marcate „prognoză", sunt extrapolare pe termen scurt. Harta e de la OpenStreetMap și CARTO.
        Radarul oficial al ANM se vede pe meteoromania.ro.
      </p>
    </>
  );
}

/* =============================== FILA AER ================================= */
function Aer({ aer, limite }) {
  if (!aer?.current) return <div className="card centru"><div style={{ fontSize: 34 }}>🌫️</div><p>Nu am date despre aer aici. Încearcă un oraș din apropiere.</p></div>;
  const q = aer.current;
  const aqiN = scaraAQI(q.european_aqi);

  const poluanți = [
    { k: "pm2_5", nume: "Praf fin PM2.5", sub: "intră adânc în plămâni", s: scaraPM25, max: 75, emo: "😷" },
    { k: "pm10", nume: "Praf PM10", sub: "de la trafic și șantiere", s: scaraPM10, max: 150, emo: "🏗️" },
    { k: "nitrogen_dioxide", nume: "Dioxid de azot", sub: "mai ales de la mașini", s: scaraNO2, max: 230, emo: "🚗" },
    { k: "ozone", nume: "Ozon la sol", sub: "crește în zilele însorite", s: scaraO3, max: 240, emo: "🫧" },
    { k: "sulphur_dioxide", nume: "Dioxid de sulf", sub: "de la arderi și industrie", s: scaraSO2, max: 350, emo: "🏭" },
    { k: "carbon_monoxide", nume: "Monoxid de carbon", sub: "gaze de eșapament", s: scaraCO, max: 12400, emo: "💨" },
  ];

  const zile = useMemo(() => {
    const h = aer.hourly; if (!h) return [];
    const z = [];
    h.time.forEach((t, i) => {
      const d = t.slice(0, 10);
      let e = z.find((x) => x.d === d);
      if (!e) { e = { d, val: {} }; z.push(e); }
      POLEN.forEach((p) => { const v = h[p.k]?.[i]; if (v != null) e.val[p.k] = Math.max(e.val[p.k] ?? 0, v); });
    });
    return z.slice(0, 4);
  }, [aer]);

  return (
    <>
      <section className="aqi" style={{ background: aqiN.moale }}>
        <div className="aqi-emo">{q.european_aqi < 40 ? "😀" : q.european_aqi < 60 ? "🙂" : q.european_aqi < 80 ? "😕" : "😖"}</div>
        <div className="aqi-nr" style={{ color: aqiN.c }}>{rot(q.european_aqi)}</div>
        <div className="aqi-et" style={{ color: aqiN.c }}>Aerul e {aqiN.eticheta}</div>
        <div className="aqi-bara"><i style={{ width: Math.min(100, (q.european_aqi / 120) * 100) + "%", background: aqiN.c }} /></div>
        <p>{sfatAQI(q.european_aqi)}</p>
      </section>

      <section className="card">
        <h3 className="titlu">Ce e în aer</h3>
        {poluanți.map((p) => {
          const v = q[p.k], n = p.s(v);
          return (
            <div className="rand" key={p.k}>
              <span className="re">{p.emo}</span>
              <div className="rt">
                <b>{p.nume}</b><span>{p.sub}</span>
                <div className="rb"><i style={{ width: Math.min(100, ((v ?? 0) / p.max) * 100) + "%", background: n.c }} /></div>
              </div>
              <div className="rv"><b style={{ color: n.c }}>{rot(v, v < 10 ? 1 : 0)}</b><span style={{ color: n.c }}>{n.eticheta}</span></div>
            </div>
          );
        })}
      </section>

      <section className="card">
        <h3 className="titlu">Ce te poate face să strănuți</h3>
        {POLEN.map((p) => {
          const v = q[p.k], n = scaraPolen(p.k)(v), pr = SCARI_POLEN[p.k];
          return (
            <div className="rand" key={p.k}>
              <span className="re">{p.emo}</span>
              <div className="rt">
                <b>{p.nume}</b><span>{p.sezon}</span>
                <div className="rb"><i style={{ width: Math.min(100, ((v ?? 0) / (pr[2] * 1.2)) * 100) + "%", background: n.c }} /></div>
              </div>
              <div className="rv"><b style={{ color: n.c }}>{v == null ? "—" : rot(v, v < 10 ? 1 : 0)}</b><span style={{ color: n.c }}>{n.eticheta}</span></div>
            </div>
          );
        })}
      </section>

      <section className="card">
        <h3 className="titlu">Polenul oră de oră, 48 de ore</h3>
        <GraficPolen hourly={aer.hourly} curent={q} limite={limite} />
      </section>

      {zile.length > 1 && (
        <section className="card">
          <h3 className="titlu">Polenul în zilele următoare</h3>
          <div className="matrice">
            <div className="mr mcap">
              <span />
              {zile.map((z, i) => <span key={z.d}>{i === 0 ? "azi" : ZS[new Date(z.d).getDay()]}</span>)}
            </div>
            {POLEN.map((p) => (
              <div className="mr" key={p.k}>
                <span className="mn">{p.emo} {p.nume}</span>
                {zile.map((z) => {
                  const v = z.val[p.k], n = scaraPolen(p.k)(v);
                  return (
                    <span key={z.d} className="mc" style={{ background: v == null ? "#F1F5F9" : n.c }}>
                      {v == null ? "" : Math.round(v)}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </section>
      )}

      <p className="nota">
        Polenul e estimat de modelul european CAMS, nu numărat la o stație. Ambrozia dă simptome de la
        valori mici — 10 grăunciori/m³ înseamnă deja „mult", față de 50 la mesteacăn.
      </p>
    </>
  );
}

const sfatAQI = (v) => {
  if (v == null) return "Fără date.";
  if (v < 20) return "Aer curat. Poți alerga, plimba copilul, deschide geamurile larg.";
  if (v < 40) return "Aer bun. Nicio grijă pentru majoritatea oamenilor.";
  if (v < 60) return "Acceptabil. Dacă ai astm sau ești sensibil, nu forța efortul lung afară.";
  if (v < 80) return "Copiii, vârstnicii și astmaticii ar face bine să stea în casă la orele de vârf.";
  if (v < 100) return "Redu activitatea fizică afară. Ține geamurile închise dimineața și seara.";
  return "Ieși doar dacă e nevoie. Geamuri închise, purificator dacă ai unul.";
};

/* ============================= FILA ALERTE ================================ */
function Setari({ praguri, setPraguri, activ, setActiv, valori, notifOn, setNotifOn, permis, cereVoie, test, reset }) {
  const grupuri = useMemo(() => {
    const g = {};
    praguri.forEach((p) => { (g[p.grup] = g[p.grup] || []).push(p); });
    return g;
  }, [praguri]);
  const schimbă = (k, v) => setPraguri((ps) => ps.map((p) => (p.k === k ? { ...p, v } : p)));
  const câteActive = Object.values(activ).filter(Boolean).length;

  return (
    <>
      <section className="card intro">
        <div style={{ fontSize: 34 }}>🔔</div>
        <h2>Te anunț când e cazul</h2>
        <p>Spune-mi de la ce valoare începe să te deranjeze fiecare lucru. Când o depășim, primești
          o alertă colorată — galben, portocaliu sau roșu, după cât de mult s-a depășit.</p>
      </section>

      <section className="card">
        <div className="rand-comutator">
          <span className="re">📲</span>
          <div className="rt">
            <b>Notificări pe telefon</b>
            <span>
              {permis === "granted" ? "Ai dat voie — îți trimit alertele și când aplicația e închisă."
                : permis === "denied" ? "Browserul le blochează. Le poți reactiva din setările site-ului."
                  : permis === "indisponibil" ? "Browserul acesta nu le acceptă. Alertele apar totuși în aplicație."
                    : "Apasă ca să-mi dai voie să-ți trimit alerte."}
            </span>
          </div>
          {permis === "granted" ? (
            <button className={"com" + (notifOn ? " on" : "")} role="switch" aria-checked={notifOn}
              aria-label="Notificări pe telefon" onClick={() => setNotifOn((x) => !x)}><i /></button>
          ) : (
            <button className="buton mic" disabled={permis === "denied" || permis === "indisponibil"} onClick={cereVoie}>
              Dă voie
            </button>
          )}
        </div>
        <div className="rand-comutator">
          <span className="re">👀</span>
          <div className="rt"><b>Vezi cum arată o alertă</b><span>Fără să aștepți vremea rea</span></div>
          <button className="buton mic gol" onClick={test}>Testează</button>
        </div>
        <p className="mini-nota">Verific automat valorile la fiecare 15 minute cât ții aplicația deschisă.
          Ai {câteActive} {câteActive === 1 ? "alertă activă" : "alerte active"}.</p>
      </section>

      {Object.entries(grupuri).map(([grup, lista]) => (
        <section className="card" key={grup}>
          <h3 className="titlu">{EMO_GRUP[grup]} {grup}</h3>
          {lista.map((p) => {
            const on = activ[p.k], a = valori[p.k];
            const dep = on && a != null && (p.sens === "peste" ? a > p.v : a < p.v);
            return (
              <div className={"prag" + (dep ? " dep" : "")} key={p.k}>
                <div className="prag-cap">
                  <span className="re">{p.emo}</span>
                  <div className="rt" style={{ opacity: on ? 1 : .45 }}>
                    <b>{p.nume}</b>
                    <span>{a == null ? p.scurt : <>acum {rot(a, a < 10 && a > -10 ? 1 : 0)}{p.u && " " + p.u}{dep && " — peste limita ta"}</>}</span>
                  </div>
                  <button className={"com" + (on ? " on" : "")} role="switch" aria-checked={on}
                    aria-label={"Alertă pentru " + p.nume}
                    onClick={() => setActiv((x) => ({ ...x, [p.k]: !x[p.k] }))}><i /></button>
                </div>
                {on && (
                  <div className="prag-reg">
                    <span className="pe">{p.sens === "peste" ? "peste" : "sub"}</span>
                    <input type="range" min={p.min} max={p.max} step={p.pas} value={p.v}
                      aria-label={"Limita pentru " + p.nume}
                      onChange={(e) => schimbă(p.k, Number(e.target.value))} />
                    <span className="pv">{p.v}<small>{p.u}</small></span>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      ))}

      <button className="buton gol lat" onClick={reset}>Revino la valorile recomandate</button>
      <p className="nota">
        Valorile recomandate urmează pragurile din legislația europeană și recomandările OMS: PM2.5 la
        25 µg/m³, PM10 la 50 µg/m³, ozon la 120 µg/m³. Setările rămân pe acest telefon.
      </p>
    </>
  );
}

/* =========================== GRAFICE PE ORE =============================== */
const cale = (p) => {
  if (!p.length) return "";
  let d = `M ${p[0].x.toFixed(1)} ${p[0].y.toFixed(1)}`;
  for (let i = 1; i < p.length; i++) {
    const xm = (p[i - 1].x + p[i].x) / 2;
    d += ` C ${xm.toFixed(1)} ${p[i - 1].y.toFixed(1)}, ${xm.toFixed(1)} ${p[i].y.toFixed(1)}, ${p[i].x.toFixed(1)} ${p[i].y.toFixed(1)}`;
  }
  return d;
};
const hh = (t) => t.slice(11, 13);

/* Umple aria sub curbă cu un degrade legat de praguri, nu de estetică:
   fiecare culoare începe exact la valoarea de la care nivelul se schimbă. */
function Degrade({ id, trepte, culori, maxY, sus, jos }) {
  const stopuri = [];
  const pune = (v, c) => {
    if (v > maxY) return;
    stopuri.push({ o: 1 - v / maxY, c });
  };
  for (let i = trepte.length - 1; i >= 0; i--) pune(trepte[i], culori[i + 1]);
  pune(0, culori[0]);
  if (!stopuri.length || stopuri[0].o > 0.001) stopuri.unshift({ o: 0, c: culori[culori.length - 1] });
  return (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1={sus} x2="0" y2={jos}>
      {stopuri.map((s, i) => <stop key={i} offset={Math.max(0, Math.min(1, s.o))} stopColor={s.c} />)}
    </linearGradient>
  );
}

const CUL_UV = ["#16A34A", "#EAB308", "#F97316", "#EF4444", "#A21CAF"];
const CUL_POLEN = ["#16A34A", "#EAB308", "#F97316", "#EF4444"];

/* ------------------------------ GRAFIC UV -------------------------------- */
function GraficUV({ hourly, ziISO, limita, esteAzi }) {
  const serie = useMemo(() => {
    const t = [];
    hourly.time.forEach((x, i) => {
      if (x.slice(0, 10) === ziISO) t.push({ t: x, v: hourly.uv_index?.[i] ?? 0 });
    });
    if (!t.length) return [];
    let a = t.findIndex((o) => o.v > 0.05);
    let b = t.length - 1 - [...t].reverse().findIndex((o) => o.v > 0.05);
    if (a === -1) { a = 6; b = Math.min(20, t.length - 1); }
    return t.slice(Math.max(0, a - 1), Math.min(t.length, b + 2));
  }, [hourly, ziISO]);

  if (serie.length < 3) return null;

  const W = 340, H = 148, SL = 24, SR = 10, ST = 20, SB = 24;
  const vals = serie.map((o) => o.v);
  const vârf = Math.max(...vals);
  const maxY = Math.min(13, Math.max(3, Math.ceil(vârf) + 1));
  const x = (i) => SL + (i * (W - SL - SR)) / (serie.length - 1);
  const y = (v) => ST + (1 - Math.min(v, maxY) / maxY) * (H - ST - SB);
  const pts = serie.map((o, i) => ({ x: x(i), y: y(o.v) }));

  const iVârf = vals.indexOf(vârf);
  const nVârf = scaraUV(vârf);
  const iAcum = esteAzi ? serie.findIndex((o) => Number(hh(o.t)) === new Date().getHours()) : -1;

  const peste = limita != null ? serie.map((o, i) => (o.v >= limita ? i : -1)).filter((i) => i >= 0) : [];
  const rezumat = (() => {
    if (vârf < 1) return "Soarele e blând toată ziua. Nu ai nevoie de protecție.";
    const oV = hh(serie[iVârf].t) + ":00";
    if (!peste.length) {
      return limita == null
        ? `Cel mai puternic e la ${oV}, unde ajunge la ${vârf.toFixed(1)} — ${nVârf.eticheta}.`
        : `Vârful e ${vârf.toFixed(1)} la ${oV}. Nu trece de limita ta de ${limita}, deci ești în regulă azi.`;
    }
    return `Ferește-te de soare între ${hh(serie[peste[0]].t)}:00 și ${hh(serie[peste[peste.length - 1]].t)}:00 — atunci trece de limita ta de ${limita}. Maximul e ${vârf.toFixed(1)} la ${oV}.`;
  })();

  return (
    <div className="grafic">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", overflow: "visible" }}>
        <defs>
          <Degrade id="uvF" trepte={[3, 6, 8, 11]} culori={CUL_UV} maxY={maxY} sus={y(maxY)} jos={y(0)} />
          <linearGradient id="uvS" gradientUnits="userSpaceOnUse" x1="0" y1={y(maxY)} x2="0" y2={y(0)}>
            <stop offset={1 - Math.min(11, maxY) / maxY} stopColor="#A21CAF" />
            <stop offset={1 - Math.min(8, maxY) / maxY} stopColor="#EF4444" />
            <stop offset={1 - Math.min(6, maxY) / maxY} stopColor="#F97316" />
            <stop offset={1 - Math.min(3, maxY) / maxY} stopColor="#EAB308" />
            <stop offset="1" stopColor="#16A34A" />
          </linearGradient>
        </defs>

        {/* repere de nivel */}
        {[3, 6, 8, 11].filter((v) => v < maxY).map((v) => (
          <g key={v}>
            <line x1={SL} y1={y(v)} x2={W - SR} y2={y(v)} stroke="#E2E8F0" strokeDasharray="3 4" />
            <text x={SL - 6} y={y(v) + 3.5} textAnchor="end" className="gy">{v}</text>
          </g>
        ))}

        <path d={`${cale(pts)} L ${x(serie.length - 1)} ${y(0)} L ${x(0)} ${y(0)} Z`} fill="url(#uvF)" opacity=".26" />
        <path d={cale(pts)} fill="none" stroke="url(#uvS)" strokeWidth="3" strokeLinecap="round" />

        {/* limita ta */}
        {limita != null && limita <= maxY && (
          <g>
            <line x1={SL} y1={y(limita)} x2={W - SR} y2={y(limita)} stroke="#EF4444" strokeWidth="1.6" strokeDasharray="5 4" opacity=".8" />
            <rect x={W - SR - 54} y={y(limita) - 15} width="54" height="14" rx="7" fill="#FEE2E2" />
            <text x={W - SR - 27} y={y(limita) - 4.5} textAnchor="middle" className="gl">limita ta</text>
          </g>
        )}

        {/* vârful */}
        <circle cx={x(iVârf)} cy={y(vârf)} r="5" fill={nVârf.c} stroke="#fff" strokeWidth="2.5" />
        <text x={x(iVârf)} y={y(vârf) - 11} textAnchor="middle" className="gp" fill={nVârf.c}>{vârf.toFixed(1)}</text>

        {/* acum */}
        {iAcum >= 0 && (
          <g>
            <line x1={x(iAcum)} y1={ST - 6} x2={x(iAcum)} y2={y(0)} stroke="#1E293B" strokeWidth="1.4" strokeDasharray="3 3" opacity=".35" />
            <circle cx={x(iAcum)} cy={y(serie[iAcum].v)} r="4" fill="#1E293B" stroke="#fff" strokeWidth="2.5" />
            <text x={x(iAcum)} y={ST - 10} textAnchor="middle" className="gx" fill="#1E293B">acum</text>
          </g>
        )}

        {/* ore */}
        {serie.map((o, i) => (Number(hh(o.t)) % 3 === 0 ? (
          <text key={o.t} x={x(i)} y={H - 7} textAnchor="middle" className="gx">{hh(o.t)}</text>
        ) : null))}
      </svg>
      <div className="gsum"><span>😎</span><p>{rezumat}</p></div>
    </div>
  );
}

/* ---------------------------- GRAFIC POLEN ------------------------------- */
function GraficPolen({ hourly, curent, limite }) {
  const implicit = useMemo(() => {
    let cel = POLEN[2].k, m = -1;
    POLEN.forEach((p) => {
      const v = curent?.[p.k];
      if (v == null) return;
      const r = v / SCARI_POLEN[p.k][1];
      if (r > m) { m = r; cel = p.k; }
    });
    return cel;
  }, [curent]);
  const [k, setK] = useState(implicit);
  const p = POLEN.find((x) => x.k === k) || POLEN[2];
  const pr = SCARI_POLEN[k];
  const limita = limite?.[k];

  const serie = useMemo(() => {
    if (!hourly?.time) return [];
    const acum = Date.now();
    let i0 = hourly.time.findIndex((t) => new Date(t).getTime() >= acum - 36e5);
    if (i0 < 0) i0 = 0;
    return hourly.time.slice(i0, i0 + 48).map((t, j) => ({ t, v: hourly[k]?.[i0 + j] ?? 0 }));
  }, [hourly, k]);

  if (serie.length < 4) return null;

  const W = 340, H = 150, SL = 26, SR = 10, ST = 22, SB = 30;
  const vals = serie.map((o) => o.v);
  const vârf = Math.max(...vals);
  const maxY = Math.max(vârf * 1.18, pr[1] * 1.35, pr[0] * 2.2);
  const x = (i) => SL + (i * (W - SL - SR)) / (serie.length - 1);
  const y = (v) => ST + (1 - Math.min(v, maxY) / maxY) * (H - ST - SB);
  const pts = serie.map((o, i) => ({ x: x(i), y: y(o.v) }));
  const iVârf = vals.indexOf(vârf);
  const nVârf = scaraPolen(k)(vârf);
  const nAcum = scaraPolen(k)(serie[0].v);

  const zoriZile = serie.map((o, i) => (i > 0 && hh(o.t) === "00" ? i : -1)).filter((i) => i > 0);
  const eticheteZi = (i) => {
    const d = new Date(serie[i].t);
    const azi = new Date();
    const dif = Math.round((d.setHours(0, 0, 0, 0) - azi.setHours(0, 0, 0, 0)) / 864e5);
    return dif === 1 ? "mâine" : ZS[new Date(serie[i].t).getDay()];
  };

  const cândVârf = (() => {
    const d = new Date(serie[iVârf].t);
    const azi = new Date().getDate();
    const zi = d.getDate() === azi ? "azi" : eticheteZi(iVârf);
    return `${zi} la ${hh(serie[iVârf].t)}:00`;
  })();

  const rezumat = vârf < pr[0] * 0.5
    ? `Aproape deloc polen de ${p.nume.toLowerCase()} în următoarele două zile. Poți respira liniștit.`
    : limita != null && vârf >= limita
      ? `Trece de limita ta de ${limita} — cel mai mult ${cândVârf}, cu ${Math.round(vârf)} gr/m³. Ia-ți antihistaminicul înainte, nu după.`
      : `Vârful e ${cândVârf}, ${Math.round(vârf)} gr/m³ — ${nVârf.eticheta}. Sub limita ta${limita != null ? ` de ${limita}` : ""}.`;

  return (
    <div className="grafic">
      <div className="chipuri">
        {POLEN.map((s) => {
          const v = curent?.[s.k];
          const on = s.k === k;
          return (
            <button key={s.k} className={"chip" + (on ? " on" : "")}
              style={on ? { background: s.cul } : null} onClick={() => setK(s.k)}>
              <span>{s.emo}</span>{s.nume}
              <b style={{ opacity: .8 }}>{v == null ? "—" : Math.round(v)}</b>
            </button>
          );
        })}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", overflow: "visible" }}>
        <defs>
          <Degrade id={"pF" + k} trepte={pr} culori={CUL_POLEN} maxY={maxY} sus={y(maxY)} jos={y(0)} />
        </defs>

        {/* praguri de nivel */}
        {pr.filter((v) => v < maxY * 0.95).map((v, i) => (
          <g key={v}>
            <line x1={SL} y1={y(v)} x2={W - SR} y2={y(v)} stroke="#E2E8F0" strokeDasharray="3 4" />
            <text x={SL - 6} y={y(v) + 3.5} textAnchor="end" className="gy">{v}</text>
            <text x={W - SR} y={y(v) - 4} textAnchor="end" className="gn" fill={CUL_POLEN[i + 1]}>
              {["puțin", "mult", "foarte mult"][i]}
            </text>
          </g>
        ))}

        {/* granițe între zile */}
        {zoriZile.map((i) => (
          <g key={i}>
            <line x1={x(i)} y1={ST - 8} x2={x(i)} y2={y(0)} stroke="#CBD5E1" strokeWidth="1.2" />
            <text x={x(i) + 4} y={ST - 11} className="gx" textAnchor="start">{eticheteZi(i)}</text>
          </g>
        ))}

        <path d={`${cale(pts)} L ${x(serie.length - 1)} ${y(0)} L ${x(0)} ${y(0)} Z`} fill={`url(#pF${k})`} opacity=".3" />
        <path d={cale(pts)} fill="none" stroke={p.cul} strokeWidth="2.8" strokeLinecap="round" />

        {limita != null && limita <= maxY && (
          <g>
            <line x1={SL} y1={y(limita)} x2={W - SR} y2={y(limita)} stroke="#EF4444" strokeWidth="1.6" strokeDasharray="5 4" opacity=".85" />
            <rect x={SL + 2} y={y(limita) - 15} width="54" height="14" rx="7" fill="#FEE2E2" />
            <text x={SL + 29} y={y(limita) - 4.5} textAnchor="middle" className="gl">limita ta</text>
          </g>
        )}

        {vârf > pr[0] * 0.4 && (
          <>
            <circle cx={x(iVârf)} cy={y(vârf)} r="5" fill={nVârf.c} stroke="#fff" strokeWidth="2.5" />
            <text x={x(iVârf)} y={y(vârf) - 11} textAnchor="middle" className="gp" fill={nVârf.c}>{Math.round(vârf)}</text>
          </>
        )}
        <circle cx={x(0)} cy={y(serie[0].v)} r="4" fill="#1E293B" stroke="#fff" strokeWidth="2.5" />

        {serie.map((o, i) => (Number(hh(o.t)) % 6 === 0 ? (
          <text key={o.t} x={x(i)} y={H - 12} textAnchor="middle" className="gx">{hh(o.t)}</text>
        ) : null))}
        <text x={SL} y={H - 1} className="gx" textAnchor="start" fill="#CBD5E1">
          acum · {Math.round(serie[0].v)} gr/m³, {nAcum.eticheta}
        </text>
      </svg>
      <div className="gsum"><span>{p.emo}</span><p>{rezumat}</p></div>
    </div>
  );
}

/* ================================= STIL =================================== */
const STIL = `
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap');

.vr{
  --ink:#1E293B; --ink2:#64748B; --ink3:#94A3B8;
  --card:#FFFFFF; --pag:#EEF4FA; --umbra:0 2px 14px rgba(30,41,59,.07);
  --acc:#F97316;
  font-family:'Nunito',system-ui,-apple-system,sans-serif; color:var(--ink);
  background:linear-gradient(180deg,#E6F0FA 0%,#EEF4FA 220px,#F2F6FA 100%);
  max-width:430px; margin:0 auto; min-height:100vh; position:relative; overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}
.vr *{box-sizing:border-box;}
.vr h1,.vr h2,.vr h3{font-family:'Fredoka',sans-serif;font-weight:600;margin:0;letter-spacing:-.01em;}
.vr p{margin:0;}
.vr button{font-family:inherit;cursor:pointer;border:none;background:none;color:inherit;}
.vr button:focus-visible,.vr input:focus-visible{outline:3px solid #FDBA74;outline-offset:2px;border-radius:8px;}

/* antet */
.antet{position:sticky;top:0;z-index:30;display:flex;gap:8px;align-items:center;
  padding:12px 14px;background:rgba(238,244,250,.92);backdrop-filter:blur(12px);}
.loc{flex:1;display:flex;align-items:center;gap:7px;background:#fff;border-radius:999px;
  padding:9px 15px;box-shadow:var(--umbra);min-width:0;}
.loc .pin{font-size:14px;}
.loc .nume{font-weight:800;font-size:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.loc .sageata{color:var(--ink3);font-size:11px;margin-left:auto;}
.rotund{width:42px;height:42px;border-radius:50%;background:#fff;box-shadow:var(--umbra);
  display:flex;align-items:center;justify-content:center;font-size:17px;flex:none;}
.rotund:active{transform:scale(.93);}
.invarte{display:inline-block;animation:inv 1s linear infinite;}
@keyframes inv{to{transform:rotate(360deg);}}
.fâșie{margin:0 14px 4px;background:#FEF3C7;color:#92400E;border-radius:14px;padding:10px 14px;font-size:12.5px;font-weight:600;}

.corp{padding:6px 14px 104px;}

/* alerta */
.alerta{border:2px solid;border-radius:20px;padding:14px 16px;margin-bottom:14px;
  animation:sus .4s cubic-bezier(.2,.9,.3,1) both;}
.alerta-cap{display:flex;align-items:center;gap:8px;font-family:'Fredoka',sans-serif;font-size:15px;margin-bottom:9px;}
.clopot{animation:suna 2.4s ease-in-out infinite;display:inline-block;transform-origin:top center;}
@keyframes suna{0%,88%,100%{transform:rotate(0);}91%{transform:rotate(13deg);}94%{transform:rotate(-11deg);}97%{transform:rotate(6deg);}}
.alerta-rand{display:flex;align-items:center;gap:9px;padding:5px 0;font-size:13.5px;}
.alerta-rand .ae{font-size:15px;}
.alerta-rand .an{font-weight:600;}
.alerta-rand .av{margin-left:auto;font-weight:800;font-variant-numeric:tabular-nums;white-space:nowrap;}
@keyframes sus{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:none;}}

/* cer */
.cer{position:relative;border-radius:26px;padding:16px 18px 15px;color:#fff;overflow:hidden;
  margin-bottom:14px;box-shadow:0 8px 26px rgba(30,58,95,.22);}
.cer-strat{position:absolute;inset:0;background:radial-gradient(120% 70% at 20% 0%,rgba(255,255,255,.22),transparent 60%);}
.cer>*{position:relative;}
.cer-sus{display:flex;justify-content:space-between;font-size:12.5px;font-weight:700;opacity:.88;}
.cer-mijloc{display:flex;align-items:center;justify-content:space-between;gap:6px;margin:4px 0 12px;}
.temp{display:flex;align-items:flex-start;font-family:'Fredoka',sans-serif;line-height:1;}
.temp span{font-size:76px;font-weight:500;letter-spacing:-.04em;text-shadow:0 2px 12px rgba(0,0,0,.16);}
.temp i{font-size:34px;font-style:normal;font-weight:400;margin-top:6px;opacity:.9;}
.stare{font-family:'Fredoka',sans-serif;font-size:19px;font-weight:500;margin-top:2px;}
.resimtit{font-size:13px;opacity:.85;margin-top:2px;font-weight:600;}
.cer-jos{display:flex;gap:14px;font-size:12.5px;font-weight:700;padding-top:11px;
  border-top:1px solid rgba(255,255,255,.24);}

/* sfat */
.sfat{display:flex;gap:10px;background:#fff;border-radius:18px;padding:13px 15px;margin-bottom:14px;
  box-shadow:var(--umbra);}
.sfat span{font-size:18px;flex:none;}
.sfat p{font-size:13.5px;line-height:1.55;font-weight:600;color:#334155;}
.sfat.mini{margin:12px 0 0;background:#FFF7ED;box-shadow:none;}

/* carduri */
.card{background:var(--card);border-radius:22px;padding:16px;margin-bottom:14px;box-shadow:var(--umbra);}
.card.fara-pad{padding:0;overflow:hidden;}
.card.rosu{text-align:center;border:2px solid #FCA5A5;}
.card.centru,.centru{text-align:center;}
.card.intro{text-align:center;}
.card.intro h2{font-size:21px;margin:6px 0 6px;}
.card.intro p{font-size:13.5px;line-height:1.6;color:var(--ink2);font-weight:600;}
.titlu{font-size:16px;margin-bottom:12px;}

/* ore */
.ore{display:flex;gap:2px;overflow-x:auto;margin:0 -6px;padding:0 4px 4px;scrollbar-width:none;}
.ore::-webkit-scrollbar{display:none;}
.ora{flex:none;width:56px;display:flex;flex-direction:column;align-items:center;gap:1px;
  padding:8px 0;border-radius:14px;}
.ora:first-child{background:#FFF7ED;}
.oo{font-size:11.5px;font-weight:700;color:var(--ink2);}
.ot{font-size:16px;font-weight:800;font-family:'Fredoka',sans-serif;}
.op{font-size:10px;font-weight:700;color:#2E8FE0;}

/* pastile */
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-bottom:14px;}
.grid2.mic-gol{margin-bottom:0;gap:10px;}
.pastila{border-radius:20px;padding:14px;box-shadow:var(--umbra);}
.pt{display:flex;align-items:center;gap:6px;font-size:12.5px;font-weight:800;color:#475569;}
.pt span{font-size:15px;}
.pv{font-family:'Fredoka',sans-serif;font-size:32px;font-weight:600;line-height:1.05;margin-top:5px;}
.ps{font-size:12px;font-weight:700;text-transform:lowercase;}
.pb{height:5px;border-radius:3px;background:rgba(30,41,59,.09);margin-top:9px;overflow:hidden;}
.pb i{display:block;height:100%;border-radius:3px;transition:width .6s cubic-bezier(.2,.9,.3,1);}

.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:11px;margin-bottom:14px;}
.mic{background:#fff;border-radius:18px;padding:12px 8px;text-align:center;box-shadow:var(--umbra);}
.mic span{font-size:17px;}
.mic b{display:block;font-family:'Fredoka',sans-serif;font-size:16px;font-weight:600;margin-top:3px;}
.mic i{display:block;font-style:normal;font-size:11px;font-weight:700;color:var(--ink3);margin-top:1px;}

/* zile */
.zile{display:flex;gap:2px;margin-top:8px;}
.zib{flex:1;display:flex;flex-direction:column;align-items:center;gap:1px;padding:8px 0 6px;border-radius:14px;}
.zib.sel{background:#FFF7ED;box-shadow:inset 0 0 0 2px #FDBA74;}
.zn{font-size:11.5px;font-weight:800;color:var(--ink2);}
.zib.sel .zn{color:#EA580C;}
.zd{font-size:11px;font-weight:700;color:var(--ink3);}

.zi-cap{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
.zi-cap h2{font-size:22px;}
.zi-cap p{font-size:13px;color:var(--ink2);font-weight:600;margin-top:2px;}
.cutie{background:#F8FAFC;border-radius:16px;padding:12px;}
.ce{font-size:12px;font-weight:800;color:var(--ink2);}
.ce span{margin-left:3px;}
.cv{font-family:'Fredoka',sans-serif;font-size:22px;font-weight:600;margin-top:3px;}
.cs{font-size:11.5px;font-weight:700;color:var(--ink3);}
.lumina{display:flex;align-items:center;gap:10px;margin-top:14px;font-size:12.5px;font-weight:700;color:var(--ink2);}
.lumina .linie{flex:1;height:4px;border-radius:2px;background:linear-gradient(90deg,#FDBA74,#FDE68A,#93C5FD);}

/* randuri */
.rand{display:flex;align-items:flex-start;gap:11px;padding:11px 0;border-top:1px solid #F1F5F9;}
.rand:first-of-type{border-top:none;}
.re{font-size:19px;flex:none;margin-top:1px;}
.rt{flex:1;min-width:0;}
.rt b{display:block;font-size:13.5px;font-weight:800;}
.rt span{display:block;font-size:11.5px;color:var(--ink3);font-weight:600;margin-top:1px;}
.rb{height:5px;border-radius:3px;background:#F1F5F9;margin-top:7px;overflow:hidden;}
.rb i{display:block;height:100%;border-radius:3px;transition:width .6s;}
.rv{text-align:right;flex:none;}
.rv b{font-family:'Fredoka',sans-serif;font-size:18px;font-weight:600;}
.rv span{display:block;font-size:10.5px;font-weight:800;}

/* aqi */
.aqi{border-radius:24px;padding:22px 18px;text-align:center;margin-bottom:14px;box-shadow:var(--umbra);}
.aqi-emo{font-size:40px;}
.aqi-nr{font-family:'Fredoka',sans-serif;font-size:56px;font-weight:600;line-height:1;margin-top:4px;}
.aqi-et{font-family:'Fredoka',sans-serif;font-size:18px;font-weight:500;}
.aqi-bara{height:7px;border-radius:4px;background:rgba(30,41,59,.1);margin:14px 0 12px;overflow:hidden;}
.aqi-bara i{display:block;height:100%;border-radius:4px;transition:width .6s;}
.aqi p{font-size:13px;line-height:1.55;font-weight:600;color:#334155;}

/* matrice polen */
.matrice{display:flex;flex-direction:column;gap:4px;}
.mr{display:grid;grid-template-columns:1.5fr repeat(4,1fr);gap:4px;align-items:center;}
.mcap span{font-size:10.5px;font-weight:800;color:var(--ink3);text-align:center;text-transform:uppercase;letter-spacing:.04em;}
.mn{font-size:12px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.mc{height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center;
  font-size:11.5px;font-weight:800;color:#fff;}

/* radar */
.radar-cap{display:flex;align-items:center;justify-content:space-between;padding:14px 16px 10px;}
.zoom{display:flex;gap:6px;}
.zoom button{width:32px;height:32px;border-radius:10px;background:#F1F5F9;font-size:17px;font-weight:700;color:#475569;}
.zoom button:active{background:#E2E8F0;}
.harta{position:relative;overflow:hidden;background:#DCE7F0;}
.harta img{pointer-events:none;user-select:none;}
.ac{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:3px;pointer-events:none;}
.ac i{width:15px;height:15px;border-radius:50%;background:#F97316;border:3px solid #fff;
  box-shadow:0 0 0 3px rgba(249,115,22,.28);}
.ac span{background:rgba(255,255,255,.94);border-radius:8px;padding:2px 8px;font-size:11px;font-weight:800;
  box-shadow:0 1px 5px rgba(0,0,0,.18);white-space:nowrap;}
.ceas{position:absolute;top:10px;left:10px;background:rgba(255,255,255,.94);border-radius:10px;
  padding:5px 11px;font-size:12.5px;font-weight:800;box-shadow:0 1px 6px rgba(0,0,0,.14);}
.ceas.viitor{background:#FFEDD5;color:#C2410C;}
.player{display:flex;align-items:center;gap:12px;padding:12px 16px 4px;}
.play{width:40px;height:40px;border-radius:50%;background:var(--acc);color:#fff;font-size:15px;flex:none;
  box-shadow:0 3px 10px rgba(249,115,22,.35);}
.player input[type=range]{flex:1;}
.legenda{display:flex;align-items:center;gap:9px;padding:6px 16px 16px;font-size:10.5px;font-weight:700;color:var(--ink3);}
.lg{flex:1;height:7px;border-radius:4px;
  background:linear-gradient(90deg,#9BD7F5,#4FA8E8,#3EC97A,#F2D64B,#F08A2E,#E03B2F,#B12A8B);}

/* grafice pe ore */
.grafic{margin-top:2px;}
.grafic svg text{font-family:'Nunito',sans-serif;}
.gx{font-size:9.5px;font-weight:800;fill:#94A3B8;}
.gy{font-size:9px;font-weight:800;fill:#CBD5E1;}
.gn{font-size:8.5px;font-weight:800;letter-spacing:.02em;opacity:.75;}
.gl{font-size:8.5px;font-weight:800;fill:#DC2626;letter-spacing:.02em;}
.gp{font-size:12px;font-weight:800;}
.gsum{display:flex;gap:10px;align-items:flex-start;background:#F8FAFC;border-radius:15px;
  padding:11px 13px;margin-top:12px;}
.gsum span{font-size:17px;flex:none;line-height:1.2;}
.gsum p{font-size:12.5px;line-height:1.55;font-weight:700;color:#475569;}
.chipuri{display:flex;gap:7px;overflow-x:auto;padding:0 2px 12px;margin:0 -2px;scrollbar-width:none;}
.chipuri::-webkit-scrollbar{display:none;}
.chip{flex:none;display:flex;align-items:center;gap:5px;border-radius:999px;padding:7px 12px;
  background:#F1F5F9;font-size:12.5px;font-weight:800;color:#64748B;transition:all .16s;white-space:nowrap;}
.chip.on{color:#fff;box-shadow:0 3px 10px rgba(30,41,59,.18);}
.chip:active{transform:scale(.95);}
.chip b{font-weight:800;font-variant-numeric:tabular-nums;}

/* range general */
.vr input[type=range]{-webkit-appearance:none;appearance:none;height:6px;border-radius:3px;background:#E2E8F0;}
.vr input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:24px;height:24px;border-radius:50%;
  background:var(--acc);border:4px solid #fff;box-shadow:0 2px 7px rgba(249,115,22,.4);cursor:grab;}
.vr input[type=range]::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:var(--acc);
  border:4px solid #fff;box-shadow:0 2px 7px rgba(249,115,22,.4);cursor:grab;}

/* praguri */
.prag{padding:13px 0;border-top:1px solid #F1F5F9;}
.prag:first-of-type{border-top:none;}
.prag.dep{background:#FFF7ED;margin:0 -16px;padding-left:16px;padding-right:16px;border-radius:14px;border-top-color:transparent;}
.prag-cap,.rand-comutator{display:flex;align-items:center;gap:11px;}
.rand-comutator{padding:11px 0;border-top:1px solid #F1F5F9;}
.rand-comutator:first-of-type{border-top:none;padding-top:0;}
.com{width:46px;height:27px;border-radius:999px;background:#E2E8F0;position:relative;flex:none;transition:background .2s;}
.com.on{background:#22C55E;}
.com i{position:absolute;top:3px;left:3px;width:21px;height:21px;border-radius:50%;background:#fff;
  box-shadow:0 1px 3px rgba(0,0,0,.2);transition:transform .22s cubic-bezier(.3,1.5,.5,1);}
.com.on i{transform:translateX(19px);}
.prag-reg{display:flex;align-items:center;gap:11px;margin-top:11px;padding-left:30px;}
.pe{font-size:11px;font-weight:800;color:var(--ink3);text-transform:uppercase;}
.pv{font-family:'Fredoka',sans-serif;font-size:17px;font-weight:600;min-width:66px;text-align:right;}
.pv small{font-size:11px;font-weight:400;color:var(--ink2);margin-left:2px;}
.mini-nota{font-size:11.5px;color:var(--ink3);font-weight:700;padding-top:11px;line-height:1.5;}

/* butoane */
.buton{background:var(--acc);color:#fff;border-radius:999px;padding:11px 22px;font-size:14px;font-weight:800;
  box-shadow:0 3px 12px rgba(249,115,22,.32);margin-top:12px;}
.buton.mic{padding:8px 15px;font-size:12.5px;margin:0;flex:none;}
.buton.gol{background:#fff;color:var(--acc);box-shadow:inset 0 0 0 2px #FED7AA;}
.buton.lat{display:block;width:100%;margin:2px 0 0;}
.buton:disabled{opacity:.45;box-shadow:none;cursor:not-allowed;}
.text-btn{font-size:14px;font-weight:800;color:var(--acc);padding:8px;}

.nota{font-size:11.5px;line-height:1.6;color:var(--ink3);font-weight:600;padding:2px 6px 0;}

/* toasturi */
.toasturi{position:fixed;top:10px;left:0;right:0;z-index:70;max-width:430px;margin:0 auto;
  padding:0 14px;display:flex;flex-direction:column;gap:8px;pointer-events:none;}
.toast{display:flex;align-items:center;gap:11px;background:#fff;border-radius:18px;padding:12px 14px;
  box-shadow:0 8px 26px rgba(30,41,59,.22);border-left:5px solid var(--acc);pointer-events:auto;
  animation:intra .38s cubic-bezier(.2,1.1,.35,1) both;}
@keyframes intra{from{opacity:0;transform:translateY(-14px) scale(.96);}to{opacity:1;transform:none;}}
.temo{font-size:22px;flex:none;}
.toast div{flex:1;min-width:0;}
.toast b{display:block;font-size:13.5px;font-weight:800;}
.toast span{display:block;font-size:11.5px;color:var(--ink2);font-weight:600;margin-top:1px;line-height:1.4;}
.toast button{font-size:13px;color:var(--ink3);padding:4px 2px;flex:none;}

/* foaia de căutare */
.foaie{position:fixed;inset:0;z-index:80;background:#F2F6FA;max-width:430px;margin:0 auto;
  display:flex;flex-direction:column;animation:urca .25s ease-out both;}
@keyframes urca{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:none;}}
.foaie-cap{display:flex;gap:8px;align-items:center;padding:14px;}
.foaie-cap input{flex:1;border:none;background:#fff;border-radius:999px;padding:12px 18px;font-size:16px;
  font-family:inherit;font-weight:600;color:var(--ink);box-shadow:var(--umbra);}
.foaie-cap input::placeholder{color:var(--ink3);font-weight:600;}
.gps-mare{display:flex;align-items:center;gap:12px;margin:0 14px 10px;background:#fff;border-radius:18px;
  padding:14px;box-shadow:var(--umbra);text-align:left;width:calc(100% - 28px);}
.gps-mare>span{font-size:24px;}
.gps-mare b{display:block;font-size:14px;font-weight:800;}
.gps-mare>div>span{display:block;font-size:11.5px;color:var(--ink3);font-weight:600;margin-top:1px;}
.lista{flex:1;overflow-y:auto;padding:0 14px 24px;}
.oras{width:100%;display:flex;align-items:baseline;gap:10px;padding:13px 14px;text-align:left;
  border-bottom:1px solid #E4EBF2;}
.oras:active{background:#E8F0F8;}
.on{font-size:15px;font-weight:700;}
.oj{font-size:11.5px;color:var(--ink3);margin-left:auto;font-weight:700;}

/* navigație */
.nav{position:fixed;bottom:0;left:0;right:0;max-width:430px;margin:0 auto;z-index:40;display:flex;
  background:rgba(255,255,255,.96);backdrop-filter:blur(14px);border-top:1px solid #E4EBF2;
  padding:6px 6px calc(6px + env(safe-area-inset-bottom));}
.nav button{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:7px 2px 4px;
  border-radius:14px;position:relative;transition:background .16s;}
.nav button.on{background:#FFF3E6;}
.nav .ni{font-size:19px;filter:grayscale(.55);opacity:.62;transition:all .18s;}
.nav button.on .ni{filter:none;opacity:1;transform:translateY(-1px) scale(1.08);}
.nav .ne{font-size:10px;font-weight:800;color:var(--ink3);}
.nav button.on .ne{color:#EA580C;}
.bulina{position:absolute;top:3px;right:calc(50% - 22px);background:#EF4444;color:#fff;font-style:normal;
  font-size:9.5px;font-weight:800;min-width:16px;height:16px;border-radius:999px;display:flex;
  align-items:center;justify-content:center;padding:0 4px;border:2px solid #fff;}

/* animații ilustrații */
.ilu .soare{animation:rotSoare 26s linear infinite;}
@keyframes rotSoare{to{transform:rotate(360deg);}}
.ilu .pulseaza{animation:puls 4s ease-in-out infinite;transform-origin:center;}
@keyframes puls{0%,100%{opacity:1;}50%{opacity:.86;}}
.ilu .pluteste,.pluteste{animation:plut 5s ease-in-out infinite;}
@keyframes plut{0%,100%{transform:translateX(0);}50%{transform:translateX(3px);}}
.ilu .cade{animation:cad 1.15s linear infinite;}
@keyframes cad{0%{opacity:0;transform:translateY(-7px);}25%{opacity:1;}100%{opacity:0;transform:translateY(11px);}}
.ilu .fulger{animation:fulg 2.6s ease-in-out infinite;}
@keyframes fulg{0%,72%,100%{opacity:.35;}76%,84%{opacity:1;}80%{opacity:.4;}}
.ilu .clipeste{animation:clip 3.4s ease-in-out infinite;}
@keyframes clip{0%,100%{opacity:.35;}50%{opacity:1;}}
.ilu.fara-misc *{animation:none!important;}
@media (prefers-reduced-motion:reduce){.vr *{animation:none!important;transition:none!important;}}
`;
