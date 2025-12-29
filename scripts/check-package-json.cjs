const fs = require('fs');
const path = require('path');

const p = path.resolve(process.cwd(), 'package.json');
try {
  const raw = fs.readFileSync(p, 'utf8');
  try {
    JSON.parse(raw);
    console.log('package.json: OK');
    process.exit(0);
  } catch (err) {
    console.error('package.json: JSON parse error:', err.message);
    // Try to give helpful context around the error position, if present
    const m = err.message.match(/position (\d+)/i);
    if (m) {
      const pos = Number(m[1]);
      const start = Math.max(0, pos - 80);
      const end = Math.min(raw.length, pos + 80);
      console.error('\nContext around error (showing characters and hex):\n');
      console.error(raw.slice(start, end));
      const hex = Buffer.from(raw.slice(start, end)).toString('hex').match(/.{1,2}/g).join(' ');
      console.error('\nHex bytes:\n', hex);
    } else {
      console.error('\nFull file contents:\n');
      console.error(raw);
    }
    process.exit(2);
  }
} catch (err) {
  console.error('Could not read package.json:', err.message);
  process.exit(1);
}
