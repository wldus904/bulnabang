// 파일 접두사를 _ 또는 . 으로 만들면 API Endpoint를 만들지 않음
import { NextApiRequest, NextApiResponse } from "next";

import * as REGISTRATION from "@/backend/registration/index.ts";
import filter from "@/backend/common/filter";

type RouteMethod = {
    // [key: String] : typeof REGISTRATION.GET | typeof REGISTRATION.POST | typeof REGISTRATION.DELETE;
    [key: String]: typeof REGISTRATION.GET | typeof REGISTRATION.POST;
};

function handler(req: NextApiRequest, res: NextApiResponse): void {
    const method: string = req.method;
    const HttpFunctions: RouteMethod = REGISTRATION;
    HttpFunctions[method](req, res);
}

export default filter(handler);
