const fs = require('fs');

const content = fs.readFileSync('src/components/ui/LuxuryCarCollection.tsx', 'utf8');
const lines = content.split('\n');

// Focus on lines 70-160
console.log('Component structure analysis:');
console.log('Line 70: Component function starts');

let braceCount = 0;
let parenCount = 0;

for(let i = 69; i < 160; i++) {
  const line = lines[i];
  const openBraces = (line.match(/{/g) || []).length;
  const closeBraces = (line.match(/}/g) || []).length;
  const openParens = (line.match(/\(/g) || []).length;
  const closeParens = (line.match(/\)/g) || []).length;
  
  braceCount += openBraces - closeBraces;
  parenCount += openParens - closeParens;
  
  if (openBraces > 0 || closeBraces > 0 || i === 155 || i === 156 || i === 157 || i === 158) {
    console.log(`Line ${i+1}: ${line.substring(0, 60)}... | Braces: ${braceCount}, Parens: ${parenCount}`);
  }
}