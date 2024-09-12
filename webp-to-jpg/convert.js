const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputFolder = "input"; // Folder containing WebP images
const outputFolder = "output"; // Folder to save JPG images

// Create output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// Function to convert WebP to JPG
const convertWebPToJPG = (inputPath, outputPath) => {
  sharp(inputPath)
    .toFormat("jpeg")
    .toFile(outputPath)
    .then(() => {
      console.log(`Converted: ${inputPath} to ${outputPath}`);
    })
    .catch((err) => {
      console.error(`Error converting ${inputPath}:`, err);
    });
};

// Read all files from the input folder
fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error("Error reading input folder:", err);
    return;
  }

  // Filter out only WebP files and convert them
  files
    .filter((file) => path.extname(file).toLowerCase() === ".webp")
    .forEach((file) => {
      const inputPath = path.join(inputFolder, file);
      const outputFileName = `${path.parse(file).name}.jpg`;
      const outputPath = path.join(outputFolder, outputFileName);

      convertWebPToJPG(inputPath, outputPath);
    });
});
