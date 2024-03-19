// util
import { useState, useEffect, useRef } from "react";

// style
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { DataTabledWrapper, TopWrapper, SearchContent } from "@/styles/dataTable/dataTable";

// types, interfaces
import { str, num } from "@/interfaces/common";

// components
import TextBox from "@/components/input/TextBox";
import Button from "@/components/button/Button";
import DefaultDialog from "@/components/dialog/DefaultDialog";
import SelectBox from "@/components/input/SelectBox";

const DataTable = (): JSX.Element => {
    const [loading, setLoading] = useState<str>(false);
    const [type, setType] = useState<str>(undefined);
    const [types, setTypes] = useState<str>([
        { value: "type1", title: "거래소1" },
        { value: "type2", title: "거래소2" },
        { value: "type3", title: "거래소3" },
    ]);
    const [tag, setTag] = useState<str>(undefined);
    const [tags, setTags] = useState<str>([
        { value: "tag1", title: "고수1" },
        { value: "tag2", title: "고수2" },
        { value: "tag3", title: "고수3" },
    ]);
    const [ticker, setTicker] = useState<str>(null);
    const [contract, setContract] = useState<str>(null);
    const [startTimestamp, setStartTimestamp] = useState<str>(null);
    const [endTimestamp, setEndTimestamp] = useState<str>(null);

    const search = () => {
        const params = {
            ticker,
            contract,
            startTimestamp,
            endTimestamp,
        };
        console.log("params ::: ", params);
    };

    return (
        <DataTabledWrapper>
            <TopWrapper>
                <SearchContent>
                    <SelectBox
                        placeholder="타입"
                        options={types}
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        innerClass="input-box"
                    ></SelectBox>
                    <SelectBox
                        placeholder="TAG"
                        options={tags}
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        innerClass="input-box"
                    ></SelectBox>
                    <TextBox
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
                    />
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
                        width="fit-content"
                        innerClass="input-box"
                    >
                        검색
                    </Button>
                    <Button
                        loading={loading}
                        onClick={search}
                        color={theme.colors.mainBtn}
                        width="fit-content"
                        innerClass="input-box"
                    >
                        저장
                    </Button>
                </SearchContent>
                <div></div>
            </TopWrapper>
        </DataTabledWrapper>
    );
};

export default DataTable;
