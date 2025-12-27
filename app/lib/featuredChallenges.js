export function getUtcDateKey(d = new Date()) {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

export function hash32(str) {
  // FNV-1a 32-bit
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function pickBySeed(list, seed) {
  if (!Array.isArray(list) || list.length === 0) return null;
  return list[seed % list.length];
}

export function normalizeCategoryGroup(category = "") {
  const c = String(category).toLowerCase();
  if (c.includes("typescript")) return "typescript";
  if (c.includes("react")) return "react";
  if (c.includes("javascript")) return "javascript";
  return "other";
}


