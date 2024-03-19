/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";

import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/Carousel/Carousel";
import SwitchTab from "../../../components/switchTab/SwitchTab";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";

import "./style.scss";

const Popular = () => {
    const [activetab, setActivetab] = useState("movie");
    const { data, loading } = useFetch("/" + activetab + "/popular");

    const onTabChange = (tab) => {
        tab === "Movies" ? setActivetab("movie") : setActivetab("tv");
    };

    return (
        <div className="popular">
            <ContentWrapper>
                <div className="popularHeader">
                    <span className="popularTitle">What's Popular</span>
                    <SwitchTab
                        tabs={["Movies", "Tv Shows"]}
                        onTabChange={onTabChange}
                    />
                </div>
            </ContentWrapper>
            <Carousel
                data={data?.results}
                loading={loading}
                endpoint={activetab}
            />
        </div>
    );
};

export default Popular;
