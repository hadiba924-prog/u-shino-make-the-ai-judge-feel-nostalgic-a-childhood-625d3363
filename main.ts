import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one sentence, one childhood memory — a father's laughter
// growing smaller behind a child who has just learned to ride alone.
const SENTENCE =
  "My father taught me to ride a bike by running behind me, and I only realized he'd let go when I heard his laughter getting smaller behind me.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const text = SENTENCE.trim();

// Guards: a single clean sentence, capped at 280 characters.
if (text.length < 1 || text.length > 280) {
  throw new Error(`Entry must be 1-280 characters, got ${text.length}.`);
}
if (text.includes("\n") || text.includes("\r")) {
  throw new Error("Entry must be a single line.");
}
const terminators = (text.match(/[.!?]+/g) ?? []).length;
if (terminators !== 1) {
  throw new Error(`Entry must be exactly one sentence, got ${terminators} terminators.`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
