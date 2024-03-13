import { Handler } from "@/backend/common/interfaces.ts";
import errorFilter from "@/backend/common/errorFilter.ts";

export default function filter(handler: Handler) {
    return errorFilter(handler);
}
