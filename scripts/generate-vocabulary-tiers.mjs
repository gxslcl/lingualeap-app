import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const sourcePath = path.join(projectRoot, 'data', 'vocabulary.ts');
const outputPath = path.join(projectRoot, 'data', 'vocabularyTiers.ts');

const CATEGORY_BONUS = {
  DailyLife: 3,
  Basics: 4,
  People: 3,
  Home: 2,
  DailyCommunication: 4,
  TravelCommunication: 3,
  WorkCommunication: 2,
};

const CORE_SINGLE_WORDS = new Set([
  'i', 'you', 'he', 'she', 'it', 'we', 'they',
  'me', 'him', 'her', 'us', 'them',
  'my', 'your', 'his', 'our', 'their',
  'this', 'that', 'these', 'those',
  'who', 'what', 'where', 'when', 'why', 'how', 'which',
  'can', 'do', 'say', 'go', 'come', 'get', 'make', 'take', 'see', 'know',
  'think', 'want', 'need', 'give', 'find', 'tell', 'ask', 'feel', 'try', 'use',
  'work', 'like', 'love', 'call', 'put', 'help', 'play', 'run', 'eat', 'drink',
  'sleep', 'read', 'write', 'speak', 'listen', 'watch', 'wait', 'buy', 'pay',
  'sell', 'open', 'close', 'start', 'stop', 'live', 'walk', 'talk', 'learn',
  'study', 'teach', 'answer', 'remember', 'forget', 'bring', 'keep', 'leave',
  'move', 'show', 'meet', 'sit', 'stand', 'turn', 'begin', 'follow',
  'good', 'bad', 'big', 'small', 'long', 'short', 'new', 'old', 'hot', 'cold',
  'happy', 'sad', 'easy', 'hard', 'fast', 'slow', 'right', 'wrong',
  'today', 'tomorrow', 'yesterday', 'always', 'never', 'often', 'sometimes',
  'now', 'soon', 'really', 'very', 'maybe', 'please', 'thanks', 'hello', 'bye',
  'yes', 'no', 'ok', 'okay', 'time', 'day', 'week', 'month', 'year',
  'man', 'woman', 'boy', 'girl', 'child', 'friend', 'family',
  'water', 'food', 'money', 'phone', 'home', 'school', 'job', 'car', 'bus',
]);

const CORE_PHRASES = [
  'how are you',
  'how are you doing',
  'what do you think',
  'how have you been',
  "what's up",
  "how's it going",
  'long time no see',
  'take care',
  'never mind',
  'of course',
  'no problem',
  'let me think',
  "i don't know",
  'i have no idea',
  'that makes sense',
  "i'm looking forward to",
  "i need to",
  'good to see you',
  'excuse me',
  'thank you',
  'see you',
];

const EXTENDED_SUFFIXES = [
  'tion', 'sion', 'ment', 'ness', 'tude', 'ship', 'ology', 'ality',
  'ential', 'ability', 'ibility', 'ization', 'isation', 'preneur',
];

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
  if (!value) return null;

  const quote = value[0];
  if (!['\'', '"', '`'].includes(quote)) return null;

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
  if (start === -1) return null;

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
      if (char === '\\') escaped = true;
      else if (char === quote) quote = null;
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

function classifyEntry({ english, category }) {
  const normalized = english.trim().toLowerCase();
  const words = normalized.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const charLength = normalized.replace(/\s+/g, '').length;
  const isPhrase = wordCount > 1;
  const hasPunctuation = /[!?.,]/.test(english);
  const hasApostrophe = normalized.includes("'");
  const categoryBonus = CATEGORY_BONUS[category] ?? 0;

  let score = categoryBonus;

  if (CORE_SINGLE_WORDS.has(normalized)) score += 5;
  if (CORE_PHRASES.some((phrase) => normalized.includes(phrase))) score += 5;

  if (isPhrase) {
    score += 2;
    if (wordCount <= 4) score += 2;
    if (wordCount >= 7) score -= 1;
  } else {
    if (charLength <= 4) score += 3;
    else if (charLength <= 7) score += 1;
    else if (charLength >= 11) score -= 2;
  }

  if (hasPunctuation) score += 1;
  if (hasApostrophe) score += 1;

  if (EXTENDED_SUFFIXES.some((suffix) => normalized.endsWith(suffix))) {
    score -= 2;
  }

  if (/^[A-Z][a-z]+(?:\s[A-Z][a-z]+)*$/.test(english) && !isPhrase) {
    score -= 1;
  }

  if (wordCount >= 5 && category === 'WorkCommunication') {
    score -= 1;
  }

  if (score >= 8) return 'core';
  if (score >= 5) return 'active';
  if (score >= 2) return 'extended';
  return 'reserve';
}

async function main() {
  const source = await fs.readFile(sourcePath, 'utf8');
  const lines = source.split(/\r?\n/);
  const entryMap = new Map();

  for (const line of lines) {
    const args = extractCreateWordArgs(line);
    if (!args) continue;

    const [idArg, englishArg, , , categoryArg] = args;
    const id = readQuotedValue(idArg);
    const english = readQuotedValue(englishArg);
    const category = categoryArg?.split('.').pop()?.replace(/[^A-Za-z]/g, '');

    if (!id || !english || !category) continue;

    const tier = classifyEntry({ english, category });
    entryMap.set(id, { id, english, category, tier });
  }

  const entries = Array.from(entryMap.values());

  const counts = entries.reduce(
    (acc, entry) => {
      acc[entry.tier] += 1;
      return acc;
    },
    { core: 0, active: 0, extended: 0, reserve: 0 },
  );

  const linesOut = [
    "export type VocabularyTier = 'core' | 'active' | 'extended' | 'reserve';",
    '',
    'export const vocabularyTiers: Record<string, VocabularyTier> = {',
    ...entries.map((entry) => `  ${JSON.stringify(entry.id)}: ${JSON.stringify(entry.tier)},`),
    '};',
    '',
  ];

  await fs.writeFile(outputPath, `${linesOut.join('\n')}`, 'utf8');

  console.log(`Generated ${outputPath}`);
  console.log(counts);

  for (const tier of ['core', 'active', 'extended', 'reserve']) {
    const sample = entries
      .filter((entry) => entry.tier === tier)
      .slice(0, 8)
      .map((entry) => entry.english);
    console.log(`${tier}: ${sample.join(' | ')}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
