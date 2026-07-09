import fs from "fs";
import path from "path";
import sharp from "sharp";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const OUTPUT_FILE = path.join(process.cwd(), "lib", "blur-data.json");

const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

async function generateBlurDataURL(imagePath) {
  const buffer = await sharp(imagePath)
    .resize(16, 16, { fit: "inside" })
    .blur()
    .toFormat("jpeg", { quality: 50 })
    .toBuffer();
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

async function main() {
  const files = fs.readdirSync(IMAGES_DIR).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return SUPPORTED_EXTENSIONS.includes(ext);
  });

  const blurData = {};

  for (const file of files) {
    const imagePath = path.join(IMAGES_DIR, file);
    const key = `/images/${file}`;
    const dataURL = await generateBlurDataURL(imagePath);
    blurData[key] = dataURL;
    console.log(`✓ ${key}`);
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(blurData, null, 2));
  console.log(
    `\nWrote ${Object.keys(blurData).length} blur placeholders to lib/blur-data.json`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
