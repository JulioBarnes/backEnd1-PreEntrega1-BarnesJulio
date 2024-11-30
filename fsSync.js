import fs from "fs";

const filePath = "./prueba.txt";

fs.writeFileSync("filePath", "1 - texto prueba");

let mensaje = fs.readFileSync("filePath", "utf-8");
console.log(mensaje);

fs.appendFileSync("filePath", "\n2 - otro texto prueba");

mensaje = fs.readFileSync("filePath", "utf-8");
console.log(mensaje);
fs.unlinkSync(filePath);
