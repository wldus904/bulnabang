import Dashboard from "./main/dashboard";
import { NextRouter, useRouter } from "next/router";

const IndexPage = (): void => {
    const router = useRouter();
    if (typeof window !== "undefined") router.push("/main/dashboard");
};

export default IndexPage;