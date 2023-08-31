module.exports = {
  "**/*.{js,jsx,ts,tsx}": (filenames) => [
    ...filenames.map((filename) => `prettier --write '${filename}'`),
    ...filenames.map((filename) => `eslint '${filename}' --fix`),
  ],
  "**/*.md": (filenames) => [
    ...filenames.map((filename) => `prettier --write '${filename}'`),
  ],
  "**/*.css": (filenames) => [
    ...filenames.map((filename) => `prettier --write '${filename}'`),
    ...filenames.map((filename) => `stylelint '${filename}' --fix`),
  ],
  "**/*.scss": (filenames) => [
    ...filenames.map((filename) => `prettier --write '${filename}'`),
    ...filenames.map((filename) => `stylelint '${filename}' --fix`),
  ],
};
