const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Function to convert image (PNG/JPG) to WebP
async function convertImageToWebp(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .toFormat("webp")
      .toFile(outputPath);

    console.log(`Converted: ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(
      `Error converting ${inputPath}: ${error.message}`
    );
  }
}

// Function to process all PNG and JPG files in the input directory
function processImages(inputDir, outputDir) {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Read input directory
  fs.readdir(inputDir, (err, files) => {
    if (err) {
      console.error(
        `Error reading input directory: ${err.message}`
      );
      return;
    }

    // Loop through all files in the input directory
    files.forEach((file) => {
      const inputFilePath = path.join(inputDir, file);
      const outputFilePath = path.join(
        outputDir,
        file.replace(/\.(png|jpg|jpeg)$/, ".webp")
      );

      // Only process PNG and JPG files
      const fileExt = path.extname(file).toLowerCase();
      if (
        fileExt === ".png" ||
        fileExt === ".jpg" ||
        fileExt === ".jpeg"
      ) {
        convertImageToWebp(inputFilePath, outputFilePath);
      } else {
        console.log(`Skipping non-image file: ${file}`);
      }
    });
  });
}

// Define the input and output directories
const inputDir = path.join(__dirname, "input-images");
const outputDir = path.join(__dirname, "output-images");

// Check if the input directory exists
if (fs.existsSync(inputDir)) {
  processImages(inputDir, outputDir);
} else {
  console.log(
    "Input directory not found. Please check the folder path."
  );
}
