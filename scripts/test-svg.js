const fs = require('fs');

function getPath(w, h, r, tabWidth, shelfY) {
  // Clamp values so geometry is always valid
  const effectiveTabW = Math.min(tabWidth, w - r * 2);
  const effectiveR = Math.min(r, Math.floor(shelfY / 2), Math.floor(effectiveTabW / 2));
  
  return [
    `M 0 ${effectiveR}`,
    `A ${effectiveR} ${effectiveR} 0 0 1 ${effectiveR} 0`,
    `H ${effectiveTabW - effectiveR}`,
    `A ${effectiveR} ${effectiveR} 0 0 1 ${effectiveTabW} ${effectiveR}`,
    `V ${shelfY - effectiveR}`,
    `A ${effectiveR} ${effectiveR} 0 0 0 ${effectiveTabW + effectiveR} ${shelfY}`,
    `H ${w - effectiveR}`,
    `A ${effectiveR} ${effectiveR} 0 0 1 ${w} ${shelfY + effectiveR}`,
    `V ${h - effectiveR}`,
    `A ${effectiveR} ${effectiveR} 0 0 1 ${w - effectiveR} ${h}`,
    `H ${effectiveR}`,
    `A ${effectiveR} ${effectiveR} 0 0 1 0 ${h - effectiveR}`,
    'Z'
  ].join(' ');
}

const w = 240, h = 360, r = 20, tabWidth = 84, shelfY = 64;
const d = getPath(w, h, r, tabWidth, shelfY);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <path d="${d}" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
</svg>`;

fs.writeFileSync('C:\\Users\\THINKERS ELECTRONICS\\.gemini\\antigravity-ide\\brain\\556fc1f2-c168-44ce-9bee-dca89295e15c\\.tempmediaStorage\\test_card.svg', svg);
console.log('Saved test_card.svg successfully');
