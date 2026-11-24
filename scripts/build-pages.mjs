import { spawnSync } from "node:child_process";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const result = spawnSync(
    process.execPath,
    [join(root, "node_modules/next/dist/bin/next"), "build"],
    {
        cwd: root,
        stdio: "inherit",
        env: { ...process.env, GITHUB_PAGES: "true" },
    },
);
if (result.error) {
    throw result.error;
}
if (result.status !== 0) {
    process.exit(result.status ?? 1);
}

async function collect(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    const groups = await Promise.all(
        entries.map((entry) => {
            const file = join(directory, entry.name);
            return entry.isDirectory() ? collect(file) : [file];
        }),
    );
    return groups.flat();
}

// Only resize exported copies; original photos remain untouched.
const output = join(root, "out");
let originalBytes = 0;
let optimizedBytes = 0;
for (const file of await collect(output)) {
    if (![".jpg", ".jpeg"].includes(extname(file).toLowerCase())) {
        continue;
    }
    const original = await readFile(file);
    const optimized = await sharp(original)
        .rotate()
        .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 82, mozjpeg: true })
        .toBuffer();
    originalBytes += original.length;
    optimizedBytes += Math.min(original.length, optimized.length);
    if (optimized.length < original.length) {
        await writeFile(file, optimized);
    }
}
await writeFile(join(output, ".nojekyll"), "");
console.log(
    `Exported image size: ${(originalBytes / 1048576).toFixed(1)} MB -> ${(optimizedBytes / 1048576).toFixed(1)} MB.`,
);
console.log("GitHub Pages site is ready in out/.");
