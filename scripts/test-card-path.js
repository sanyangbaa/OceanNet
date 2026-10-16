const fs = require('fs');

function getCardPath(w, h, r = 18, tabW = 88, shelfY = 60, stroke = 1.5) {
  const pad = stroke / 2;
  const left = pad;
  const top = pad;
  const right = w - pad;
  const bottom = h - pad;
  const effectiveTabW = Math.min(tabW, w - r * 2.5);
  const effectiveShelfY = shelfY;

  return [
    `M ${left} ${top + r}`,
    `A ${r} ${r} 0 0 1 ${left + r} ${top}`,
    `H ${effectiveTabW - r}`,
    `A ${r} ${r} 0 0 1 ${effectiveTabW} ${top + r}`,
    `V ${effectiveShelfY - r}`,
    `A ${r} ${r} 0 0 0 ${effectiveTabW + r} ${effectiveShelfY}`,
    `H ${right - r}`,
    `A ${r} ${r} 0 0 1 ${right} ${effectiveShelfY + r}`,
    `V ${bottom - r}`,
    `A ${r} ${r} 0 0 1 ${right - r} ${bottom}`,
    `H ${left + r}`,
    `A ${r} ${r} 0 0 1 ${left} ${bottom - r}`,
    'Z'
  ].join(' ');
}

const w = 260, h = 380, r = 18, tabW = 86, shelfY = 62;
const d = getCardPath(w, h, r, tabW, shelfY);
console.log('Path:', d);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <path d="${d}" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
</svg>`;

fs.writeFileSync('C:\\Users\\THINKERS ELECTRONICS\\.gemini\\antigravity-ide\\brain\\556fc1f2-c168-44ce-9bee-dca89295e15c\\.tempmediaStorage\\card_shape.svg', svg);
console.log('Saved card_shape.svg');
