//
// Generate README.md
//
const srcs = [
  "../client/global.ts",
  "../client/pool.ts",
  "../client/publish.ts",
  "../client/echo.ts",
  "../client/transfer.ts",
] as const;

const ts_begin = "```ts";
const ts_end = "```";

const texts = srcs.map((path) => {
  const text = Deno.readTextFileSync(new URL(path, import.meta.url));
  const lines = text.split("\n");
  const title = lines[0].replace("// ", "### ");
  return `${title}\n\n` + [ts_begin, ...lines.slice(1)].join("\n") +
    `${ts_end}\n`;
});

const output = "# Lophus by Example\n\n" +
  "## Client\n\n" +
  texts.join("\n");

Deno.writeTextFileSync(
  new URL("../README.md", import.meta.url),
  output,
);
