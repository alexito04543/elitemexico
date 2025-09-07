const fs = require('fs');

function countBraces(filePath, startLine, endLine) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  let braceCount = 0;
  
  for(let i = startLine - 1; i < endLine; i++) {
    const line = lines[i] || '';
    // Remove strings and comments from line for counting
    const cleanLine = line.replace(/\/\*[\s\S]*?\*\//g, '')
                          .replace(/\/\/.*/g, '')
                          .replace(/"[^"]*"/g, '""')
                          .replace(/'[^']*'/g, "''")
                          .replace(/`[^`]*`/g, '``');
    
    const openBraces = (cleanLine.match(/{/g) || []).length;
    const closeBraces = (cleanLine.match(/}/g) || []).length;
    
    braceCount += openBraces - closeBraces;
    
    if (openBraces > 0 || closeBraces > 0) {
      console.log(`Line ${i+1}: +${openBraces} -${closeBraces} = ${braceCount} | ${line.substring(0, 50)}`);
    }
  }
  
  return braceCount;
}

console.log('\n=== nuevos-lanzamientos/page.tsx ===');
console.log('Checking from line 104 (function start) to line 316 (return statement)');
const count1 = countBraces('src/app/nuevos-lanzamientos/page.tsx', 104, 316);
console.log(`Final brace count: ${count1}`);

console.log('\n=== LuxuryCarCollection.tsx ===');
console.log('Checking from line 70 (function start) to line 158 (return statement)');
const count2 = countBraces('src/components/ui/LuxuryCarCollection.tsx', 70, 158);
console.log(`Final brace count: ${count2}`);