import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const sourcePath = path.join(projectRoot, 'data', 'vocabulary.ts');
const defaultOutputPath = path.join(projectRoot, 'data', 'vocabulary.deduped.ts');

const args = new Set(process.argv.slice(2));
const shouldWriteInPlace = args.has('--write');
const outputPath = shouldWriteInPlace ? sourcePath : defaultOutputPath;

function splitTopLevelArgs(text) {
  const args = [];
  let current = '';
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (const char of text) {
    current += char;

    if (escaped) {
      escaped = false;
      continue;
    }

    if (quote) {
      if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '\'' || char === '"' || char === '`') {
      quote = char;
      continue;
    }

    if (char === '(' || char === '[' || char === '{') {
      depth += 1;
      continue;
    }

    if (char === ')' || char === ']' || char === '}') {
      depth -= 1;
      continue;
    }

    if (char === ',' && depth === 0) {
      args.push(current.slice(0, -1).trim());
      current = '';
    }
  }

  if (current.trim()) {
    args.push(current.trim());
  }

  return args;
}

function readQuotedValue(expression) {
  const value = expression.trim();
  if (!value) {
    return null;
  }

  const quote = value[0];
  if (!['\'', '"', '`'].includes(quote)) {
    return null;
  }

  let result = '';
  let escaped = false;

  for (let i = 1; i < value.length; i += 1) {
    const char = value[i];

    if (escaped) {
      result += char;
      escaped = false;
      continue;
    }

    if (char === '\\') {
      escaped = true;
      continue;
    }

    if (char === quote) {
      return result;
    }

    result += char;
  }

  return null;
}

function extractCreateWordArgs(line) {
  const start = line.indexOf('createWord(');
  if (start === -1) {
    return null;
  }

  let quote = null;
  let escaped = false;
  let depth = 0;
  let content = '';

  for (let i = start + 'createWord('.length; i < line.length; i += 1) {
    const char = line[i];

    if (escaped) {
      content += char;
      escaped = false;
      continue;
    }

    if (quote) {
      content += char;
      if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '\'' || char === '"' || char === '`') {
      quote = char;
      content += char;
      continue;
    }

    if (char === '(' || char === '[' || char === '{') {
      depth += 1;
      content += char;
      continue;
    }

    if (char === ')' && depth === 0) {
      return splitTopLevelArgs(content);
    }

    if (char === ')' || char === ']' || char === '}') {
      depth -= 1;
      content += char;
      continue;
    }

    content += char;
  }

  return null;
}

async function main() {
  const original = await fs.readFile(sourcePath, 'utf8');
  const lines = original.split(/\r?\n/);
  const seenWords = new Map();
  const removedEntries = [];
  const keptLines = [];

  for (const line of lines) {
    const createWordArgs = extractCreateWordArgs(line);

    if (!createWordArgs) {
      keptLines.push(line);
      continue;
    }

    const [, englishArg, chineseArg] = createWordArgs;
    const english = readQuotedValue(englishArg);

    if (!english) {
      keptLines.push(line);
      continue;
    }

    const key = english.trim().toLowerCase();

    if (!seenWords.has(key)) {
      seenWords.set(key, {
        english,
        chinese: readQuotedValue(chineseArg) ?? chineseArg,
      });
      keptLines.push(line);
      continue;
    }

    removedEntries.push({
      english,
      line,
      firstSeen: seenWords.get(key),
    });
  }

  await fs.writeFile(outputPath, `${keptLines.join('\n')}\n`, 'utf8');

  console.log(`Source: ${sourcePath}`);
  console.log(`Output: ${outputPath}`);
  console.log(`Kept unique words: ${seenWords.size}`);
  console.log(`Removed duplicates: ${removedEntries.length}`);

  if (removedEntries.length > 0) {
    console.log('\nRemoved entries:');
    for (const entry of removedEntries) {
      console.log(`- ${entry.english} (first kept: ${entry.firstSeen.chinese})`);
    }
  }

  if (!shouldWriteInPlace) {
    console.log('\nTip: run with --write to overwrite data/vocabulary.ts directly.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
