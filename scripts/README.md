`clean-vocabulary-duplicates.mjs` removes duplicate `createWord(...)` rows from `data/vocabulary.ts`.

Duplicate detection uses the second argument of `createWord`, normalized with `trim().toLowerCase()`.

Examples:

```bash
npm run clean:vocabulary
npm run clean:vocabulary -- --write
```
