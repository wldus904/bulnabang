// util
import { useState, useEffect } from "react";

// style
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { SearchContent } from "@/styles/dataTable/search";

// types, interfaces
import { str, num } from "@/interfaces/common";

// components
import TextBox from "@/components/input/TextBox";
import Button from "@/components/button/Button";
import DefaultDialog from "@/components/dialog/DefaultDialog";
import SelectBox from "@/components/input/SelectBox";

const DataTable = (props): JSX.Element => {
    const [loading, setLoading] = useState<str>(false);
    const [type, setType] = useState<str>(null);
    const [tag, setTag] = useState<str>(null);
    const [ticker, setTicker] = useState<str>(null);
    const [contract, setContract] = useState<str>(null);
    const [startTimestamp, setStartTimestamp] = useState<str>(null);
    const [endTimestamp, setEndTimestamp] = useState<str>(null);

    const search = () => {
        const params = {
            type,
            tag,
            startTimestamp,
            endTimestamp,
            ticker,
            contract,
        };
        props.search(params);
    };

    return (
        <SearchContent>
            <TextBox
                placeholder="타입"
                value={type}
                onChange={(e) => setType(e.target.value)}
                isSelect
                innerClass="input-box"
            />
            <TextBox
                placeholder="TAG"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                isSelect
                innerClass="input-box"
            />
            {/* <TextBox
                placeholder="시작 Timestamp"
                value={startTimestamp}
                onChange={(e) => setStartTimestamp(e.target.value)}
                isSelect
                innerClass="input-box"
            />
            ~
            <TextBox
                placeholder="마지막 Timestamp"
                value={endTimestamp}
                onChange={(e) => setEndTimestamp(e.target.value)}
                isSelect
                innerClass="input-box"
            /> */}
            <TextBox
                placeholder="코인 티커"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                isSelect
                innerClass="input-box"
            />
            <TextBox
                placeholder="코인 컨트랙트"
                value={contract}
                onChange={(e) => setContract(e.target.value)}
                isSelect
                innerClass="input-box"
            />
            <Button
                loading={loading}
                onClick={search}
                color={theme.colors.mainBtn}
                width="60px"
                height="35px"
                outline
            >
                검색
            </Button>
        </SearchContent>
    );
};

export default DataTable;
