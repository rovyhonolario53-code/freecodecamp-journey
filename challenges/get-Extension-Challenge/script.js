function getExtension(filename) {
  if (!filename.includes(".") || filename[filename.length - 1] === ".") return "none";

  const lastIndex = filename.lastIndexOf(".")

  return filename.slice(lastIndex + 1);
}

console.log(getExtension("document.txt"))
