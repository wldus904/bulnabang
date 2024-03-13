import { NextApiRequest, NextApiResponse } from "next";

export function GET(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ res: "success" });
}
