import { rmSync } from "node:fs";

// Remove os caches de build/dev e o export estático. Útil quando algum
// estado intermediário do Next corrompe (ex.: "Cannot find module './XYZ.js'").
for (const dir of [".next", ".next-dev", "out"]) {
  rmSync(dir, { recursive: true, force: true });
  console.log(`removido: ${dir}`);
}
