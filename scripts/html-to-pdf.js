const path = require("path");
const { pathToFileURL } = require("url");
const puppeteer = require("puppeteer");

async function run() {
  const inPath = process.argv[2];
  const outPath = process.argv[3];

  if (!inPath) {
    console.error("Usage: node html-to-pdf.js <input.html> [output.pdf]");
    process.exit(1);
  }

  const resolvedIn = path.resolve(inPath);
  const resolvedOut = outPath
    ? path.resolve(outPath)
    : path.join(path.dirname(resolvedIn), "curriculo.pdf");
  const fileUrl = pathToFileURL(resolvedIn).href;

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(fileUrl, { waitUntil: "networkidle0" });
  await page.pdf({ path: resolvedOut, format: "A4", printBackground: true });
  await browser.close();
  console.log("PDF salvo em:", resolvedOut);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
