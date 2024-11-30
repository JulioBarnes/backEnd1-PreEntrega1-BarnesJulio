import fs from "fs";

const filePath = "./testPromesa.txt";

const fetchDataFile = async () => {
  try {
    await fs.promises.writeFile(filePath, "1 - Promesa resuelta");

    await fs.promises.unlink(filePath);
  } catch (error) {
    console.error(error);
  }
};

fetchDataFile();
