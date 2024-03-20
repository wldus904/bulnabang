// util
import { useState, useEffect, useRef } from "react";

// style
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { DataTabledWrapper } from "@/styles/dataTable/dataTable";

// types, interfaces
import { str, num } from "@/interfaces/common";

// components
import TextBox from "@/components/input/TextBox";
import Button from "@/components/button/Button";
import DefaultDialog from "@/components/dialog/DefaultDialog";
import SelectBox from "@/components/input/SelectBox";
import Search from "@/pages/dataTable/Search";

const DataTable = (): JSX.Element => {
    const [loading, setLoading] = useState<str>(false);
    const searchRef = useRef<ref>();

    const search = (params) => {
        console.log("params ::: ", params);
    };

    const save = () => {
        console.log("save");
    };

    return (
        <DataTabledWrapper>
            <Search search={search} />
            <Button
                loading={loading}
                onClick={save}
                color={theme.colors.mainBtn}
                width="120px"
                height="35px"
                innerClass="save-btn"
            >
                저장
            </Button>
        </DataTabledWrapper>
    );
};

export default DataTable;
