import { NextApiRequest, NextApiResponse } from "next";
import { readAndWriteFile, readFile, writeFile } from "@/utils/file";

export function POST(req: NextApiRequest, res: NextApiResponse) {
    const data = JSON.parse(req.body);

    // api 대신
    const file = readFile("user.json");

    if (file && Object.keys(file).includes(data.email)) {
        res.status(409).json({ message: `중복된 이메일입니다` });
    }

    const newFile = file ? { ...file, [data.email]: data } : { [data.email]: data };
    writeFile("user.json", newFile);
    res.status(200).json({ result: "success" });
    // res.status(400).json({ message: "에러다" });
}
