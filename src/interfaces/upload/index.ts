import { str, num } from "@/interfaces/common";

export type coinFile = { file: File; block: String; timeStamp: String };
export type uploadValid = {
    ticker: str;
    contract: str;
    price: num;
    files: coinFile[];
};
export type filesdValid = {
    block: str;
    timeStamp: str;
    fine: File;
};
export type uploadRes = { result?: str; message?: str };
