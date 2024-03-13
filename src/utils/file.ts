import { RegistrationInf } from "@/interfaces/registration/RegistrationInf";
const fs = require("fs");

type RegistrationFile = { [key: string]: RegistrationInf };

const existFile = (path: string): Boolean => {
    return fs.existsSync(path);
};

const readFile = (path: string): RegistrationFile => {
    if (!existFile(path)) return null;
    const file = JSON.parse(fs.readFileSync(path, "utf-8"));
    return file;
};

const writeFile = (path: string, data: RegistrationFile): void => {
    fs.writeFile(path, JSON.stringify(data), (error) => {
        if (error) throw error;
    });
};

type writerFunc = (file: RegistrationFile) => RegistrationFile;
const readAndWriteFile = (path: string, writer: writerFunc): void => {
    const file: RegistrationFile = readFile(path);
    const newFile: RegistrationFile = writer(file);
    writeFile(path, newFile);
};

export { existFile, readFile, writeFile, readAndWriteFile };
