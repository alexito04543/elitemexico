const fs = require('fs');

function checkSyntax(filePath, errorLine) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  // Get code up to the error line
  const codeUntilError = lines.slice(0, errorLine).join('\n');
  
  let openBraces = 0;
  let openParens = 0;
  let openBrackets = 0;
  let inString = false;
  let stringChar = null;
  
  for(let i = 0; i < codeUntilError.length; i++) {
    const char = codeUntilError[i];
    const prevChar = i > 0 ? codeUntilError[i-1] : '';
    
    // Handle strings (basic, not handling all edge cases)
    if (!inString && (char === '"' || char === "'" || char === '`')) {
      if (prevChar !== '\\') {
        inString = true;
        stringChar = char;
      }
    } else if (inString && char === stringChar && prevChar !== '\\') {
      inString = false;
      stringChar = null;
    } else if (!inString) {
      // Count braces/parens/brackets
      if (char === '{') openBraces++;
      if (char === '}') openBraces--;
      if (char === '(') openParens++;
      if (char === ')') openParens--;
      if (char === '[') openBrackets++;
      if (char === ']') openBrackets--;
    }
  }
  
  console.log(`\nChecking ${filePath} up to line ${errorLine}:`);
  console.log('Open braces:', openBraces);
  console.log('Open parens:', openParens);
  console.log('Open brackets:', openBrackets);
  console.log('In string:', inString);
  
  // Show context around error
  console.log('\nContext around error line:');
  for(let i = Math.max(0, errorLine - 5); i < Math.min(lines.length, errorLine + 3); i++) {
    const marker = i === errorLine - 1 ? ' >>> ' : '     ';
    console.log(`${i+1}:${marker}${lines[i]}`);
  }
}

// Check both files
checkSyntax('src/components/ui/LuxuryCarCollection.tsx', 159);
checkSyntax('src/app/nuevos-lanzamientos/page.tsx', 317);