import { Handler } from "@/backend/common/interfaces.ts";
import { NextApiRequest, NextApiResponse } from "next";
import { HTTP_METHODS } from "next/dist/server/web/http";

export default function errorFilter(handler: Handler) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if (!(HTTP_METHODS as ReadonlyArray<string>).includes(req.method!)) {
            return res.status(405).json({ message: "허용되지 않는 http method 입니다." });
        }
        // NOTE:  공통 에러 처리 추가 가능
        try {
            /**
                100 ~ : 임시 응답
                200 ~ : 성공
                300 ~ : 리다이렉션
                400 ~ : 클라이언트 에러
                500 ~ : 서버 에러
             */

            return handler(req, res);
        } catch (error) {
            return res.status(500).json({
                message: "알 수 없는 오류가 발생했습니다.",
            });
        }
    };
}
