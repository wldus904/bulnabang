import { str, num, coinFile } from "@/interfaces/common";

export type uploadValid = {
    ticker: str;
    contract: str;
    price: num;
    files: coinFile[];
};
export type uploadRes = { result?: str; message?: str };
