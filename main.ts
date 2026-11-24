// One Line, One Chill — entry program.
//
// Writes a single horror sentence (under 200 characters) to
// /output/entry.txt. Fully deterministic: the same line every run,
// built from its three beats and checked against the gate before
// anything is written.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

function buildLine(): string {
  // The line is assembled from its beats in order, so the rhythm
  // builds and the last word lands the blow:
  //   ordinary image -> impossible voice -> the twist.
  const beats = [
    "The baby monitor plays my lullaby back to me every night",
    "in my mother's voice",
    "and my mother died before I was born",
  ];
  return `${beats[0]} ${beats[1]}, ${beats[2]}.`;
}

function checkLine(line: string): void {
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`line is ${line.length} characters, must be 1-${MAX_CHARS}`);
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only white space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
  // One sentence: exactly one terminal full stop, at the end, and
  // no other sentence-ending punctuation hiding a second sentence.
  const stops = (line.match(/\./g) ?? []).length;
  if (stops !== 1 || !line.endsWith(".")) {
    throw new Error("line must be exactly one sentence");
  }
  if (/[!?]/.test(line)) {
    throw new Error("line must be exactly one sentence");
  }
}

function main(): void {
  const line = buildLine();
  checkLine(line);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, line, "utf8");
  console.log(`wrote ${line.length} characters to ${OUTPUT_PATH}`);
  console.log(line);
}

main();
